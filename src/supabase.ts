import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jgqxlgizovouoaelgveh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTQ5NTUyMCwiZXhwIjoxOTQ1MDcxNTIwfQ.Z6DYQ5iZh0eRV8vPZpuRnIBNW2XIVYbrSGGMVqabLkM"
const options = {
  schema: 'public',
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options)
