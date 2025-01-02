'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, Clock, BarChart, MoreVertical } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Customer Churn Analysis",
      description: "Predictive analytics model to identify potential customer churn",
      status: "In Progress",
      progress: 65,
      teamSize: 4,
      dueDate: "Dec 31, 2023",
      category: "Machine Learning"
    },
    {
      id: 2,
      title: "Sales Forecasting",
      description: "Time series analysis for quarterly sales predictions",
      status: "Planning",
      progress: 25,
      teamSize: 3,
      dueDate: "Jan 15, 2024",
      category: "Forecasting"
    },
    {
      id: 3,
      title: "Market Segmentation",
      description: "Customer segmentation using clustering algorithms",
      status: "Completed",
      progress: 100,
      teamSize: 5,
      dueDate: "Dec 15, 2023",
      category: "Analytics"
    },
    {
      id: 4,
      title: "Sentiment Analysis",
      description: "NLP model for social media sentiment analysis",
      status: "In Progress",
      progress: 45,
      teamSize: 3,
      dueDate: "Jan 30, 2024",
      category: "NLP"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in progress':
        return 'bg-blue-100 text-blue-800'
      case 'planning':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track your data science projects
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{project.teamSize} team members</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Due {project.dueDate}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BarChart className="h-4 w-4 mr-2" />
                  <span>{project.category}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 