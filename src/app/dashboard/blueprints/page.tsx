'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Search, X, Wand2, Edit, Box, Database, Shield, Lock, LineChart, Table2, ShieldCheck, Files, ChevronDown } from "lucide-react"
import { MultiDatasetSelector } from "@/components/MultiDatasetSelector"

export default function BlueprintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [modelType, setModelType] = useState<string>("")
  const [noCodeOnly, setNoCodeOnly] = useState(false)
  const [isMultiDatasetSelectorOpen, setIsMultiDatasetSelectorOpen] = useState(false)

  const modelTypes = [
    { value: "", label: "All Types" },
    { value: "basic", label: "Basic" },
    { value: "advanced", label: "Advanced" },
    { value: "privacy", label: "Privacy" },
    { value: "transform", label: "Transform" }
  ]

  const blueprints = [
    {
      id: 1,
      title: "Generate data from a prompt",
      description: "Use Navigator to edit, augment, and create data from scratch.",
      icon: Wand2,
      type: "basic"
    },
    {
      id: 2,
      title: "Start from scratch",
      description: "Pick your own model type or select an existing model to get started.",
      icon: Edit,
      type: "basic"
    },
    {
      id: 3,
      title: "Generate Data from Multiple Marketplace Datasets",
      description: "Combine and transform multiple datasets from the marketplace to create new synthetic data.",
      icon: Files,
      type: "basic"
    },
    {
      id: 4,
      title: "Synthesize tabular data with Navigator Fine Tuning",
      description: "Use Syntactic's flagship model to create high-quality, domain-specific tabular datasets, supporting data types such as numeric, categorical, and free text.",
      icon: Box,
      type: "advanced"
    },
    {
      id: 5,
      title: "Transform unstructured data into AI-ready formats",
      description: "De-identify, transform, or label text and tabular data for AI.",
      icon: Database,
      type: "transform"
    },
    {
      id: 6,
      title: "Generate differentially-private synthetic numeric, categorical, and text data",
      description: "Use Navigator fine Tuning with Differential Privacy to synthesize tabular data with mathematical guarantees of privacy.",
      icon: Shield,
      badge: "New",
      type: "privacy"
    },
    {
      id: 7,
      title: "Produce free text data with privacy guarantees",
      description: "Leverage differentially private fine-tuning with GPT to generate a provably-private version of your free text data.",
      icon: Lock,
      type: "privacy"
    },
    {
      id: 8,
      title: "Optimize your synthetic data",
      description: "Automate hyperparameter tuning to create the best synthetic data for your task.",
      icon: LineChart,
      badge: "Notebook",
      type: "advanced"
    },
    {
      id: 9,
      title: "Generate synthetic data from complex tabular datasets",
      description: "Handle high-dimensional data with thousands of columns and millions of rows.",
      icon: Table2,
      type: "advanced"
    },
    {
      id: 10,
      title: "Create provably private versions of sensitive data",
      description: "Use Syntactic Tabular DP, our graph-based generative model, to generate synthetic data with strong differential privacy guarantees.",
      icon: ShieldCheck,
      type: "privacy"
    }
  ]

  const filteredBlueprints = blueprints.filter(blueprint => {
    const matchesSearch = blueprint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blueprint.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !modelType || blueprint.type === modelType
    return matchesSearch && matchesType
  })

  const handleMultiDatasetComplete = (selectedData: { datasets: any[], columns: Record<number, string[]> }) => {
    console.log('Selected datasets:', selectedData.datasets)
    console.log('Selected columns:', selectedData.columns)
    // Here you would typically handle the selected data
    // For example, navigate to a new page or open another dialog
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blueprints</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-8"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[180px]">
              {modelTypes.find(type => type.value === modelType)?.label || "Model Type"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {modelTypes.map((type) => (
              <DropdownMenuItem
                key={type.value}
                onClick={() => setModelType(type.value)}
              >
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="nocode"
            checked={noCodeOnly}
            onChange={(e) => setNoCodeOnly(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label
            htmlFor="nocode"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            No-code Console only
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlueprints.map((blueprint) => (
          <Card key={blueprint.id} className="flex flex-col h-full">
            <CardHeader className="flex flex-row items-start space-x-4 pb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                {blueprint.icon && <blueprint.icon className="h-5 w-5 text-primary" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{blueprint.title}</h3>
                  {blueprint.badge && (
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      {blueprint.badge}
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <p className="text-sm text-muted-foreground">
                {blueprint.description}
              </p>
              <div className="mt-4">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    if (blueprint.title === "Generate Data from Multiple Marketplace Datasets") {
                      setIsMultiDatasetSelectorOpen(true)
                    }
                  }}
                >
                  Select
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <MultiDatasetSelector
        isOpen={isMultiDatasetSelectorOpen}
        onClose={() => setIsMultiDatasetSelectorOpen(false)}
        onComplete={handleMultiDatasetComplete}
      />
    </div>
  )
} 