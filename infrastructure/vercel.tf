# infrastructure/vercel.tf
resource "vercel_project" "main" {
  name      = "production"
  framework = "nextjs"
  
  environment = [
    {
      key    = "NEXT_PUBLIC_API_URL"
      value  = "https://api.example.com/v2"
      target = ["production"]
    }
  ]
}