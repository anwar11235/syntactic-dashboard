import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database
export type Profile = {
  id: string
  full_name: string | null
  company: string | null
  gender: string | null
  age: number | null
  purpose: string | null
  phone_number: string | null
  timezone: string | null
  created_at: string
  updated_at: string
}

export type Connection = {
  id: string
  user_id: string
  type: 'dropbox' | 'google-drive' | 'snowflake' | 'aws-s3'
  name: string
  status: 'connected' | 'disconnected' | 'error'
  credentials: string // Encrypted JSON string
  last_sync: string | null
  created_at: string
  updated_at: string
}