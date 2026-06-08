import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ncbjtvooshdcupfbhycn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jYmp0dm9vc2hkY3VwZmJoeWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTI2MjQsImV4cCI6MjA5NjQ4ODYyNH0.WKBu_Rkm7AaRjLwFuuJhT3ABuAzjidusR1bZzLo1sQs'
)
