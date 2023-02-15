terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "~> 0.11.4"
    }
  }
  required_version = ">=1.2.7"
}

provider "vercel" {
  api_token = var.vercel_api_token
}

resource "vercel_project" "deploy-training" {
  name = "vercel-deploy-training"

  git_repository = {
    type = "github"
    repo = "aatu-mikkonen/vercel-deploy-training"
  }
}
