'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Book, MessageSquare, FileText, ChevronRight, ChevronDown, ExternalLink } from "lucide-react"

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    question: "How do I get started with the API?",
    answer: "To get started, create an account and navigate to the API Keys page to generate your first API key. Then, follow our Quick Start guide in the documentation to make your first API call.",
    category: "Getting Started"
  },
  {
    question: "What are the API rate limits?",
    answer: "Rate limits vary by plan. The Starter plan includes 100k calls/month, Professional plan includes 500k calls/month, and Enterprise plan includes 2M calls/month. Check your usage in the dashboard.",
    category: "API Usage"
  },
  {
    question: "How do I upgrade my plan?",
    answer: "Go to the Billing page in your dashboard, where you can view available plans and upgrade with just a few clicks. Your new limits will be available immediately after upgrading.",
    category: "Billing"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and can also arrange wire transfers for Enterprise customers.",
    category: "Billing"
  },
  {
    question: "How do I connect my data sources?",
    answer: "Visit the Connections page to set up integrations with your data sources. We support various platforms including Dropbox, Google Drive, AWS S3, and Snowflake.",
    category: "Integrations"
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take security seriously. All data is encrypted in transit and at rest. We maintain SOC 2 compliance and regular security audits. View our security documentation for more details.",
    category: "Security"
  }
]

const guides = [
  {
    title: "Quick Start Guide",
    description: "Get up and running in less than 5 minutes",
    link: "/docs/quickstart"
  },
  {
    title: "API Reference",
    description: "Complete API documentation with examples",
    link: "/docs/api"
  },
  {
    title: "Integration Guide",
    description: "Learn how to integrate with popular services",
    link: "/docs/integrations"
  },
  {
    title: "Best Practices",
    description: "Tips and recommendations for optimal usage",
    link: "/docs/best-practices"
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([])

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleFAQ = (question: string) => {
    setExpandedFAQs(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    )
  }

  const groupedFAQs = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = []
    }
    acc[faq.category].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="text-muted-foreground mt-2">
          Find answers, documentation, and support
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for answers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative overflow-hidden">
          <div className="absolute right-2 top-2 p-2 bg-primary/10 rounded-full">
            <Book className="h-4 w-4 text-primary" />
          </div>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive guides and API references
            </p>
            <Button variant="outline" className="w-full">
              View Docs
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute right-2 top-2 p-2 bg-primary/10 rounded-full">
            <MessageSquare className="h-4 w-4 text-primary" />
          </div>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get help from our support team
            </p>
            <Button variant="outline" className="w-full">
              Open Ticket
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute right-2 top-2 p-2 bg-primary/10 rounded-full">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <CardHeader>
            <CardTitle>API Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Check system status and uptime
            </p>
            <Button variant="outline" className="w-full">
              View Status
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Popular Guides */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Guides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {guides.map((guide) => (
              <div
                key={guide.title}
                className="flex items-start space-x-4 p-4 rounded-lg border"
              >
                <Book className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {guide.description}
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Read More
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
              <div key={category}>
                <h3 className="font-medium text-lg mb-2">{category}</h3>
                <div className="space-y-2">
                  {categoryFAQs.map((faq) => (
                    <div
                      key={faq.question}
                      className="border rounded-lg"
                    >
                      <button
                        className="w-full flex items-center justify-between p-4 text-left"
                        onClick={() => toggleFAQ(faq.question)}
                      >
                        <span className="font-medium">{faq.question}</span>
                        {expandedFAQs.includes(faq.question) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {expandedFAQs.includes(faq.question) && (
                        <div className="px-4 pb-4 text-muted-foreground">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 