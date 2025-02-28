/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      home: "aws",
      name: "www-brianpatrickkemper-com",
      protect: ["production"].includes(input?.stage),
      providers: {
        aws: {
          profile: "brianpatrickkemper-sandbox",
          region: "us-east-1",
        },
      },
      removal: input?.stage === "production" ? "retain" : "remove",
    };
  },
  async run() {
    new sst.aws.Nextjs("MyWeb");
  },
});
