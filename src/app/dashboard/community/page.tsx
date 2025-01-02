'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, TrendingUp, Star } from "lucide-react"

export default function CommunityPage() {
  const discussions = [
    {
      id: 1,
      title: "Best practices for data preprocessing",
      author: "Sarah Chen",
      replies: 24,
      views: 156,
      category: "Best Practices"
    },
    {
      id: 2,
      title: "How to handle missing values effectively",
      author: "Michael Rodriguez",
      replies: 18,
      views: 203,
      category: "Data Cleaning"
    },
    {
      id: 3,
      title: "Feature engineering techniques for time series",
      author: "David Kim",
      replies: 31,
      views: 289,
      category: "Time Series"
    }
  ]

  const topMembers = [
    {
      id: 1,
      name: "Emma Wilson",
      role: "Data Scientist",
      contributions: 156,
      joined: "6 months ago"
    },
    {
      id: 2,
      name: "James Chen",
      role: "ML Engineer",
      contributions: 142,
      joined: "1 year ago"
    },
    {
      id: 3,
      name: "Sofia Patel",
      role: "Data Analyst",
      contributions: 98,
      joined: "3 months ago"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Community</h1>
        <p className="text-muted-foreground mt-2">
          Connect with other data professionals and share knowledge
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Discussions */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Discussions</CardTitle>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              New Discussion
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="flex items-start justify-between p-4 rounded-lg border"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium hover:text-blue-600 cursor-pointer">
                      {discussion.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Posted by {discussion.author}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{discussion.replies} replies</span>
                    <span>{discussion.views} views</span>
                    <span className="px-2 py-1 bg-secondary rounded-md">
                      {discussion.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Members */}
        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {member.contributions} contributions
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trending Topics */}
        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">Machine Learning</p>
                  <p className="text-sm text-muted-foreground">125 discussions</p>
                </div>
                <Star className="h-4 w-4" />
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="font-medium">Data Visualization</p>
                  <p className="text-sm text-muted-foreground">98 discussions</p>
                </div>
                <Star className="h-4 w-4" />
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <div className="flex-1">
                  <p className="font-medium">Deep Learning</p>
                  <p className="text-sm text-muted-foreground">87 discussions</p>
                </div>
                <Star className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 