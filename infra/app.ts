import * as cdk from "aws-cdk-lib";
import { WebsiteStack } from "./stacks/website-stack";

const app = new cdk.App();

new WebsiteStack(app, "WebsiteStack", {
  // see, https://docs.aws.amazon.com/cdk/v2/guide/environments.html
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();
