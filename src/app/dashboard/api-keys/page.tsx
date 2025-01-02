'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Copy, Key, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

interface ApiKey {
  id: string
  name: string
  prefix: string
  createdAt: string
  lastUsed: string | null
  expiresAt: string | null
}

export default function ApiKeysPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Development Key",
      prefix: "pk_dev_",
      createdAt: "2024-02-20T10:00:00Z",
      lastUsed: "2024-02-21T15:30:00Z",
      expiresAt: null
    },
    {
      id: "2",
      name: "Production Key",
      prefix: "pk_prod_",
      createdAt: "2024-02-15T08:00:00Z",
      lastUsed: "2024-02-21T14:45:00Z",
      expiresAt: "2025-02-15T08:00:00Z"
    }
  ])

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name")
      return
    }

    // In a real app, this would make an API call to create the key
    const newKey = {
      id: Math.random().toString(),
      name: newKeyName,
      prefix: "pk_" + Math.random().toString(36).substring(2, 8),
      createdAt: new Date().toISOString(),
      lastUsed: null,
      expiresAt: null
    }

    // Simulate the full key that would be returned from the server
    setNewKeyValue(`${newKey.prefix}${Math.random().toString(36).substring(2, 30)}`)
    setApiKeys([...apiKeys, newKey])
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast.success("API key copied to clipboard")
  }

  const handleRevokeKey = (keyId: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== keyId))
    toast.success("API key revoked successfully")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-muted-foreground mt-2">
            Manage your API keys for accessing the platform programmatically
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Key
        </Button>
      </div>

      <div className="grid gap-6">
        {apiKeys.map((key) => (
          <Card key={key.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Key className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{key.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {key.prefix}•••••••••••••••
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{formatDate(key.createdAt)}</span>
                </div>
                {key.lastUsed && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last used</span>
                    <span>{formatDate(key.lastUsed)}</span>
                  </div>
                )}
                {key.expiresAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expires</span>
                    <span>{formatDate(key.expiresAt)}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleRevokeKey(key.id)}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Revoke Key
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
          </DialogHeader>
          {!newKeyValue ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Key Name</Label>
                <Input
                  id="keyName"
                  placeholder="e.g., Development API Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Make sure to copy your API key now. You won't be able to see it again!
                </p>
              </div>
              <div className="space-y-2">
                <Label>Your API Key</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    readOnly
                    value={newKeyValue}
                    className="font-mono"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleCopyKey(newKeyValue)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            {!newKeyValue ? (
              <>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateKey}>
                  Create Key
                </Button>
              </>
            ) : (
              <Button onClick={() => {
                setIsCreateDialogOpen(false)
                setNewKeyValue(null)
                setNewKeyName("")
              }}>
                Done
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 