import { Dropbox } from 'dropbox'

export async function testDropboxConnection(credentials: { accessToken: string }): Promise<boolean> {
  try {
    const dbx = new Dropbox({ accessToken: credentials.accessToken })
    // Test connection by trying to get account info
    const response = await dbx.usersGetCurrentAccount()
    return !!response.result.account_id
  } catch (error) {
    console.error('Dropbox connection test failed:', error)
    return false
  }
}

export async function testGoogleDriveConnection(credentials: {
  clientId: string
  clientSecret: string
  refreshToken: string
}): Promise<boolean> {
  try {
    // For Google Drive, we'll need to test the connection through our API
    const response = await fetch('/api/test-google-drive-connection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error('Failed to test Google Drive connection')
    }

    const result = await response.json()
    return result.success
  } catch (error) {
    console.error('Google Drive connection test failed:', error)
    return false
  }
}

export async function testSnowflakeConnection(credentials: {
  accountUrl: string
  username: string
  password: string
  warehouse: string
  database: string
}): Promise<boolean> {
  try {
    // For Snowflake, we'll need to test the connection through our API
    const response = await fetch('/api/test-snowflake-connection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error('Failed to test Snowflake connection')
    }

    const result = await response.json()
    return result.success
  } catch (error) {
    console.error('Snowflake connection test failed:', error)
    return false
  }
}

export async function testS3Connection(credentials: {
  accessKeyId: string
  secretAccessKey: string
  region: string
  bucket: string
}): Promise<boolean> {
  try {
    // For S3, we'll need to test the connection through our API
    const response = await fetch('/api/test-s3-connection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error('Failed to test S3 connection')
    }

    const result = await response.json()
    return result.success
  } catch (error) {
    console.error('S3 connection test failed:', error)
    return false
  }
} 