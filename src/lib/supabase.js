import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ncbjtvooshdcupfbhycn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jYmp0dm9vc2hkY3VwZmJoeWNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDkxMjYyNCwiZXhwIjoyMDk2NDg4NjI0fQ.Tr4f2acu5Qp1VR1lVeTvvEkQEvkSOo-MbGyVof-2uow'
)
