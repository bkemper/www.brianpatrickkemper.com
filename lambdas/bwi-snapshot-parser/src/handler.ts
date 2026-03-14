import type { S3Handler } from "aws-lambda";

const HELLO = "hello world";

export const handler: S3Handler = async (event) => {
  console.log(HELLO);
  for (const record of event.Records) {
    console.log("s3 key:", record.s3.object.key);
  }
};
