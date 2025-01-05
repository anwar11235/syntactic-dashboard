'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '@/lib/supabase'
import { encryptCredentials, decryptCredentials } from '@/lib/encryption'
import { toast } from 'sonner'
import {
  testDropboxConnection,
  testGoogleDriveConnection,
  testSnowflakeConnection,
  testS3Connection
} from '@/lib/connection-testers'

export type DataSourceType = 'dropbox' | 'google-drive' | 'snowflake' | 'aws-s3'

export interface ConnectionData {
  id: string
  type: DataSourceType
  name: string
  status: 'connected' | 'disconnected' | 'error'
  created_at: string
  last_sync?: string
  credentials: {
    [key: string]: string
  }
}

interface ConnectionContextType {
  connections: ConnectionData[]
  isLoading: boolean
  hasConnections: boolean
  addConnection: (type: DataSourceType, credentials: any) => Promise<void>
  removeConnection: (id: string) => Promise<void>
  testConnection: (type: DataSourceType, credentials: any) => Promise<boolean>
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined)

export const sourceConfigs = {
  'dropbox': {
    name: 'Dropbox',
    icon: '/icons/dropbox.svg',
    requiredFields: ['accessToken'],
    description: 'Connect your Dropbox account to import files and folders',
  },
  'google-drive': {
    name: 'Google Drive',
    icon: '/icons/google-drive.svg',
    requiredFields: ['clientId', 'clientSecret', 'refreshToken'],
    description: 'Access and import files from your Google Drive',
  },
  'snowflake': {
    name: 'Snowflake',
    icon: '/icons/snowflake.svg',
    requiredFields: ['accountUrl', 'username', 'password', 'warehouse', 'database'],
    description: 'Connect to your Snowflake data warehouse',
  },
  'aws-s3': {
    name: 'AWS S3',
    icon: '/icons/aws-s3.svg',
    requiredFields: ['accessKeyId', 'secretAccessKey', 'region', 'bucket'],
    description: 'Import data from your S3 buckets',
  },
}

export function ConnectionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [connections, setConnections] = useState<ConnectionData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadConnections()
    }
  }, [user])

  const loadConnections = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .eq('user_id', user?.id)

      if (error) throw error

      const decryptedConnections = data.map(conn => ({
        id: conn.id,
        type: conn.type as DataSourceType,
        name: conn.name,
        status: conn.status,
        created_at: conn.created_at,
        last_sync: conn.last_sync,
        credentials: decryptCredentials(conn.credentials),
      }))

      setConnections(decryptedConnections)
    } catch (error) {
      console.error('Error loading connections:', error)
      toast.error('Failed to load connections')
    } finally {
      setIsLoading(false)
    }
  }

  const addConnection = async (type: DataSourceType, credentials: any) => {
    try {
      const encryptedCreds = encryptCredentials(credentials)
      
      const { data, error } = await supabase
        .from('connections')
        .insert({
          user_id: user?.id,
          type,
          name: sourceConfigs[type].name,
          credentials: encryptedCreds,
          status: 'connected',
        })
        .select()
        .single()

      if (error) throw error

      const newConnection: ConnectionData = {
        id: data.id,
        type: data.type,
        name: data.name,
        status: data.status,
        created_at: data.created_at,
        last_sync: data.last_sync,
        credentials,
      }

      setConnections(prev => [...prev, newConnection])
    } catch (error) {
      console.error('Error adding connection:', error)
      throw new Error('Failed to add connection')
    }
  }

  const removeConnection = async (id: string) => {
    try {
      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)

      if (error) throw error

      setConnections(prev => prev.filter(conn => conn.id !== id))
    } catch (error) {
      console.error('Error removing connection:', error)
      throw new Error('Failed to remove connection')
    }
  }

  const testConnection = async (type: DataSourceType, credentials: any): Promise<boolean> => {
    try {
      switch (type) {
        case 'dropbox':
          return await testDropboxConnection(credentials)
        case 'google-drive':
          return await testGoogleDriveConnection(credentials)
        case 'snowflake':
          return await testSnowflakeConnection(credentials)
        case 'aws-s3':
          return await testS3Connection(credentials)
        default:
          throw new Error('Unsupported connection type')
      }
    } catch (error) {
      console.error(`Failed to test ${type} connection:`, error)
      return false
    }
  }

  return (
    <ConnectionContext.Provider 
      value={{ 
        connections, 
        isLoading, 
        hasConnections: connections.length > 0,
        addConnection,
        removeConnection,
        testConnection,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

export function useConnections() {
  const context = useContext(ConnectionContext)
  if (context === undefined) {
    throw new Error('useConnections must be used within a ConnectionProvider')
  }
  return context
} 