import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    // Recebemos o endpoint e os params do React
    const { endpoint, params } = await req.json()

    // Montamos a URL da Open Library
    const url = new URL(`https://openlibrary.org${endpoint}`)
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    }

    const response = await fetch(url.toString())
    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})