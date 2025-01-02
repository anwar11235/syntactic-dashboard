'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, ShoppingBag, GitBranch, CheckCircle, Circle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '@/contexts/AuthContext'

interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
}

const activityData = [
  { date: 'Feb 15', value: 2400 },
  { date: 'Feb 16', value: 1398 },
  { date: 'Feb 17', value: 9800 },
  { date: 'Feb 18', value: 3908 },
  { date: 'Feb 19', value: 4800 },
  { date: 'Feb 20', value: 3800 },
  { date: 'Feb 21', value: 4300 },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: '1',
      title: 'Complete your profile',
      description: 'Add your personal information and preferences',
      completed: false,
    },
    {
      id: '2',
      title: 'Connect your first data source',
      description: 'Import data from your favorite platforms',
      completed: false,
    },
    {
      id: '3',
      title: 'Create your first blueprint',
      description: 'Design your first data transformation workflow',
      completed: false,
    },
    {
      id: '4',
      title: 'Explore the marketplace',
      description: 'Discover pre-built templates and datasets',
      completed: false,
    },
  ])

  const toggleStep = (id: string) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, completed: !step.completed } : step
    ))
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">
          {user?.email}
        </p>
      </div>

      {/* Getting Started Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex-shrink-0">
                {step.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-slate-300" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              <Badge variant="outline">
                {step.completed ? 'Completed' : 'To do'}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Generate Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate sample data from a natural language prompt
            </p>
            <Button className="w-full">Try it out</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Start from Scratch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create a new project with a blank canvas
            </p>
            <Button variant="outline" className="w-full">Create Project</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Explore Marketplace</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse pre-built templates and datasets
            </p>
            <Button variant="outline" className="w-full">Browse Now</Button>
          </CardContent>
        </Card>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +4 new this week
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Sets</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              +3 new datasets
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 card-hover-effect">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 card-hover-effect">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New dataset uploaded
                  </p>
                  <p className="text-sm text-muted-foreground">
                    User123 uploaded Customer Analytics 2024
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  Just now
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Workflow completed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Data processing workflow completed successfully
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  2h ago
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New project created
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Team initiated Q1 Analysis Project
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  5h ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 