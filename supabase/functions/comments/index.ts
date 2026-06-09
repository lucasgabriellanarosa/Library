import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// Importa o formatDistanceToNow padrão em inglês
import { formatDistanceToNow } from 'https://esm.sh/date-fns@2.30.0'

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { method: customMethod, body, urlParams } = await req.json()

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const authHeader = req.headers.get('Authorization')
    let user = null
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user: authUser } } = await supabase.auth.getUser(token)
      user = authUser
    }

    // ==========================================
    // 1. GET: FETCH COMMENTS FOR A BOOK
    // ==========================================
    if (customMethod === 'GET') {
      const url = new URL(`http://localhost/${urlParams || ''}`)
      const bookId = url.searchParams.get('bookId')
      
      if (!bookId) {
        return new Response(JSON.stringify({ error: 'bookId missing' }), { status: 400, headers: corsHeaders })
      }

      let query = supabase
        .from('comments')
        .select(`
          comment_id,
          content,
          created_at,
          user_id,
          profiles (
            username,
            avatar_url
          ),
          likes: comment_reactions(count),
          dislikes: comment_reactions(count),
          user_reaction: comment_reactions(type),
          replies: comments!parent_comment_id(count)
        `)
        .eq('book_id', bookId)
        .is('parent_comment_id', null)
        .eq('likes.type', 'LIKE')
        .eq('dislikes.type', 'DISLIKE')

      if (user?.id) {
        query = query.eq('user_reaction.user_id', user.id)
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      if (error) throw error

      const formatted = (data || []).map((item: any) => {
        const profile = Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
        return {
          id: item.comment_id,
          username: `${profile?.username || 'Anonymous'}`,
          avatar: profile?.avatar_url,
          // Formata o tempo relativo em inglês por padrão (ex: "1 minute ago")
          time: formatDistanceToNow(new Date(item.created_at), { addSuffix: true }),
          comment: item.content,
          likes: item.likes?.[0]?.count || 0,
          dislikes: item.dislikes?.[0]?.count || 0,
          replies: item.replies?.[0]?.count || 0,
          created_at: item.created_at,
          isAuthor: user ? item.user_id === user.id : false,
          currentUserReaction: user ? (item.user_reaction?.[0]?.type || null) : null
        }
      })

      return new Response(JSON.stringify(formatted), { headers: corsHeaders })
    }

    // Security check for mutations
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }

    // ==========================================
    // 2. POST: ADD COMMENT OR REACTION
    // ==========================================
    if (customMethod === 'POST') {
      if (body.targetReaction) {
        await supabase
          .from('comment_reactions')
          .delete()
          .match({ user_id: user.id, comment_id: body.commentId })
        
        if (body.currentStatus === body.targetReaction) {
          return new Response(JSON.stringify({ reaction: null }), { headers: corsHeaders })
        }

        const { error: upsertError } = await supabase
          .from('comment_reactions')
          .upsert({
            user_id: user.id,
            comment_id: body.commentId,
            type: body.targetReaction
          })
        
        if (upsertError) throw upsertError
        return new Response(JSON.stringify({ reaction: body.targetReaction }), { headers: corsHeaders })
      }

      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            user_id: user.id,
            book_id: body.bookId,
            content: body.content,
            parent_comment_id: body.parentCommentId || null
          }
        ])
        .select()
        .single()

      if (error) throw error
      return new Response(JSON.stringify({ data, error: null }), { headers: corsHeaders })
    }

    // ==========================================
    // 3. PATCH: UPDATE EXISTING COMMENT
    // ==========================================
    if (customMethod === 'PATCH') {
      const { data, error } = await supabase
        .from('comments')
        .update({ content: body.content })
        .eq('comment_id', body.commentId)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      return new Response(JSON.stringify(data), { headers: corsHeaders })
    }

    // ==========================================
    // 4. DELETE: REMOVE COMMENT
    // ==========================================
    if (customMethod === 'DELETE') {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('comment_id', body.commentId)
        .eq('user_id', user.id)

      if (error) throw error
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders })
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: corsHeaders })

  } catch (err: any) {
    console.error("Edge Function Error:", err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders })
  }
})