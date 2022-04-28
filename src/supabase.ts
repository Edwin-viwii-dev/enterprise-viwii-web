import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lkirkbemppopqylbnjzm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxraXJrYmVtcHBvcHF5bGJuanptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1MTA4ODc3OSwiZXhwIjoxOTY2NjY0Nzc5fQ.22QBJqEayHuL-zDGflFSjCQlBOJvYmNeJ2tx2DhLiD8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
