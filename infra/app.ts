import * as cdk from "aws-cdk-lib";
import { AmplifyStack } from "./stacks/amplify-stack";
import { WebsiteStack } from "./stacks/website-stack";
import { WorkflowStack } from "./stacks/workflows-stack";
import { AwsSolutionsChecks } from "cdk-nag";
import { pascalCase } from "./utils/format";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
const stage = process.env.CDK_ENV;
const stages = ["preview", "production"];

if (!stage) {
  throw new Error(`Requires CDK_ENV, choose either ${stages.join(" or ")}`);
}

if (!stages.includes(stage)) {
  throw new Error(
    `Unknown "${stage}" CDK_ENV, choose either ${stages.join(" or ")}`,
  );
}

// see, https://aws.amazon.com/blogs/devops/manage-application-security-and-compliance-with-the-aws-cloud-development-kit-and-cdk-nag/
cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));

//
// The infrastructure for the www.brianpatrickkemper.com site (Fargate; retire after Amplify cutover)
//
new WebsiteStack(app, pascalCase(`${stage}WebsiteStack`), {
  env,
  stage,
});

//
// Amplify Hosting for the Site (static WEB). Production only — one app, PR previews on main.
//
if (stage === "production") {
  new AmplifyStack(app, pascalCase(`${stage}AmplifyStack`), {
    env,
  });
}

//
// The identity provider needed to run CDK in GitHub workflows
//
new WorkflowStack(app, "WorkflowStack", {
  env,
});

app.synth();
