-- Astrivya Users Table Setup for Supabase

-- Enable Row Level Security (RLS) - Supabase requirement
-- (You may need to enable this in Supabase dashboard)

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  otp_code VARCHAR(10) DEFAULT NULL,
  otp_expires TIMESTAMP DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_otp_expires ON users(otp_expires);
CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for Row Level Security
-- Allow users to insert their own records (for registration)
CREATE POLICY "Users can insert their own records" ON users
  FOR INSERT WITH CHECK (auth.uid()::text = id::text OR auth.jwt() ->> 'email' = email);

-- Allow users to read their own records
CREATE POLICY "Users can read their own records" ON users
  FOR SELECT USING (auth.uid()::text = id::text OR auth.jwt() ->> 'email' = email);

-- Allow authenticated users to update their own records
CREATE POLICY "Users can update their own records" ON users
  FOR UPDATE USING (auth.uid()::text = id::text OR auth.jwt() ->> 'email' = email);

-- For now, allow service role full access (since we're using API keys)
-- In production, you should restrict this
CREATE POLICY "Service role can do everything" ON users
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Create a service role policy for backend operations
-- This allows the API key to perform all operations
-- (Remove this in production and use proper JWT authentication)

-- Note: You will need to run this manually in Supabase Dashboard SQL Editor
-- Or through the Supabase CLI if you have it set up
