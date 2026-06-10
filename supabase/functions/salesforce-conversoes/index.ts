import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const CONSUMER_KEY = Deno.env.get('SF_CONSUMER_KEY')!
const USERNAME     = Deno.env.get('SF_USERNAME')!
const PRIVATE_KEY  = Deno.env.get('SF_PRIVATE_KEY')!
const INSTANCE_URL = 'https://asupernova.my.salesforce.com'
const AUDIENCE     = 'https://login.salesforce.com'

function b64url(data: ArrayBuffer | string): string {
  const str = typeof data === 'string' ? data : String.fromCharCode(...new Uint8Array(data))
  return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

async function getAccessToken(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + 300
  const header  = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = b64url(JSON.stringify({ iss: CONSUMER_KEY, sub: USERNAME, aud: AUDIENCE, exp }))
  const input   = `${header}.${payload}`

  const pem = PRIVATE_KEY.replace(/\\n/g, '\n')
  const b64 = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, '')
  const raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0))

  const key = await crypto.subtle.importKey(
    'pkcs8', raw,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false, ['sign']
  )
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(input))
  const jwt = `${input}.${b64url(sig)}`

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt,
  })
  const res  = await fetch(`${INSTANCE_URL}/services/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`SF auth: ${JSON.stringify(data)}`)
  return data.access_token
}

async function queryAll(token: string, soql: string): Promise<any[]> {
  const records: any[] = []
  let url: string | null = `${INSTANCE_URL}/services/data/v59.0/query?q=${encodeURIComponent(soql)}`
  while (url) {
    const r    = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    const data = await r.json()
    if (!r.ok) throw new Error(JSON.stringify(data))
    records.push(...data.records)
    url = data.done ? null : `${INSTANCE_URL}${data.nextRecordsUrl}`
  }
  return records
}

const PT_MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

function toMesLabel(dateStr: string): string {
  const d = new Date(dateStr)
  return `${PT_MONTHS[d.getUTCMonth()]}/${String(d.getUTCFullYear()).slice(2)}`
}

function toMesOrder(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const body = await req.json().catch(() => ({}))
    const { startDate, endDate } = body as { startDate?: string; endDate?: string }

    const token = await getAccessToken()

    let soql = `SELECT Id, CreatedDate, UTMCampaign__c FROM Opportunity WHERE Produto__c = 'AUVP Consultoria' AND StageName = 'Fechado e ganho' AND UTMSource__c = 'auvpescola'`
    if (startDate) soql += ` AND CreatedDate >= ${startDate}T00:00:00Z`
    if (endDate)   soql += ` AND CreatedDate <= ${endDate}T23:59:59Z`
    soql += ` ORDER BY CreatedDate DESC`

    const records = await queryAll(token, soql)

    const mesMap      = new Map<string, { order: string; value: number }>()
    const anoMap      = new Map<string, number>()
    const campanhaMap = new Map<string, number>()

    for (const r of records) {
      const label = toMesLabel(r.CreatedDate)
      const order = toMesOrder(r.CreatedDate)
      const ano   = String(new Date(r.CreatedDate).getUTCFullYear())

      const entry = mesMap.get(label)
      if (entry) entry.value++
      else mesMap.set(label, { order, value: 1 })

      anoMap.set(ano, (anoMap.get(ano) ?? 0) + 1)

      const camp = r.UTMCampaign__c ?? '(sem campanha)'
      campanhaMap.set(camp, (campanhaMap.get(camp) ?? 0) + 1)
    }

    const por_mes = [...mesMap.entries()]
      .sort(([, a], [, b]) => a.order.localeCompare(b.order))
      .map(([mes, { value }]) => ({ mes, value }))

    const por_ano = [...anoMap.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([mes, value]) => ({ mes, value }))

    const por_campanha = [...campanhaMap.entries()]
      .sort(([, a], [, b]) => b - a)
      .map(([nome, qtd]) => ({ nome, qtd }))

    return new Response(
      JSON.stringify({ total: records.length, por_mes, por_ano, por_campanha }),
      { headers: { ...CORS, 'Content-Type': 'application/json' } }
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } }
    )
  }
})
