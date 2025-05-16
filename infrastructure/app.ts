#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { WebsiteStack } from "./lib/website-stack";
import { awsConfig } from "./aws-config";

const app = new cdk.App();

new WebsiteStack(app, "www-brianpatrickkemper-com", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: awsConfig.region,
  },
  tags: {
    Project: "www-brianpatrickkemper-com",
    Environment: "production",
  },
});

app.synth();
