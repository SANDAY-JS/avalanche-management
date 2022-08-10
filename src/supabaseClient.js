import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://lzfxeawjoayhfqpstrky.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZnhlYXdqb2F5aGZxcHN0cmt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk3Nzk4MDEsImV4cCI6MTk3NTM1NTgwMX0.ESqhgV4wAQCzyFxhExS5HuRarsLc75_DLHRcrFytz9U"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)