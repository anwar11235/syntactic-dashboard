'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link2, Plus, CheckCircle, XCircle } from "lucide-react"
import { connectionService } from "@/lib/connections"
import { toast } from "sonner"

export default function ConnectionsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>({})

  const connections = [
    {
      id: 1,
      name: "Dropbox",
      description: "Connect to your Dropbox account to access and sync files",
      status: "Not Connected",
      icon: "https://cdn.worldvectorlogo.com/logos/dropbox-1.svg",
      fields: [
        { name: "accessToken", label: "Access Token", type: "password" }
      ]
    },
    {
      id: 2,
      name: "Google Drive",
      description: "Access and manage files from your Google Drive",
      status: "Not Connected",
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png",
      fields: [
        { name: "projectId", label: "Project ID", type: "text" },
        { name: "keyFilename", label: "Key Filename", type: "text" }
      ]
    },
    {
      id: 3,
      name: "AWS S3",
      description: "Connect to Amazon S3 buckets for cloud storage",
      status: "Not Connected",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Amazon-S3-Logo.svg/1200px-Amazon-S3-Logo.svg.png",
      fields: [
        { name: "accessKeyId", label: "Access Key ID", type: "password" },
        { name: "secretAccessKey", label: "Secret Access Key", type: "password" },
        { name: "region", label: "Region", type: "text" }
      ]
    },
    {
      id: 4,
      name: "Snowflake",
      description: "Connect to your Snowflake data warehouse",
      status: "Not Connected",
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg",
      fields: [
        { name: "account", label: "Account", type: "text" },
        { name: "username", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" },
        { name: "warehouse", label: "Warehouse", type: "text" },
        { name: "database", label: "Database", type: "text" }
      ]
    }
  ]

  const handleConnect = async (connection: any) => {
    setSelectedConnection(connection.name.toLowerCase().replace(' ', ''))
    setFormData({})
    setIsDialogOpen(true)
  }

  const handleDisconnect = async (connection: any) => {
    const serviceName = connection.name.toLowerCase().replace(' ', '')
    try {
      let result: { success: boolean; message: string }
      switch (serviceName) {
        case 'dropbox':
          result = await connectionService.disconnectDropbox()
          break
        case 'googledrive':
          result = await connectionService.disconnectGoogleDrive()
          break
        case 'awss3':
          result = await connectionService.disconnectS3()
          break
        case 'snowflake':
          result = await connectionService.disconnectSnowflake()
          break
        default:
          throw new Error('Unknown service')
      }

      if (result.success) {
        toast.success(result.message)
        // Update connection status in UI
        connection.status = "Not Connected"
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to disconnect')
    }
  }

  const handleSubmit = async () => {
    try {
      let result: { success: boolean; message: string }
      switch (selectedConnection) {
        case 'dropbox':
          result = await connectionService.connectToDropbox(formData.accessToken)
          break
        case 'googledrive':
          result = await connectionService.connectToGoogleDrive(formData)
          break
        case 'awss3':
          result = await connectionService.connectToS3(formData)
          break
        case 'snowflake':
          result = await connectionService.connectToSnowflake(formData)
          break
        default:
          throw new Error('Unknown service')
      }

      if (result.success) {
        toast.success(result.message)
        setIsDialogOpen(false)
        // Update connection status in UI
        const connection = connections.find(c => 
          c.name.toLowerCase().replace(' ', '') === selectedConnection
        )
        if (connection) {
          connection.status = "Connected"
        }
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to connect')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Connections</h1>
          <p className="text-muted-foreground mt-2">
            Manage your data source connections and integrations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Connection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connections.map((connection) => (
          <Card key={connection.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={connection.icon}
                      alt={`${connection.name} logo`}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{connection.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {connection.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {connection.status === "Connected" ? (
                    <span className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Connected
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-400 text-sm">
                      <XCircle className="h-4 w-4 mr-1" />
                      Not Connected
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2 text-sm text-muted-foreground">
                {connection.status === "Connected" && (
                  <>
                    <div className="flex justify-between">
                      <span>Last synced:</span>
                      <span>5 minutes ago</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {connection.status === "Connected" ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDisconnect(connection)}
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect(connection)}
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to {selectedConnection}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedConnection && connections
              .find(c => c.name.toLowerCase().replace(' ', '') === selectedConnection)
              ?.fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      [field.name]: e.target.value
                    })}
                  />
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 