import { Stack } from "aws-cdk-lib";
import { camelCase, flow, kebabCase, upperFirst } from "lodash";

export const availabilityZone = (scope: Stack, zone: string) => {
  return [scope.region, zone].join("");
};

export const globalBucketName = (scope: Stack, name: string) => {
  return [kebabCase(name), scope.account, scope.region].join("-");
};

export const pascalCase = (str: string) => flow(camelCase, upperFirst)(str);
