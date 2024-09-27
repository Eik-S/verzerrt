resource "aws_s3_bucket" "verzerrt_website_bucket" {
  bucket = var.domain_name
}

resource "aws_s3_bucket_website_configuration" "verzerrt_website_bucket" {
  bucket = aws_s3_bucket.verzerrt_website_bucket.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_policy" "verzerrt_website_bucket" {
  bucket = aws_s3_bucket.verzerrt_website_bucket.id
  policy = data.aws_iam_policy_document.website_policy.json
}

data "aws_iam_policy_document" "website_policy" {
  statement {
    actions = [
      "s3:GetObject"
    ]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity EXBY0NKH36FWR"]
    }

    resources = [
      "arn:aws:s3:::${var.domain_name}/*"
    ]
  }

  statement {
    actions = [
      "s3:ListBucket"
    ]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity EXBY0NKH36FWR"]
    }

    resources = [
      "arn:aws:s3:::${var.domain_name}"
    ]
  }
}
