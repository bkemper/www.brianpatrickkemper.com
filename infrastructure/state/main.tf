provider "aws" {
  profile = "brianpatrickkemper-sandbox"
  region  = "us-east-1"
}

resource "aws_dynamodb_table" "terraform_state_locks" {
  name         = "bpk-backend-state-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "bpk-backend-state"
}

resource "aws_s3_bucket_public_access_block" "terraform_state_access" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_kms_key" "terraform_state_encryption_key" {
  deletion_window_in_days = 7
  enable_key_rotation     = true
  key_usage               = "ENCRYPT_DECRYPT"
  multi_region            = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_encryption" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.terraform_state_encryption_key.arn
      sse_algorithm     = "aws:kms"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_state_versioning" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}
