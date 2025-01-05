import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request: Request) {
  try {
    const credentials = await request.json()

    const oauth2Client = new google.auth.OAuth2(
      credentials.clientId,
      credentials.clientSecret
    )
    
    oauth2Client.setCredentials({
      refresh_token: credentials.refreshToken
    })

    const drive = google.drive({ version: 'v3', auth: oauth2Client })
    
    // Test connection by trying to list files (limit to 1)
    const response = await drive.files.list({
      pageSize: 1,
      fields: 'files(id, name)'
    })
    
    return NextResponse.json({ success: !!response.data })
  } catch (error) {
    console.error('Error testing Google Drive connection:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to test connection'
      },
      { status: 500 }
    )
  }
} 