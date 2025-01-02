'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, Database, Zap, ArrowUpRight } from "lucide-react"

// Mock data for the charts
const apiUsageData = [
  { date: 'Feb 15', calls: 2300 },
  { date: 'Feb 16', calls: 3200 },
  { date: 'Feb 17', calls: 2800 },
  { date: 'Feb 18', calls: 4100 },
  { date: 'Feb 19', calls: 3700 },
  { date: 'Feb 20', calls: 3000 },
  { date: 'Feb 21', calls: 3500 }
]

const dataProcessedData = [
  { date: 'Feb 15', gb: 45 },
  { date: 'Feb 16', gb: 52 },
  { date: 'Feb 17', gb: 48 },
  { date: 'Feb 18', gb: 61 },
  { date: 'Feb 19', gb: 55 },
  { date: 'Feb 20', gb: 50 },
  { date: 'Feb 21', gb: 58 }
]

export default function UsagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Usage & Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your API usage, data consumption, and system performance
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total API Calls
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23,145</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Data Processed
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">369 GB</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Response Time
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124 ms</div>
            <p className="text-xs text-muted-foreground">
              -18% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Success Rate
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              +0.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="api-usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="api-usage">API Usage</TabsTrigger>
          <TabsTrigger value="data-processed">Data Processed</TabsTrigger>
        </TabsList>
        <TabsContent value="api-usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Calls Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={apiUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calls" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data-processed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Processed Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataProcessedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="gb" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Usage Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">/api/data/analyze</p>
                  <p className="text-sm text-muted-foreground">8,234 calls</p>
                </div>
                <p className="text-sm">35.6%</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">/api/data/transform</p>
                  <p className="text-sm text-muted-foreground">6,182 calls</p>
                </div>
                <p className="text-sm">26.7%</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">/api/data/export</p>
                  <p className="text-sm text-muted-foreground">4,829 calls</p>
                </div>
                <p className="text-sm">20.9%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Error Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Rate Limit Exceeded</p>
                  <p className="text-sm text-muted-foreground">42 occurrences</p>
                </div>
                <p className="text-sm">38.2%</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Invalid Parameters</p>
                  <p className="text-sm text-muted-foreground">35 occurrences</p>
                </div>
                <p className="text-sm">31.8%</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Authentication Failed</p>
                  <p className="text-sm text-muted-foreground">28 occurrences</p>
                </div>
                <p className="text-sm">25.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 