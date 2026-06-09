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
    const body = await req.json()

    console.log('BODY:', body)

    const { endpoint, params } = body

    const url = new URL(`https://openlibrary.org${endpoint}`)

    if (params) {
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key])
      })
    }

    console.log('FETCH URL:', url.toString())

    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'Delta Pearl Library/1.0',
      },
    })

    console.log('STATUS:', response.status)

    const text = await response.text()

    console.log('RAW RESPONSE:', text.slice(0, 500))

    return new Response(text, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: response.status,
    })

  } catch (error) {
    console.error('FUNCTION ERROR:', error)

    const message = error instanceof Error
      ? error.stack || error.message
      : String(error)

    return new Response(JSON.stringify({ error: message }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    })
  }
})