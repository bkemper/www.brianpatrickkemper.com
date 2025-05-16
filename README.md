# Brian Patrick Kemper

My personal site for play. If you want to connect, please reach out on LinkedIn.

## Deployment with AWS CDK

This project uses AWS CDK (Cloud Development Kit) to deploy infrastructure. The deployment includes:

- VPC with public subnets in us-east-1a and us-east-1b
- ECS Cluster and Fargate Service
- ACM Certificate for HTTPS
- CloudFront Distribution

### Prerequisites

- AWS CLI configured with the `brianpatrickkemper-sandbox` profile
- Node.js 22.10.0 or later
- Docker installed and running (for container builds)

### First-time Setup

1. Login to AWS:

   ```
   npm run login
   ```

2. Bootstrap the CDK environment (only needed once per AWS account/region):
   ```
   npm run cdk:bootstrap
   ```

### Deployment Commands

- Deploy the application:

  ```
  npm run cdk:deploy
  ```

- View changes before deployment:

  ```
  npm run cdk:diff
  ```

- Generate CloudFormation templates:
  ```
  npm run cdk:synth
  ```

### Development

- Run the Next.js development server:

  ```
  npm run dev
  ```

- Build the application:
  ```
  npm run build
  ```
