import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Dataset, 
  QAPair, 
  ImageData, 
  TextData, 
  DocumentData, 
  EmbeddingData 
} from "@/types/dataset"

interface DatasetPreviewProps {
  dataset: Dataset;
}

interface TabularData {
  [key: string]: string | number;
}

function TabularPreview({ data }: { data: TabularData[] }) {
  if (!data.length) return null;
  const columns = Object.keys(data[0]);

  return (
    <ScrollArea className="h-[500px] w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(0, 50).map((row, i) => (
            <TableRow key={i}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

function ImagePreview({ data }: { data: ImageData[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {data.slice(0, 9).map((image, i) => (
        <div key={i} className="space-y-2">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img 
              src={image.url} 
              alt={image.caption || `Sample ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          {image.caption && (
            <p className="text-sm text-muted-foreground text-center">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function TextPreview({ data }: { data: TextData[] }) {
  return (
    <ScrollArea className="h-[500px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {data.slice(0, 10).map((item, i) => (
          <div key={i} className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm">{item.text}</p>
            {item.metadata && (
              <div className="mt-2 text-xs text-muted-foreground">
                {Object.entries(item.metadata).map(([key, value]) => (
                  <span key={key} className="mr-4">{key}: {String(value)}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function EmbeddingPreview({ data }: { data: EmbeddingData[] }) {
  return (
    <ScrollArea className="h-[500px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {data.slice(0, 10).map((item, i) => (
          <div key={i} className="p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Vector {i + 1}</span>
              <span className="text-xs text-muted-foreground">
                Dimensions: {item.vector.length}
              </span>
            </div>
            <div className="text-xs font-mono bg-background p-2 rounded">
              [{item.vector.slice(0, 10).map(v => v.toFixed(4)).join(', ')}
              {item.vector.length > 10 ? ', ...' : ''}]
            </div>
            {item.metadata && (
              <div className="mt-2 text-xs text-muted-foreground">
                {Object.entries(item.metadata).map(([key, value]) => (
                  <span key={key} className="mr-4">{key}: {String(value)}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function DocumentPreview({ data }: { data: DocumentData[] }) {
  return (
    <ScrollArea className="h-[500px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {data.slice(0, 10).map((doc, i) => (
          <div key={i} className="p-4 rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">{doc.title}</h4>
            <p className="text-sm text-muted-foreground">{doc.preview}</p>
            {doc.metadata && (
              <div className="mt-2 text-xs text-muted-foreground">
                {Object.entries(doc.metadata).map(([key, value]) => (
                  <span key={key} className="mr-4">{key}: {String(value)}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function QAPreview({ data }: { data: QAPair[] }) {
  return (
    <ScrollArea className="h-[500px] w-full rounded-md border p-4">
      <div className="space-y-6">
        {data.slice(0, 10).map((item, i) => (
          <div key={i} className="p-4 rounded-lg bg-muted/50">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-2">Q: {item.question}</h4>
                <p className="text-sm pl-4">A: {item.answer}</p>
              </div>
              {item.metadata && (
                <div className="pt-2 border-t border-border/50">
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(item.metadata).map(([key, value]) => (
                      <span key={key} className="text-xs px-2 py-1 rounded-full bg-secondary">
                        {key.replace(/_/g, ' ')}: {String(value)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function DatasetPreview({ dataset }: DatasetPreviewProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Explore Dataset</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{dataset.title} Preview</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-4">
            {dataset.type === 'tabular' && <TabularPreview data={dataset.sampleData} />}
            {dataset.type === 'image' && <ImagePreview data={dataset.sampleData} />}
            {dataset.type === 'text' && <TextPreview data={dataset.sampleData} />}
            {dataset.type === 'document' && <DocumentPreview data={dataset.sampleData} />}
            {dataset.type === 'embedding' && <EmbeddingPreview data={dataset.sampleData} />}
            {dataset.type === 'qa' && <QAPreview data={dataset.sampleData} />}
          </TabsContent>

          <TabsContent value="schema" className="mt-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-4">Dataset Schema</h3>
              {dataset.type === 'tabular' && dataset.sampleData.length > 0 && (
                <div className="space-y-2">
                  {Object.entries(dataset.sampleData[0]).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-4">
                      <span className="font-mono text-sm">{key}</span>
                      <span className="text-sm text-muted-foreground">{typeof value}</span>
                    </div>
                  ))}
                </div>
              )}
              {dataset.type === 'qa' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm">question</span>
                    <span className="text-sm text-muted-foreground">string</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm">answer</span>
                    <span className="text-sm text-muted-foreground">string</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm">metadata</span>
                    <span className="text-sm text-muted-foreground">object</span>
                  </div>
                </div>
              )}
              {dataset.type !== 'tabular' && dataset.type !== 'qa' && (
                <p className="text-sm text-muted-foreground">
                  Schema information not available for {dataset.type} data type.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-4">Dataset Statistics</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium">Total Samples</p>
                    <p className="text-2xl font-bold">
                      {Array.isArray(dataset.sampleData) ? dataset.sampleData.length : 'N/A'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium">Data Type</p>
                    <p className="text-2xl font-bold capitalize">{dataset.type}</p>
                  </div>
                </div>
                {dataset.type === 'qa' && dataset.sampleData.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium">Categories</p>
                      <p className="text-2xl font-bold">
                        {new Set(dataset.sampleData.map((item: QAPair) => item.metadata.category)).size}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium">Avg. Helpfulness</p>
                      <p className="text-2xl font-bold">
                        {(dataset.sampleData.reduce((acc: number, item: QAPair) => 
                          acc + item.metadata.avg_helpfulness_score, 0
                        ) / dataset.sampleData.length).toFixed(1)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 