import * as cdk from "aws-cdk-lib";
import { WebsiteStack } from "./stacks/website-stack";
import { BwiSnapshotStack } from "./stacks/bwi-snapshot-stack";
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
//
//
new BwiSnapshotStack(app, pascalCase(`${stage}BwiSnapshotStack`), {
  env,
  stage,
});

//
// The infrastructure for the www.brianpatrickkemper.com site
//
new WebsiteStack(app, pascalCase(`${stage}WebsiteStack`), {
  env,
  stage,
});

//
// The identity provider needed to run CDK in GitHub workflows
//
new WorkflowStack(app, "WorkflowStack", {
  env,
});

app.synth();
