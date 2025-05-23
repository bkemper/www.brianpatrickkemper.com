import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  DefaultInstanceTenancy,
  IpAddresses,
  IpProtocol,
  SubnetType,
  Vpc,
} from "aws-cdk-lib/aws-ec2";

export class WebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // a Virtual Private Cloud (VPC) is virtual network associated to a single AWS Region that defines
    // the boundary around deployed AWS services and resources, public and private subnets are created in each
    // availability zone, use network ACLs to restrict inbound and outbound traffic on subnets
    // internet gateway, use route table to define rules for where network traffic is directed
    new Vpc(this, "BpkVpc", {
      // must be in one of the AWS Regions that are supported for VPC origins
      // see, https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-vpc-origins.html#vpc-origins-supported-regions
      availabilityZones: [`${this.region}a`, `${this.region}b`],
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
  }
}
