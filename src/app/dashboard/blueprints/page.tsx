'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCode, Star, Copy, Download, Filter } from "lucide-react"

export default function BlueprintsPage() {
  const blueprints = [
    {
      id: 1,
      title: "Time Series Forecasting",
      description: "Complete workflow for time series analysis including data preprocessing, model selection, and evaluation",
      category: "Forecasting",
      stars: 245,
      downloads: "1.2K",
      difficulty: "Intermediate",
      tags: ["Python", "Prophet", "Pandas"]
    },
    {
      id: 2,
      title: "Customer Segmentation",
      description: "End-to-end clustering analysis pipeline with automated reporting and visualization",
      category: "Classification",
      stars: 189,
      downloads: "985",
      difficulty: "Advanced",
      tags: ["Python", "Scikit-learn", "Plotly"]
    },
    {
      id: 3,
      title: "Text Classification",
      description: "NLP pipeline for text classification including preprocessing, vectorization, and model training",
      category: "NLP",
      stars: 167,
      downloads: "756",
      difficulty: "Intermediate",
      tags: ["Python", "NLTK", "TensorFlow"]
    },
    {
      id: 4,
      title: "Anomaly Detection",
      description: "Real-time anomaly detection system with multiple algorithm options and alerting",
      category: "Monitoring",
      stars: 203,
      downloads: "1.1K",
      difficulty: "Advanced",
      tags: ["Python", "Isolation Forest", "Streamlit"]
    },
    {
      id: 5,
      title: "Data Quality Check",
      description: "Automated data quality assessment and reporting framework",
      category: "Data Quality",
      stars: 156,
      downloads: "678",
      difficulty: "Beginner",
      tags: ["Python", "Great Expectations", "Pandas"]
    },
    {
      id: 6,
      title: "A/B Testing",
      description: "Statistical analysis framework for A/B testing with visualization and reporting",
      category: "Statistics",
      stars: 134,
      downloads: "543",
      difficulty: "Intermediate",
      tags: ["Python", "SciPy", "Matplotlib"]
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-blue-100 text-blue-800'
      case 'advanced':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blueprints</h1>
          <p className="text-muted-foreground mt-2">
            Ready-to-use templates and workflows for data science projects
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <FileCode className="h-4 w-4 mr-2" />
            Create Blueprint
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blueprints.map((blueprint) => (
          <Card key={blueprint.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{blueprint.title}</CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(blueprint.difficulty)}`}>
                  {blueprint.difficulty}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                {blueprint.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground mb-4">
                {blueprint.description}
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  <span>{blueprint.stars}</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  <span>{blueprint.downloads}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Clone
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 