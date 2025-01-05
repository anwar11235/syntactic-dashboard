import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

// This key should be stored in an environment variable
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_SUPABASE_ENCRYPTION_KEY || 'your-32-byte-secret-key-here-12345'

export function encryptCredentials(credentials: Record<string, string>): string {
  // Create a random initialization vector
  const iv = randomBytes(16)
  
  // Create cipher with AES-256-CBC
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  
  // Encrypt the credentials
  let encrypted = cipher.update(JSON.stringify(credentials))
  encrypted = Buffer.concat([encrypted, cipher.final()])
  
  // Return the IV and encrypted data as base64
  return JSON.stringify({
    iv: iv.toString('base64'),
    data: encrypted.toString('base64')
  })
}

export function decryptCredentials(encryptedData: string): Record<string, string> {
  const { iv, data } = JSON.parse(encryptedData)
  
  // Create decipher
  const decipher = createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(iv, 'base64')
  )
  
  // Decrypt the data
  let decrypted = decipher.update(Buffer.from(data, 'base64'))
  decrypted = Buffer.concat([decrypted, decipher.final()])
  
  // Parse and return the original credentials
  return JSON.parse(decrypted.toString())
} 