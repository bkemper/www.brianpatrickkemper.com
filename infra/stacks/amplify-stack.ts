import * as amplify from "@aws-cdk/aws-amplify-alpha";
import { CfnApp, CfnDomain } from "aws-cdk-lib/aws-amplify";
import { CfnOutput, SecretValue, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

/** Secrets Manager secret name for the GitHub PAT Amplify uses with the Amplify GitHub App. Create before deploy. */
export const AMPLIFY_GITHUB_TOKEN_SECRET_NAME = "amplify/github-token";

/** Apex domain for the Site; www is the canonical origin (ADR 0002). */
export const SITE_DOMAIN_NAME = "brianpatrickkemper.com";

/**
 * Amplify Hosting for the Site (platform WEB, static).
 * App + `main` + PR previews + custom domain (www + apex→www 301).
 *
 * Prerequisites:
 * - Secrets Manager secret `amplify/github-token` (classic `admin:repo_hook`, or
 *   fine-grained Contents + Metadata + Webhooks) for CreateApp `accessToken`.
 * - Amplify GitHub App (`aws-amplify-us-east-1`) installed on this repo — required
 *   for PR web previews.
 *
 * DNS stays at Google Domains (operator-owned). After deploy, add Amplify's
 * verification and traffic records from the console (View DNS records) or the
 * certificate validation output below. Do not change Mailgun MX/SPF.
 *
 * No IAM service role: this repository is public. Amplify refuses PR previews on
 * public repos when an app service role is attached (preview security restriction).
 */
export class AmplifyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const githubToken = SecretValue.secretsManager(
      AMPLIFY_GITHUB_TOKEN_SECRET_NAME,
    );

    const site = new amplify.App(this, "Site", {
      appName: "bpk-site",
      platform: amplify.Platform.WEB,
      // GitHub App access (not OAuth): bind accessToken instead of oauthToken.
      sourceCodeProvider: {
        bind: () => ({
          repository: "https://github.com/bkemper/www.brianpatrickkemper.com",
          accessToken: githubToken,
        }),
      },
      // Build settings live in repo amplify.yml (pnpm → www/dist/client).
      autoBranchDeletion: true,
    });

    // amplify-alpha always creates a Role and wires IAMServiceRole; clear it so
    // public-repo PR previews are allowed, and drop the unused Role resource.
    const cfnApp = site.node.defaultChild as CfnApp;
    cfnApp.iamServiceRole = undefined;
    site.node.tryRemoveChild("Role");

    // Apex → www permanent redirect (canonical origin is www; ADR 0002).
    // Amplify ignores domain+path sources (e.g. `https://apex/<*>`) without
    // error; domain-only sources append the request path automatically.
    // https://docs.aws.amazon.com/amplify/latest/userguide/redirect-rewrite-examples.html
    site.addCustomRule(
      new amplify.CustomRule({
        source: `https://${SITE_DOMAIN_NAME}`,
        target: `https://www.${SITE_DOMAIN_NAME}`,
        status: amplify.RedirectStatus.PERMANENT_REDIRECT,
      }),
    );

    // Unknown paths → clean /not-found (Amplify Hosting custom 404).
    site.addCustomRule(
      new amplify.CustomRule({
        source: "/<*>",
        target: "/not-found",
        status: amplify.RedirectStatus.NOT_FOUND,
      }),
    );

    const main = site.addBranch("main", {
      branchName: "main",
      autoBuild: true,
      pullRequestPreview: true,
      stage: "PRODUCTION",
    });

    // Amplify-managed cert for apex + www.
    const domain = site.addDomain(SITE_DOMAIN_NAME, {
      domainName: SITE_DOMAIN_NAME,
    });
    domain.mapRoot(main);
    domain.mapSubDomain(main, "www");

    // addDomain wires App.grantPrincipal into AutoSubDomainIAMRole even when
    // auto-subdomains are off; clear it after removing the Role child above.
    const cfnDomain = domain.node.defaultChild as CfnDomain;
    cfnDomain.autoSubDomainIamRole = undefined;

    new CfnOutput(this, "AmplifyAppId", {
      value: site.appId,
    });

    new CfnOutput(this, "AmplifyDefaultDomain", {
      value: `https://${site.defaultDomain}`,
      description: "Default Amplify hostname (before or alongside custom domain).",
    });

    new CfnOutput(this, "AmplifyDomainStatus", {
      value: domain.domainStatus,
      description: "Custom domain association status (AVAILABLE when ready).",
    });

    new CfnOutput(this, "AmplifyDomainStatusReason", {
      value: domain.statusReason,
      description: "Reason for the current custom domain status.",
    });

    new CfnOutput(this, "AmplifyCertificateRecord", {
      value: domain.certificateRecord,
      description:
        "DNS validation record for the Amplify-managed certificate. Add at Google Domains; then set www/apex traffic targets from Amplify console → Custom domains → View DNS records.",
    });
  }
}
