import { Duration, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import {
  Architecture,
  DockerImageCode,
  DockerImageFunction,
} from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
  EventType,
  ObjectOwnership,
} from "aws-cdk-lib/aws-s3";
import { LambdaDestination } from "aws-cdk-lib/aws-s3-notifications";
import { NagSuppressions } from "cdk-nag";
import path from "node:path";
import { globalBucketName } from "../utils/format";

interface BwiSnapshotStackProps extends StackProps {
  stage: string;
}

export class BwiSnapshotStack extends Stack {
  constructor(scope: Construct, id: string, props: BwiSnapshotStackProps) {
    super(scope, id, props);

    const logBucket = new Bucket(this, "BwiSnapshotLogBucket", {
      bucketName: globalBucketName(this, "bwi-snapshot-logs", props.stage),
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      objectOwnership: ObjectOwnership.BUCKET_OWNER_PREFERRED,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    NagSuppressions.addResourceSuppressions(logBucket, [
      {
        id: "AwsSolutions-S1",
        reason:
          "This is itself the access log bucket; it does not require a separate log bucket.",
      },
    ]);

    const snapshotBucket = new Bucket(this, "BwiSnapshotBucket", {
      bucketName: globalBucketName(this, "bwi-snapshot", props.stage),
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
      removalPolicy: RemovalPolicy.RETAIN,
      serverAccessLogsBucket: logBucket,
      serverAccessLogsPrefix: "s3-access-logs/",
    });

    const parserFunction = new NodejsFunction(this, "BwiSnapshotParserFn", {
      entry: path.resolve(
        __dirname,
        "../../lambdas/bwi-snapshot-parser/src/handler.ts",
      ),
      handler: "handler",
    });

    snapshotBucket.grantReadWrite(parserFunction);

    const snapshotFunction = new DockerImageFunction(this, "BwiSnapshotFn", {
      architecture: Architecture.X86_64,
      code: DockerImageCode.fromImageAsset(
        path.resolve(__dirname, "../../lambdas/bwi-snapshot"),
      ),
      description:
        "Captures BWI Airport page DOM and screenshot every 30 minutes",
      environment: {
        SNAPSHOT_BUCKET_NAME: snapshotBucket.bucketName,
      },
      memorySize: 1536,
      retryAttempts: 0,
      timeout: Duration.minutes(5),
    });

    snapshotBucket.grantPut(snapshotFunction);

    snapshotBucket.addEventNotification(
      EventType.OBJECT_CREATED_PUT,
      new LambdaDestination(parserFunction),
    );

    NagSuppressions.addResourceSuppressions(
      snapshotFunction,
      [
        {
          id: "AwsSolutions-IAM4",
          reason:
            "AWSLambdaBasicExecutionRole is the minimal managed policy for Lambda CloudWatch Logs access. " +
            "Replacing it with a customer managed policy provides no meaningful security improvement here.",
          appliesTo: [
            "Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
          ],
        },
        {
          id: "AwsSolutions-IAM5",
          reason:
            "Lambda needs s3:PutObject on all keys (/*) within the snapshot bucket. " +
            "The wildcard is scoped to this single bucket.",
        },
      ],
      true,
    );

    new Rule(this, "BwiSnapshotSchedule", {
      description: "Triggers BWI Airport snapshot Lambda every 30 minutes",
      schedule: Schedule.cron({
        minute: "0/10", // every 10 minutes at :00, :10, :20, etc.
      }),
      targets: [new LambdaFunction(snapshotFunction)],
    });
  }
}
