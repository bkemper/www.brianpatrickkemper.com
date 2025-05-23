import * as cdk from "aws-cdk-lib";
import { WebsiteStack } from "./stacks/website-stack";
import { AwsSolutionsChecks } from "cdk-nag";

const app = new cdk.App();

// see, https://aws.amazon.com/blogs/devops/manage-application-security-and-compliance-with-the-aws-cloud-development-kit-and-cdk-nag/
cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));

new WebsiteStack(app, "WebsiteStack", {
  // see, https://docs.aws.amazon.com/cdk/v2/guide/environments.html
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();
