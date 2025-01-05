import { NextResponse } from 'next/server'
import { createConnection, Connection } from 'snowflake-sdk'

export async function POST(request: Request) {
  try {
    const credentials = await request.json()

    const result = await new Promise((resolve) => {
      const connection: Connection = createConnection({
        account: credentials.accountUrl,
        username: credentials.username,
        password: credentials.password,
        warehouse: credentials.warehouse,
        database: credentials.database
      })

      connection.connect((err) => {
        if (err) {
          console.error('Snowflake connection test failed:', err)
          resolve({ success: false, error: err.message })
          return
        }

        // Test connection by executing a simple query
        connection.execute({
          sqlText: 'SELECT 1',
          complete: (err) => {
            connection.destroy((destroyErr) => {
              if (destroyErr) {
                console.error('Error destroying connection:', destroyErr)
              }
            })
            if (err) {
              console.error('Snowflake query test failed:', err)
              resolve({ success: false, error: err.message })
              return
            }
            resolve({ success: true })
          }
        })
      })
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error testing Snowflake connection:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to test connection' },
      { status: 500 }
    )
  }
} 