'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ActivityPage() {
  const activities = [
    {
      id: 1,
      title: "Project 'Landing Page' was updated",
      timestamp: "2 hours ago",
      type: "update"
    },
    {
      id: 2,
      title: "New task added to 'Mobile App'",
      timestamp: "5 hours ago",
      type: "create"
    },
    {
      id: 3,
      title: "Completed task 'Update Documentation'",
      timestamp: "1 day ago",
      type: "complete"
    },
    {
      id: 4,
      title: "New team member joined",
      timestamp: "2 days ago",
      type: "system"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activity</h1>
        <p className="text-muted-foreground mt-2">
          Track all activities and changes in your workspace
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 border-b last:border-0 pb-4 last:pb-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 