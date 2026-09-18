import * as amplify from "@aws-cdk/aws-amplify-alpha";
import { CfnApp } from "aws-cdk-lib/aws-amplify";
import { CfnOutput, SecretValue, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

/** Secrets Manager secret name for the GitHub PAT Amplify uses with the Amplify GitHub App. Create before deploy. */
export const AMPLIFY_GITHUB_TOKEN_SECRET_NAME = "amplify/github-token";

/**
 * Amplify Hosting for the Site (platform WEB, static).
 * Phase 1: app + `main` + pull-request previews. Custom domain is phase 2.
 *
 * Prerequisites:
 * - Secrets Manager secret `amplify/github-token` (classic `admin:repo_hook`, or
 *   fine-grained Contents + Metadata + Webhooks) for CreateApp `accessToken`.
 * - Amplify GitHub App (`aws-amplify-us-east-1`) installed on this repo — required
 *   for PR web previews. Run `scripts/setup-amplify-github-app.sh`.
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

    site.addBranch("main", {
      branchName: "main",
      autoBuild: true,
      pullRequestPreview: true,
      stage: "PRODUCTION",
    });

    new CfnOutput(this, "AmplifyAppId", {
      value: site.appId,
    });

    new CfnOutput(this, "AmplifyDefaultDomain", {
      value: `https://${site.defaultDomain}`,
      description:
        "Accept this Amplify URL before attaching the custom domain (phase 2).",
    });
  }
}
