'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useConnections, sourceConfigs, type DataSourceType } from '@/contexts/ConnectionContext'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import Image from 'next/image'
import { Loader2, Plus, Trash2 } from 'lucide-react'

export default function ConnectionsPage() {
  const { connections, isLoading, addConnection, removeConnection, testConnection } = useConnections()
  const [selectedSource, setSelectedSource] = useState<DataSourceType | null>(null)
  const [credentials, setCredentials] = useState<{ [key: string]: string }>({})
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCredentialChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleConnect = async () => {
    if (!selectedSource) return

    setIsConnecting(true)
    try {
      // Test the connection first
      const isValid = await testConnection(selectedSource, credentials)
      if (!isValid) {
        throw new Error('Connection test failed')
      }

      // If test succeeds, add the connection
      await addConnection(selectedSource, credentials)
      toast.success('Data source connected successfully')
      setIsDialogOpen(false)
      setSelectedSource(null)
      setCredentials({})
    } catch (error) {
      toast.error('Failed to connect data source')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleRemove = async (id: string) => {
    try {
      await removeConnection(id)
      toast.success('Data source removed successfully')
    } catch (error) {
      toast.error('Failed to remove data source')
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Data Sources</h1>
          <p className="text-muted-foreground mt-2">
            Connect and manage your data sources
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Data Source
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Data Source</DialogTitle>
              <DialogDescription>
                Choose a data source and provide the required credentials
              </DialogDescription>
            </DialogHeader>
            
            {!selectedSource ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(sourceConfigs).map(([type, config]) => (
                  <Card 
                    key={type}
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => setSelectedSource(type as DataSourceType)}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 relative">
                        <Image
                          src={config.icon}
                          alt={config.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-medium text-center">{config.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid gap-4 py-4">
                  {sourceConfigs[selectedSource].requiredFields.map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>
                        {field.split(/(?=[A-Z])/).join(' ').toLowerCase()}
                      </Label>
                      <Input
                        id={field}
                        type={field.toLowerCase().includes('password') ? 'password' : 'text'}
                        value={credentials[field] || ''}
                        onChange={(e) => handleCredentialChange(field, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <DialogFooter className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedSource(null)
                      setCredentials({})
                    }}
                  >
                    Back
                  </Button>
                  <Button onClick={handleConnect} disabled={isConnecting}>
                    {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isConnecting ? 'Connecting...' : 'Connect'}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <Card>
            <CardContent className="p-6 flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ) : connections.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <h3 className="font-medium">No data sources connected</h3>
                <p className="text-sm text-muted-foreground">
                  Add your first data source to get started
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          connections.map((connection) => (
            <Card key={connection.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 relative">
                    <Image
                      src={sourceConfigs[connection.type].icon}
                      alt={connection.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle>{connection.name}</CardTitle>
                    <CardDescription>
                      Connected {new Date(connection.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleRemove(connection.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {connection.last_sync ? (
                    <p>Last synced: {new Date(connection.last_sync).toLocaleString()}</p>
                  ) : (
                    <p>No sync history</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 