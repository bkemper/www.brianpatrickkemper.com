import * as cdk from "aws-cdk-lib";
import { WebsiteStack } from "./stacks/website-stack";
import { BwiSnapshotStack } from "./stacks/bwi-snapshot-stack";
import { AwsSolutionsChecks } from "cdk-nag";
import { pascalCase } from "./utils/format";

const app = new cdk.App();

const environments = ["preview", "production"];
const environmentName =
  process.env.CDK_ENV ?? app.node.tryGetContext("environmentName");

if (!environmentName) {
  throw new Error(
    `Requires environmentName, choose either ${environments.join(" or ")}`,
  );
}

if (!environments.includes(environmentName)) {
  throw new Error(
    `Unknown "${environmentName}" environmentName, choose either ${environments.join(" or ")}`,
  );
}

// see, https://aws.amazon.com/blogs/devops/manage-application-security-and-compliance-with-the-aws-cloud-development-kit-and-cdk-nag/
cdk.Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));

new WebsiteStack(app, pascalCase(`${environmentName}WebsiteStack`), {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  environmentName,
});

new BwiSnapshotStack(app, pascalCase(`${environmentName}BwiSnapshotStack`), {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  environmentName,
});

app.synth();
