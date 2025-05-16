import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";
import * as path from "path";

export class WebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC with public subnets in us-east-1a and us-east-1b
    // (supported by CloudFront's VPC origins)
    const vpc = new ec2.Vpc(this, "BpkVpc", {
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
      vpcName: "BpkVpc",
    });

    // Create an ECS Cluster
    const cluster = new ecs.Cluster(this, "BpkCluster", {
      vpc,
      clusterName: "BpkCluster",
    });

    // Create a Fargate service running the Next.js app
    const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      "BpkService",
      {
        cluster,
        desiredCount: 1,
        cpu: 512,
        memoryLimitMiB: 1024,
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, "../..")),
          containerPort: 3000,
        },
        publicLoadBalancer: true,
      }
    );

    // Create an ACM certificate
    const certificate = new acm.Certificate(this, "BpkCertificate", {
      domainName: "brianpatrickkemper.com",
      subjectAlternativeNames: ["www.brianpatrickkemper.com"],
      validation: acm.CertificateValidation.fromDns(),
    });

    // Create a CloudFront cache policy
    const cachePolicy = new cloudfront.CachePolicy(this, "BpkCachePolicy", {
      cachePolicyName: "BpkCachePolicy",
      defaultTtl: cdk.Duration.seconds(3600),
      maxTtl: cdk.Duration.seconds(86400),
      minTtl: cdk.Duration.seconds(0),
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    });

    // Create a CloudFront distribution
    const distribution = new cloudfront.Distribution(this, "BpkCdn", {
      defaultBehavior: {
        origin: new origins.LoadBalancerV2Origin(loadBalancedFargateService.loadBalancer, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
        }),
        cachePolicy,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        compress: true,
      },
      domainNames: ["brianpatrickkemper.com", "www.brianpatrickkemper.com"],
      certificate,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
    });

    // Output the CloudFront distribution URL
    new cdk.CfnOutput(this, "DistributionUrl", {
      value: `https://${distribution.distributionDomainName}`,
      description: "The URL of the CloudFront distribution",
    });

    // Output the load balancer URL
    new cdk.CfnOutput(this, "LoadBalancerUrl", {
      value: loadBalancedFargateService.loadBalancer.loadBalancerDnsName,
      description: "The URL of the load balancer",
    });
  }
}
