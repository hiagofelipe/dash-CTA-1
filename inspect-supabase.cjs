const SUPABASE_URL = 'https://ncbjtvooshdcupfbhycn.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jYmp0dm9vc2hkY3VwZmJoeWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTI2MjQsImV4cCI6MjA5NjQ4ODYyNH0.WKBu_Rkm7AaRjLwFuuJhT3ABuAzjidusR1bZzLo1sQs'
const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}`, Prefer: 'count=exact' }

;(async () => {
  for (const table of ['typeform_leads_auvpcapital', 'log_analitica']) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id&limit=0`, { headers })
    const range = r.headers.get('content-range')   // e.g. "0-0/18729"
    console.log(`${table}: ${range}`)
  }

  // Also check log_analitica with status=approved filter
  const r2 = await fetch(
    `${SUPABASE_URL}/rest/v1/log_analitica?select=id&status=eq.approved&limit=0`,
    { headers }
  )
  console.log(`log_analitica (status=approved): ${r2.headers.get('content-range')}`)

  // And without 'teste' offer
  const r3 = await fetch(
    `${SUPABASE_URL}/rest/v1/log_analitica?select=id&offer_name=neq.teste&limit=0`,
    { headers }
  )
  console.log(`log_analitica (offer_name != teste): ${r3.headers.get('content-range')}`)

  // typeform without null heritage
  const r4 = await fetch(
    `${SUPABASE_URL}/rest/v1/typeform_leads_auvpcapital?select=id&heritage=not.is.null&limit=0`,
    { headers }
  )
  console.log(`typeform (heritage not null): ${r4.headers.get('content-range')}`)
})().catch(console.error)
