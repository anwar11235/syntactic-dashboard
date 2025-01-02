'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GitBranch, Play, Pause, Clock, RotateCcw, Settings, Plus, AlertCircle } from "lucide-react"

export default function WorkflowsPage() {
  const workflows = [
    {
      id: 1,
      title: "Daily Data Ingestion",
      description: "Automated pipeline for collecting and processing daily transaction data",
      status: "Running",
      lastRun: "2 minutes ago",
      nextRun: "23 hours",
      successRate: "99.8%",
      type: "Scheduled",
      steps: 5
    },
    {
      id: 2,
      title: "Customer Analytics",
      description: "Weekly customer behavior analysis and reporting pipeline",
      status: "Paused",
      lastRun: "2 days ago",
      nextRun: "Manual",
      successRate: "98.5%",
      type: "Manual",
      steps: 8
    },
    {
      id: 3,
      title: "Model Retraining",
      description: "Automated model retraining pipeline with performance validation",
      status: "Failed",
      lastRun: "1 hour ago",
      nextRun: "Manual",
      successRate: "95.2%",
      type: "Manual",
      steps: 6
    },
    {
      id: 4,
      title: "Data Quality Check",
      description: "Hourly data quality monitoring and alert system",
      status: "Running",
      lastRun: "45 minutes ago",
      nextRun: "15 minutes",
      successRate: "99.9%",
      type: "Scheduled",
      steps: 4
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'running':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'running':
        return <Play className="h-4 w-4" />
      case 'paused':
        return <Pause className="h-4 w-4" />
      case 'failed':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor your data processing pipelines
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{workflow.title}</CardTitle>
                <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getStatusColor(workflow.status)}`}>
                  {getStatusIcon(workflow.status)}
                  {workflow.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {workflow.description}
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Last run: {workflow.lastRun}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    <span>Next run: {workflow.nextRun}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <GitBranch className="h-4 w-4 mr-2" />
                    <span>{workflow.steps} steps</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>Success: {workflow.successRate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {workflow.status === 'Running' ? (
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 