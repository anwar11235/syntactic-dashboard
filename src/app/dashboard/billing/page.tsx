'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Check, Zap, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface Plan {
  id: string
  name: string
  price: number
  features: string[]
  limits: {
    apiCalls: number
    storage: number
    dataProcessing: number
  }
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    features: [
      "100,000 API calls/month",
      "10 GB storage",
      "100 GB data processing",
      "Basic support",
      "48-hour response time"
    ],
    limits: {
      apiCalls: 100000,
      storage: 10,
      dataProcessing: 100
    }
  },
  {
    id: "pro",
    name: "Professional",
    price: 99,
    features: [
      "500,000 API calls/month",
      "50 GB storage",
      "500 GB data processing",
      "Priority support",
      "24-hour response time",
      "Advanced analytics"
    ],
    limits: {
      apiCalls: 500000,
      storage: 50,
      dataProcessing: 500
    }
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 299,
    features: [
      "2,000,000 API calls/month",
      "250 GB storage",
      "2 TB data processing",
      "24/7 premium support",
      "1-hour response time",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager"
    ],
    limits: {
      apiCalls: 2000000,
      storage: 250,
      dataProcessing: 2000
    }
  }
]

export default function BillingPage() {
  const [currentPlan] = useState<Plan>(plans[1]) // Pro plan by default
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  const handleUpgrade = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsPaymentDialogOpen(true)
  }

  const handlePaymentSubmit = () => {
    // In a real app, this would handle payment processing
    toast.success("Plan updated successfully")
    setIsPaymentDialogOpen(false)
  }

  // Calculate usage percentages
  const apiUsagePercent = Math.round((23145 / currentPlan.limits.apiCalls) * 100)
  const storageUsagePercent = Math.round((15 / currentPlan.limits.storage) * 100)
  const dataProcessingPercent = Math.round((369 / currentPlan.limits.dataProcessing) * 100)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription plan and billing details
        </p>
      </div>

      {/* Current Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Current Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">API Calls</span>
              <span className="text-sm text-muted-foreground">
                23,145 / {currentPlan.limits.apiCalls.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full">
              <div 
                className={`h-full rounded-full ${
                  apiUsagePercent > 90 ? 'bg-red-500' : 'bg-primary'
                }`}
                style={{ width: `${Math.min(apiUsagePercent, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Storage</span>
              <span className="text-sm text-muted-foreground">
                15 GB / {currentPlan.limits.storage} GB
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full">
              <div 
                className={`h-full rounded-full ${
                  storageUsagePercent > 90 ? 'bg-red-500' : 'bg-primary'
                }`}
                style={{ width: `${Math.min(storageUsagePercent, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Data Processing</span>
              <span className="text-sm text-muted-foreground">
                369 GB / {currentPlan.limits.dataProcessing} GB
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full">
              <div 
                className={`h-full rounded-full ${
                  dataProcessingPercent > 90 ? 'bg-red-500' : 'bg-primary'
                }`}
                style={{ width: `${Math.min(dataProcessingPercent, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${plan.id === currentPlan.id ? 'border-primary' : ''}`}
          >
            {plan.id === currentPlan.id && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                Current Plan
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-3xl font-bold">
                ${plan.price}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.id === currentPlan.id ? (
                <Button className="w-full" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  variant={plan.price > currentPlan.price ? "default" : "outline"}
                  onClick={() => handleUpgrade(plan)}
                >
                  {plan.price > currentPlan.price ? "Upgrade" : "Downgrade"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/24</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">February 2024</p>
                <p className="text-sm text-muted-foreground">Professional Plan</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$99.00</p>
                <Button variant="link" size="sm" className="h-auto p-0">
                  Download
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">January 2024</p>
                <p className="text-sm text-muted-foreground">Professional Plan</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$99.00</p>
                <Button variant="link" size="sm" className="h-auto p-0">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Subscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedPlan && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>New Plan</span>
                  <span className="font-medium">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-medium">${selectedPlan.price}/month</span>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label>Card Details</Label>
              <Input placeholder="•••• •••• •••• ••••" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label>CVC</Label>
                <Input placeholder="•••" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentSubmit}>
              Confirm Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 