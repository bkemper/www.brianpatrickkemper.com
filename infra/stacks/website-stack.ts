import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import {
  AllowedMethods,
  CachePolicy,
  Distribution,
  OriginProtocolPolicy,
  PriceClass,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { VpcOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  DefaultInstanceTenancy,
  IpAddresses,
  IpProtocol,
  Peer,
  Port,
  SubnetType,
  Vpc,
} from "aws-cdk-lib/aws-ec2";
import { ContainerImage, ContainerInsights, Cluster } from "aws-cdk-lib/aws-ecs";
import { Platform } from "aws-cdk-lib/aws-ecr-assets";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { BlockPublicAccess, Bucket, ObjectOwnership } from "aws-cdk-lib/aws-s3";
import { NagSuppressions } from "cdk-nag";
import path from "node:path";
import { availabilityZone, globalBucketName } from "../utils/format";

export class WebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // a Virtual Private Cloud (VPC) is virtual network associated to a single AWS Region that defines
    // the boundary around deployed AWS services and resources, public and private subnets are created in each
    // availability zone, use network ACLs to restrict inbound and outbound traffic on subnets
    // internet gateway, use route table to define rules for where network traffic is directed
    const myVpc = new Vpc(this, "BpkVpc", {
      // must be in one of the AWS Regions that are supported for VPC origins
      // see, https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-vpc-origins.html#vpc-origins-supported-regions
      availabilityZones: [availabilityZone(this, "a"), availabilityZone(this, "b")],
      // $$$ for dedicated hardware
      defaultInstanceTenancy: DefaultInstanceTenancy.DEFAULT,
      // enable logging of network flow information for a VPC, subnet, or network interface and store it CloudWatch
      flowLogs: {
        BpkFlowLog: {},
      },
      // a Classless Inter-Domain Routing (CIDR) range defines a range of IP addresses
      ipAddresses: IpAddresses.cidr("10.0.0.0/16"),
      // $$$ for dual stack (IPv4 and IPv6)
      ipProtocol: IpProtocol.IPV4_ONLY,
      subnetConfiguration: [
        {
          name: "BpkSubnetPublic",
          subnetType: SubnetType.PUBLIC,
        },
        {
          name: "BpkSubnetPrivate",
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    const myLogBucket = new Bucket(this, "BpkLogBucket", {
      bucketName: globalBucketName(this, "bpk-website-logs"),
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
      objectOwnership: ObjectOwnership.BUCKET_OWNER_PREFERRED,
    });

    NagSuppressions.addResourceSuppressions(myLogBucket, [
      {
        id: "AwsSolutions-S1",
        reason:
          "Server access logs are not required for this bucket as it is already used for logging other resources.",
      },
    ]);

    // Elastic Container Service (ECS) fully a managed container orchestration service that helps you deploy,
    // manage, and scale containerized applications, clusters are logical grouping of services or standalone tasks,
    // and recommended instead of Elastic Kubernetes Service (EKS) because "customers adopting containers at scale
    // seeking powerful simplicity should start with Amazon ECS"
    // see, https://aws.amazon.com/blogs/containers/amazon-ecs-vs-amazon-eks-making-sense-of-aws-container-services/
    const myWebCluster = new Cluster(this, "BpkWebCluster", {
      clusterName: "BpkWebCluster",
      containerInsightsV2: ContainerInsights.ENABLED,
      vpc: myVpc,
    });

    const myWebServicePort = 80;

    const myWebService = new ApplicationLoadBalancedFargateService(this, "BpkWebService", {
      assignPublicIp: true,
      cluster: myWebCluster,
      cpu: 512,
      desiredCount: 1,
      listenerPort: myWebServicePort,
      memoryLimitMiB: 1024,
      openListener: false,
      publicLoadBalancer: false,
      redirectHTTP: false,
      taskImageOptions: {
        containerPort: 3000,
        environment: {},
        image: ContainerImage.fromAsset(path.resolve(__dirname, "../../web"), {
          platform: Platform.LINUX_AMD64,
        }),
      },
    });

    myWebService.loadBalancer.connections.allowFrom(Peer.anyIpv4(), Port.tcp(80));

    NagSuppressions.addResourceSuppressions(
      myWebService.loadBalancer,
      [
        {
          id: "AwsSolutions-EC23",
          reason: "TODO: restrict this load balancer from anyIpv4 to a specific IP address range",
        },
      ],
      true
    );

    myWebService.loadBalancer.logAccessLogs(myLogBucket, "alb-access-logs");
    myWebService.loadBalancer.logConnectionLogs(myLogBucket, "alb-connection-logs");

    NagSuppressions.addResourceSuppressions(
      myWebService.taskDefinition.executionRole!,
      [{ id: "AwsSolutions-IAM5", reason: "TODO: fix this" }],
      true
    );

    const myDistroCachePolicy = new CachePolicy(this, "BpkDistributionCachePolicy", {
      cachePolicyName: "BpkDistributionCachePolicy",
      defaultTtl: Duration.seconds(3600),
      enableAcceptEncodingBrotli: true,
      enableAcceptEncodingGzip: true,
      maxTtl: Duration.seconds(86400),
      minTtl: Duration.seconds(0),
    });

    const [myDistroDomainName, ...myDistroAlternativeDomainNames] =
      this.account === "137068238831"
        ? ["brianpatrickkemper.com", "www.brianpatrickkemper.com"]
        : [];

    const myDistroCertificate = myDistroDomainName
      ? new Certificate(this, "BpkCertificate", {
          domainName: myDistroDomainName,
          subjectAlternativeNames: myDistroAlternativeDomainNames,
          validation: CertificateValidation.fromDns(),
        })
      : undefined;

    const myDistro = new Distribution(this, "BpkDistribution", {
      certificate: myDistroCertificate,
      defaultBehavior: {
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: myDistroCachePolicy,
        compress: true,
        origin: VpcOrigin.withApplicationLoadBalancer(myWebService.loadBalancer, {
          httpPort: myWebServicePort,
          protocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      domainNames: myDistroDomainName
        ? [myDistroDomainName, ...myDistroAlternativeDomainNames]
        : undefined,
      enableLogging: true,
      enabled: true,
      logBucket: myLogBucket,
      logFilePrefix: "cf-access-logs",
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
      priceClass: PriceClass.PRICE_CLASS_100,
    });

    if (!myDistroCertificate) {
      NagSuppressions.addResourceSuppressions(myDistro, [
        {
          id: "AwsSolutions-CFR4",
          reason: "SSL is not required for non-production environments.",
        },
        {
          id: "AwsSolutions-CFR5",
          reason: "SSL is not required for non-production environments.",
        },
      ]);
    }
  }
}
