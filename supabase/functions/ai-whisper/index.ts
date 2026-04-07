import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { title, author, message } = await req.json()
    const apiKey = Deno.env.get('GEMINI_API_KEY')

    const prompt = `
  You are a specialized literary assistant with a deep book's knowledge. 
  The user is currently exploring the book "${title}" by "${author}".

  Your task is to:
  1. Answer specific questions about this book's plot, characters, or themes.
  2. Share interesting trivia about the author.
  3. Inform the user if there are any sequels, prequels, or if it's part of a series.
  4. Suggest similar books or literary movements.

  Instructions:
  - Be brief and conversational. Do NOT give summaries, trivia, or sequels unless explicitly asked.
  - If the user says "Hi" or similar, just greet them warmly, mention you're ready to talk about "${title}", and wait for their question.
  - Keep responses under 3 sentences unless a long explanation is required.
  - Be concise, friendly, and use a tone that reflects a genuine love for literature.
  - If you don't know a specific detail, offer to help find related information instead of hallucinating facts.
  - Match the user's language.

  User's question: ${message}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )

    const data = await response.json()
    const aiText = data.candidates[0].content.parts[0].text

    return new Response(JSON.stringify({ text: aiText }), {
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