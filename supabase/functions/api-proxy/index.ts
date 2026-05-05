import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { endpoint, params } = await req.json()

    const url = new URL(`https://openlibrary.org${endpoint}`)
    if (params) {
      Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
      )
    }

    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'Delta Pearl Library/1.0 (https://library-pearl-delta.vercel.app/ | lucasgabrielr.dev@outlook.com)',
      },
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})