import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import { NagSuppressions } from "cdk-nag";

export class WorkflowStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const audience = "sts.amazonaws.com";
    const subject = `repo:bkemper/www.brianpatrickkemper.com:ref:refs/heads/tsa`;
    const url = "https://token.actions.githubusercontent.com";

    const provider = new iam.OpenIdConnectProvider(this, "GitHubProvider", {
      clientIds: [audience],
      url,
    });

    const role = new iam.Role(this, "DeployRole", {
      roleName: "github-actions-production-deploy",
      description: "Role for GitHub Actions production deploy (OIDC)",
      assumedBy: new iam.FederatedPrincipal(
        provider.openIdConnectProviderArn,
        {
          StringEquals: {
            "token.actions.githubusercontent.com:aud": audience,
            "token.actions.githubusercontent.com:sub": subject,
          },
        },
        "sts:AssumeRoleWithWebIdentity",
      ),
    });

    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
    );

    NagSuppressions.addResourceSuppressions(role, [
      {
        id: "AwsSolutions-IAM4",
        reason: "Deploy role intentionally uses AdministratorAccess for full CDK deploy scope.",
        appliesTo: [
          "Policy::arn:<AWS::Partition>:iam::aws:policy/AdministratorAccess",
        ],
      },
    ]);

    new CfnOutput(this, "DeployRoleArn", {
      exportName: "GitHubOidcStack-DeployRoleArn",
      value: role.roleArn,
    });
  }
}
