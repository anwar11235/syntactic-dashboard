'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function MarketplacePage() {
  const datasets = [
    {
      id: 1,
      title: "Global Economic Indicators",
      description: "Comprehensive dataset of economic indicators from major world economies",
      price: "$499",
      category: "Economics"
    },
    {
      id: 2,
      title: "Social Media Trends",
      description: "Analysis of trending topics and user behavior across major social platforms",
      price: "$299",
      category: "Social Media"
    },
    {
      id: 3,
      title: "Climate Change Metrics",
      description: "Environmental data tracking global climate patterns and changes",
      price: "$399",
      category: "Environment"
    },
    {
      id: 4,
      title: "Consumer Behavior Analytics",
      description: "Detailed consumer purchasing patterns and preferences data",
      price: "$599",
      category: "Market Research"
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
                <Button variant="outline" size="sm">Try Dataset</Button>
              </div>
              <div className="flex justify-between w-full gap-3">
                <Button className="flex-1" variant="outline" size="sm">Lease Dataset</Button>
                <Button className="flex-1" variant="outline" size="sm">Purchase Dataset</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 