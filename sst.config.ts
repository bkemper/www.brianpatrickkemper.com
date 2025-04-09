/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app() {
    return {
      home: "aws",
      name: "www-brianpatrickkemper-com",
      protect: false,
      providers: {
        aws: {
          profile: "brianpatrickkemper-sandbox",
          region: "us-east-1",
        },
      },
      removal: "remove",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("BpkVpc", {
      // must use a supported availability zone
      // see, https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-vpc-origins.html#vpc-origins-supported-regions
      az: ["us-east-1a", "us-east-1b"],
    });

    const service = new sst.aws.Service("BpkService", {
      cluster: new sst.aws.Cluster("BpkCluster", { vpc }),
      dev: {
        command: "npx next dev --port 3000",
      },
      image: {
        dockerfile: "Dockerfile",
      },
      loadBalancer: {
        ports: [{ forward: "3000/http", listen: "80/http" }],
        public: false,
      },
    });

    if ($dev) {
      //
    } else {
      const origin = new aws.cloudfront.VpcOrigin("BpkVpcOrigin", {
        vpcOriginEndpointConfig: {
          arn: service.nodes.loadBalancer.arn,
          httpPort: 80,
          httpsPort: 443,
          name: "BpkVpcOrigin",
          originProtocolPolicy: "http-only",
          originSslProtocols: {
            items: ["TLSv1.2"],
            quantity: 1,
          },
        },
      });

      const cache = new aws.cloudfront.CachePolicy("BpkCachePolicy", {
        defaultTtl: 3600,
        maxTtl: 86400,
        minTtl: 0,
        name: "BpkCachePolicy",
        parametersInCacheKeyAndForwardedToOrigin: {
          cookiesConfig: {
            cookieBehavior: "none",
          },
          headersConfig: {
            headerBehavior: "none",
          },
          queryStringsConfig: {
            queryStringBehavior: "none",
          },
        },
      });

      const cert = new aws.acm.Certificate("BpkCertificate", {
        domainName: "brianpatrickkemper.com",
        subjectAlternativeNames: ["www.brianpatrickkemper.com"],
        validationMethod: "DNS",
      });

      new aws.cloudfront.Distribution("BpkCdn", {
        // note, must update the cert and verify before changing aliases
        aliases: $resolve(cert.subjectAlternativeNames).apply((subjectAlternativeNames) => [
          cert.domainName,
          ...subjectAlternativeNames,
        ]),
        defaultCacheBehavior: {
          allowedMethods: ["GET", "HEAD", "OPTIONS"],
          cachedMethods: ["GET", "HEAD"],
          cachePolicyId: cache.id,
          compress: true,
          targetOriginId: "BpkVpcOrigin",
          viewerProtocolPolicy: "redirect-to-https",
        },
        enabled: true,
        origins: [
          {
            domainName: service.nodes.loadBalancer.dnsName,
            originId: "BpkVpcOrigin",
            vpcOriginConfig: {
              vpcOriginId: origin.id,
            },
          },
        ],
        priceClass: "PriceClass_200",
        restrictions: {
          geoRestriction: {
            restrictionType: "none",
          },
        },
        staging: false,
        viewerCertificate: {
          acmCertificateArn: cert.arn,
          cloudfrontDefaultCertificate: false,
          minimumProtocolVersion: "TLSv1.2_2021",
          sslSupportMethod: "sni-only",
        },
      });
    }
  },
});
