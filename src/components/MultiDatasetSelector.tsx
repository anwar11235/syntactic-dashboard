'use client'

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Dataset {
  id: number
  title: string
  description: string
  type: string
  sampleData: any[]
}

interface MultiDatasetSelectorProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (selectedData: { 
    datasets: Dataset[], 
    columns: Record<number, string[]>,
    finalColumns: { name: string, source: { datasetId: number, column: string } }[]
  }) => void
}

export function MultiDatasetSelector({ isOpen, onClose, onComplete }: MultiDatasetSelectorProps) {
  const [step, setStep] = useState<'datasets' | 'columns' | 'mapping'>('datasets')
  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>([])
  const [selectedColumns, setSelectedColumns] = useState<Record<number, string[]>>({})
  const [finalColumns, setFinalColumns] = useState<{ 
    name: string, 
    source: { datasetId: number, column: string } 
  }[]>([])

  // Example tabular datasets
  const availableDatasets: Dataset[] = [
    {
      id: 1,
      title: "Global Economic Indicators",
      description: "Economic indicators from major world economies",
      type: "tabular",
      sampleData: [
        { country: "USA", gdp_growth: 2.4, inflation: 3.1, unemployment: 3.8 },
        { country: "China", gdp_growth: 5.2, inflation: 2.1, unemployment: 4.1 }
      ]
    },
    {
      id: 2,
      title: "Consumer Behavior Analytics",
      description: "Consumer purchasing patterns and preferences",
      type: "tabular",
      sampleData: [
        { category: "Electronics", age_group: "18-24", spend: 450, frequency: 3 },
        { category: "Fashion", age_group: "25-34", spend: 280, frequency: 5 }
      ]
    }
  ]

  const handleDatasetSelect = (dataset: Dataset) => {
    if (selectedDatasets.find(d => d.id === dataset.id)) {
      setSelectedDatasets(selectedDatasets.filter(d => d.id !== dataset.id))
      const newColumns = { ...selectedColumns }
      delete newColumns[dataset.id]
      setSelectedColumns(newColumns)
    } else {
      setSelectedDatasets([...selectedDatasets, dataset])
    }
  }

  const handleColumnSelect = (datasetId: number, column: string) => {
    const currentColumns = selectedColumns[datasetId] || []
    if (currentColumns.includes(column)) {
      setSelectedColumns({
        ...selectedColumns,
        [datasetId]: currentColumns.filter(c => c !== column)
      })
    } else {
      setSelectedColumns({
        ...selectedColumns,
        [datasetId]: [...currentColumns, column]
      })
    }
  }

  const handleAddFinalColumn = () => {
    setFinalColumns([
      ...finalColumns,
      { name: `Column ${finalColumns.length + 1}`, source: { datasetId: 0, column: '' } }
    ])
  }

  const handleUpdateFinalColumn = (index: number, field: 'name' | 'source', value: any) => {
    const newFinalColumns = [...finalColumns]
    if (field === 'name') {
      newFinalColumns[index].name = value
    } else {
      const [datasetId, column] = value.split('|')
      newFinalColumns[index].source = {
        datasetId: parseInt(datasetId),
        column
      }
    }
    setFinalColumns(newFinalColumns)
  }

  const handleNext = () => {
    if (step === 'datasets') {
      if (selectedDatasets.length === 0) {
        return
      }
      setStep('columns')
    } else if (step === 'columns') {
      const isValid = selectedDatasets.every(dataset => 
        (selectedColumns[dataset.id] || []).length > 0
      )
      if (!isValid) {
        return
      }
      setStep('mapping')
    } else {
      if (finalColumns.length === 0) {
        return
      }
      onComplete({ datasets: selectedDatasets, columns: selectedColumns, finalColumns })
      onClose()
    }
  }

  const handleBack = () => {
    if (step === 'columns') {
      setStep('datasets')
    } else if (step === 'mapping') {
      setStep('columns')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {step === 'datasets' && 'Select Datasets'}
            {step === 'columns' && 'Select Columns'}
            {step === 'mapping' && 'Define Final Table Structure'}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {step === 'datasets' ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-1 gap-4">
                {availableDatasets.map((dataset) => (
                  <Card 
                    key={dataset.id}
                    className={`cursor-pointer transition-colors ${
                      selectedDatasets.find(d => d.id === dataset.id)
                        ? 'border-primary'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleDatasetSelect(dataset)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedDatasets.some(d => d.id === dataset.id)}
                          onCheckedChange={() => handleDatasetSelect(dataset)}
                        />
                        <h3 className="font-semibold">{dataset.title}</h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{dataset.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : step === 'columns' ? (
            <ScrollArea className="h-[400px] pr-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dataset</TableHead>
                    <TableHead>Available Columns</TableHead>
                    <TableHead>Selected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedDatasets.map((dataset) => (
                    <TableRow key={dataset.id}>
                      <TableCell className="font-medium">{dataset.title}</TableCell>
                      <TableCell>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.keys(dataset.sampleData[0] || {}).map((column) => (
                            <div key={column} className="flex items-center space-x-2">
                              <Checkbox
                                checked={(selectedColumns[dataset.id] || []).includes(column)}
                                onCheckedChange={() => handleColumnSelect(dataset.id, column)}
                              />
                              <label className="text-sm font-medium leading-none">
                                {column}
                              </label>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {(selectedColumns[dataset.id] || []).join(', ')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="space-y-4">
              <ScrollArea className="h-[400px] pr-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dataset</TableHead>
                      <TableHead>Column Name</TableHead>
                      <TableHead>Data Type</TableHead>
                      <TableHead>Include</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedDatasets.map((dataset) => (
                      selectedColumns[dataset.id]?.map((column) => (
                        <TableRow key={`${dataset.id}-${column}`}>
                          <TableCell className="font-medium">{dataset.title}</TableCell>
                          <TableCell>{column}</TableCell>
                          <TableCell>
                            {typeof dataset.sampleData[0][column] === 'number' ? 'Number' : 'Text'}
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              checked={finalColumns.some(
                                fc => fc.source.datasetId === dataset.id && fc.source.column === column
                              )}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFinalColumns([
                                    ...finalColumns,
                                    {
                                      name: column,
                                      source: { datasetId: dataset.id, column }
                                    }
                                  ])
                                } else {
                                  setFinalColumns(
                                    finalColumns.filter(
                                      fc => !(fc.source.datasetId === dataset.id && fc.source.column === column)
                                    )
                                  )
                                }
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full">
            {step !== 'datasets' && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <div className="flex justify-end flex-1 space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleNext}>
                {step === 'datasets' ? 'Next' : step === 'columns' ? 'Next' : 'Complete'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 