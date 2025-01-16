'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DatasetNutritionCard } from "@/components/DatasetNutritionCard"
import { DatasetPreview } from "@/components/DatasetPreview"

export default function MarketplacePage() {
  const datasets = [
    {
      id: 1,
      title: "Global Economic Indicators",
      description: "Comprehensive dataset of economic indicators from major world economies",
      price: "$499",
      category: "Economics",
      provider: "EconMetrics Ltd.",
      type: "tabular" as const,
      sampleData: [
        { country: "USA", gdp_growth: 2.4, inflation: 3.1, unemployment: 3.8 },
        { country: "China", gdp_growth: 5.2, inflation: 2.1, unemployment: 4.1 },
        { country: "Germany", gdp_growth: 1.8, inflation: 2.9, unemployment: 3.2 },
        { country: "Japan", gdp_growth: 1.9, inflation: 2.4, unemployment: 2.7 },
        { country: "UK", gdp_growth: 1.2, inflation: 3.4, unemployment: 4.2 },
      ]
    },
    {
      id: 2,
      title: "Social Media Trends",
      description: "Analysis of trending topics and user behavior across major social platforms",
      price: "$299",
      category: "Social Media",
      provider: "SocialInsights Inc.",
      type: "text" as const,
      sampleData: [
        {
          text: "Rising engagement in sustainable lifestyle content across platforms",
          metadata: { sentiment: "positive", engagement_score: 0.85 }
        },
        {
          text: "Gaming communities show increased interest in AR/VR discussions",
          metadata: { sentiment: "neutral", engagement_score: 0.92 }
        },
        {
          text: "Health and wellness content maintains strong growth trajectory",
          metadata: { sentiment: "positive", engagement_score: 0.78 }
        }
      ]
    },
    {
      id: 3,
      title: "Climate Change Metrics",
      description: "Environmental data tracking global climate patterns and changes",
      price: "$399",
      category: "Environment",
      provider: "ClimateWatch Global",
      type: "image" as const,
      sampleData: [
        {
          url: "/sample-data/climate/temperature-map-1.jpg",
          caption: "Global Temperature Distribution 2023"
        },
        {
          url: "/sample-data/climate/sea-level-2.jpg",
          caption: "Sea Level Rise Projections"
        },
        {
          url: "/sample-data/climate/emissions-3.jpg",
          caption: "Carbon Emissions by Region"
        }
      ]
    },
    {
      id: 4,
      title: "Consumer Behavior Analytics",
      description: "Detailed consumer purchasing patterns and preferences data",
      price: "$599",
      category: "Market Research",
      provider: "ConsumerMetrics Pro",
      type: "embedding" as const,
      sampleData: [
        {
          vector: [0.23, 0.45, -0.12, 0.78, 0.91, -0.34, 0.56, 0.12, -0.89, 0.44, 0.67, -0.23],
          metadata: { category: "Electronics", demographic: "18-24" }
        },
        {
          vector: [0.45, 0.12, 0.67, -0.23, 0.89, 0.34, -0.56, 0.78, 0.91, -0.12, 0.44, 0.67],
          metadata: { category: "Fashion", demographic: "25-34" }
        },
        {
          vector: [0.67, -0.23, 0.89, 0.34, -0.56, 0.78, 0.91, -0.12, 0.44, 0.67, 0.23, 0.45],
          metadata: { category: "Food", demographic: "35-44" }
        }
      ]
    },
    {
      id: 5,
      title: "Technical Support Q&A Dataset",
      description: "High-quality Q&A pairs for training customer support AI models",
      price: "$799",
      category: "AI Training",
      provider: "AIDataLabs",
      type: "qa" as const,
      sampleData: [
        {
          question: "How do I reset my account password?",
          answer: "To reset your password, click the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password. Make sure to check your spam folder if you don't see the email in your inbox.",
          metadata: { 
            category: "Account Management",
            difficulty: "beginner",
            avg_helpfulness_score: 4.8
          }
        },
        {
          question: "What are the system requirements for running the software?",
          answer: "The minimum system requirements are: Windows 10 or macOS 10.15+, 8GB RAM, 2.0GHz dual-core processor, and 10GB free disk space. For optimal performance, we recommend 16GB RAM and a quad-core processor. The software also requires an active internet connection for cloud features.",
          metadata: {
            category: "Technical Requirements",
            difficulty: "intermediate",
            avg_helpfulness_score: 4.6
          }
        },
        {
          question: "How can I export my data in CSV format?",
          answer: "To export data in CSV format: 1) Go to the Dashboard, 2) Click on 'Data Management', 3) Select the data you want to export, 4) Click the 'Export' button, and 5) Choose 'CSV' from the format options. Your download will begin automatically.",
          metadata: {
            category: "Data Management",
            difficulty: "intermediate",
            avg_helpfulness_score: 4.9
          }
        },
        {
          question: "Why am I getting the 'API Rate Limit Exceeded' error?",
          answer: "The 'API Rate Limit Exceeded' error occurs when you've made more API calls than your current plan allows. Standard accounts are limited to 1000 calls per hour. To resolve this: 1) Wait for the rate limit to reset, 2) Optimize your API usage, or 3) Upgrade to a higher tier plan for increased limits.",
          metadata: {
            category: "API Usage",
            difficulty: "advanced",
            avg_helpfulness_score: 4.7
          }
        }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Marketplace</h1>
        <p className="text-muted-foreground mt-2">
          Browse, test, and lease or purchase high-quality datasets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datasets.map((dataset) => (
          <Card key={dataset.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{dataset.title}</CardTitle>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                  {dataset.category}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">{dataset.description}</p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-bold">{dataset.price}</span>
                <DatasetPreview dataset={dataset} />
              </div>
              <div className="flex justify-between w-full gap-3">
                <Button className="flex-1" variant="outline" size="sm">Lease Dataset</Button>
                <Button className="flex-1" variant="outline" size="sm">Purchase Dataset</Button>
              </div>
              <div className="w-full">
                <DatasetNutritionCard dataset={dataset} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 