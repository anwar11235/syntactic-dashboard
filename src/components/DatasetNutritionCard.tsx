import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface MetricScore {
  name: string;
  score: string;
  color: string;
}

interface DatasetNutritionCardProps {
  dataset: {
    title: string;
    provider?: string;
  }
}

export function DatasetNutritionCard({ dataset }: DatasetNutritionCardProps) {
  const metrics: MetricScore[] = [
    { name: "Congruence", score: "95%", color: "bg-green-500/20" },
    { name: "Coverage", score: "88%", color: "bg-blue-500/20" },
    { name: "Constraint", score: "92%", color: "bg-indigo-500/20" },
    { name: "Completeness", score: "98%", color: "bg-purple-500/20" },
    { name: "Compliance", score: "100%", color: "bg-pink-500/20" },
    { name: "Comprehension", score: "90%", color: "bg-orange-500/20" },
    { name: "Consistency", score: "94%", color: "bg-teal-500/20" },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Dataset Nutrition Card</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Dataset Nutrition Card</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Dataset Identity */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Dataset Identity</h3>
            <p className="text-sm text-muted-foreground">Name: {dataset.title}</p>
            {dataset.provider && (
              <p className="text-sm text-muted-foreground">Provider: {dataset.provider}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">Last Updated: January 2025</p>
          </div>

          {/* Quality Metrics Grid */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Quality Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric) => (
                <div key={metric.name} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full ${metric.color} flex items-center justify-center mb-2`}>
                    <span className="text-foreground font-medium">{metric.score}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{metric.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Performance */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Task Performance</h3>
            <p className="text-sm text-muted-foreground">Classification Accuracy: 92%</p>
            <p className="text-sm text-muted-foreground">Segmentation IoU: 0.88</p>
          </div>

          {/* Usage Guidelines */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Usage Guidelines</h3>
            <ul className="space-y-1">
              <li className="text-sm text-muted-foreground">✓ Suitable for model training</li>
              <li className="text-sm text-muted-foreground">✓ Validated for research use</li>
              <li className="text-sm text-muted-foreground">⚠ Not validated for clinical deployment</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Documentation: view full details</p>
              <p className="text-sm text-muted-foreground">Support: contact provider</p>
              <p className="text-xs text-muted-foreground/70 mt-2">Last validated: 2024-12-15</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 