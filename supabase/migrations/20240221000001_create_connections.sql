-- Create enum for connection types if they don't exist
DO $$ BEGIN
    CREATE TYPE connection_type AS ENUM ('dropbox', 'google-drive', 'snowflake', 'aws-s3');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create enum for connection status if it doesn't exist
DO $$ BEGIN
    CREATE TYPE connection_status AS ENUM ('connected', 'disconnected', 'error');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create connections table
CREATE TABLE IF NOT EXISTS public.connections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type connection_type NOT NULL,
    name TEXT NOT NULL,
    status connection_status DEFAULT 'connected' NOT NULL,
    credentials JSONB NOT NULL,
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_connections_user_id ON public.connections(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own connections" ON public.connections;
DROP POLICY IF EXISTS "Users can insert their own connections" ON public.connections;
DROP POLICY IF EXISTS "Users can update their own connections" ON public.connections;
DROP POLICY IF EXISTS "Users can delete their own connections" ON public.connections;

-- Create policies
CREATE POLICY "Users can view their own connections" 
    ON public.connections FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own connections" 
    ON public.connections FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own connections" 
    ON public.connections FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own connections" 
    ON public.connections FOR DELETE 
    USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at if it doesn't exist
DROP TRIGGER IF EXISTS update_connections_updated_at ON public.connections;
CREATE TRIGGER update_connections_updated_at
    BEFORE UPDATE ON public.connections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 