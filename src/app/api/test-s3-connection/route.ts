import { NextResponse } from 'next/server'
import { S3 } from '@aws-sdk/client-s3'

export async function POST(request: Request) {
  try {
    const credentials = await request.json()

    const s3Client = new S3({
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey
      },
      region: credentials.region
    })

    // Test connection by trying to list objects (limit to 1)
    await s3Client.listObjectsV2({
      Bucket: credentials.bucket,
      MaxKeys: 1
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error testing S3 connection:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to test connection'
      },
      { status: 500 }
    )
  }
} 