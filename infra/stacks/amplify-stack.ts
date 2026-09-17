import * as amplify from "@aws-cdk/aws-amplify-alpha";
import { CfnOutput, SecretValue, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

/** Secrets Manager secret name for the GitHub PAT Amplify uses to clone this repo. Create before deploy. */
export const AMPLIFY_GITHUB_TOKEN_SECRET_NAME = "amplify/github-token";

/**
 * Amplify Hosting for the Site (platform WEB, static).
 * Phase 1: app + `main` + pull-request previews. Custom domain is phase 2.
 *
 * Prerequisite: Secrets Manager secret `amplify/github-token` with a GitHub PAT
 * that can read `bkemper/www.brianpatrickkemper.com` (repo scope / fine-grained contents).
 */
export class AmplifyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const site = new amplify.App(this, "Site", {
      appName: "bpk-site",
      platform: amplify.Platform.WEB,
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: "bkemper",
        repository: "www.brianpatrickkemper.com",
        oauthToken: SecretValue.secretsManager(AMPLIFY_GITHUB_TOKEN_SECRET_NAME),
      }),
      // Build settings live in repo amplify.yml (pnpm → www/dist/client).
      autoBranchDeletion: true,
    });

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
