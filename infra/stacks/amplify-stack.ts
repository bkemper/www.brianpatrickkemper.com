import * as amplify from "@aws-cdk/aws-amplify-alpha";
import { CfnOutput, SecretValue, Stack, StackProps } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { NagSuppressions } from "cdk-nag";
import { Construct } from "constructs";

/** Secrets Manager secret name for the GitHub PAT Amplify uses to clone this repo. Create before deploy. */
export const AMPLIFY_GITHUB_TOKEN_SECRET_NAME = "amplify/github-token";

/**
 * Amplify Hosting for the Site (platform WEB, static).
 * Phase 1: app + `main` + pull-request previews. Custom domain is phase 2.
 *
 * Prerequisite: Secrets Manager secret `amplify/github-token` with a GitHub PAT
 * that can read `bkemper/www.brianpatrickkemper.com` and manage repo webhooks
 * (fine-grained: Contents + Metadata + Webhooks; or classic: admin:repo_hook).
 */
export class AmplifyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // amplify-alpha's default role has trust only — Amplify Hosting builds fail
    // with "Unable to assume specified IAM Role" unless the role also has
    // AdministratorAccess-Amplify (AWS Amplify service-role docs).
    const serviceRole = new iam.Role(this, "ServiceRole", {
      assumedBy: new iam.ServicePrincipal("amplify.amazonaws.com"),
      description: "Amplify Hosting service role for the Site",
    });
    serviceRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess-Amplify"),
    );
    NagSuppressions.addResourceSuppressions(serviceRole, [
      {
        id: "AwsSolutions-IAM4",
        reason:
          "Amplify Hosting requires the AdministratorAccess-Amplify managed policy on the app service role.",
        appliesTo: [
          "Policy::arn:<AWS::Partition>:iam::aws:policy/AdministratorAccess-Amplify",
        ],
      },
    ]);

    const site = new amplify.App(this, "Site", {
      appName: "bpk-site",
      platform: amplify.Platform.WEB,
      role: serviceRole,
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
