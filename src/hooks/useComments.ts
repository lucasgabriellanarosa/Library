import { useAuthStore } from "@/stores/useAuthStore";
import { supabase } from "../lib/supabaseClient";
import type { AddCommentParams } from "@/@types/Comments";
import { formatDistanceToNow } from 'date-fns';
import { useState } from "react";

export default function useComments() {
    const { user } = useAuthStore();

    const [isLoading, setIsLoading] = useState(false)

    // Add Comment
    async function addComment({ bookId, content, parentCommentId = null }: AddCommentParams) {
        // Bloqueia a execução se o usuário não estiver logado
        if (!user) {
            console.log("Usuário precisa estar logado para comentar.");
            return { data: null, error: "Usuário não autenticado" };
        }

        const { data, error } = await supabase
            .from('comments')
            .insert([
                {
                    user_id: user.id,          // Pega o UUID do seu estado global de auth
                    book_id: bookId,           // ID do livro vindo do componente
                    content: content,          // O texto do comentário
                    parent_comment_id: parentCommentId // null se for comentário principal, ou UUID se for resposta
                }
            ])
            .select() // Retorna os dados do comentário que acabou de ser inserido no banco
            .single(); // Garante que retorne um objeto único em vez de um array

        if (error) {
            console.error("Erro ao adicionar comentário:", error.message);
            return { data: null, error };
        }

        return { data, error: null };
    }

    // Get all comments from a book 
    async function getBookComments(bookId: string) {
        const { data, error } = await supabase
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
            .eq('user_reaction.user_id', user?.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Failed to search comments:", error.message);
            return [];
        }

        return data.map(item => ({
            id: item.comment_id,
            username: `${item.profiles?.username}`,
            avatar: item.profiles?.avatar_url,
            time: formatDistanceToNow(new Date(item.created_at), { addSuffix: true }),
            comment: item.content,
            likes: item.likes?.[0]?.count || 0,
            dislikes: item.dislikes?.[0]?.count || 0,
            replies: item.replies?.[0]?.count || 0,
            isAuthor: user ? item.user_id === user.id : false,
            currentUserReaction: user ? (item.user_reaction?.[0]?.type || null) : null
        }));
    }

    // Handle like & dislike logic
    async function toggleCommentReaction(params: {
        targetReaction: string,
        commentId: string,
        currentStatus: string | null
    }) {

        if (!user) {
            console.log("Usuário precisa estar logado para comentar.");
            return { data: null, error: "Usuário não autenticado" };
        }

        setIsLoading(true)

        // Delete reaction
        await supabase
            .from('comment_reactions')
            .delete()
            .match({ user_id: user.id, comment_id: params.commentId })

        // No reaction anymore
        if (params.currentStatus === params.targetReaction) {
            setIsLoading(false)
            return null
        };

        // Add new reaction
        await supabase.from('comment_reactions').upsert({
            user_id: user.id,
            comment_id: params.commentId,
            type: params.targetReaction
        });

        setIsLoading(false)

        return params.targetReaction

    }

    return {
        addComment,
        getBookComments,
        toggleCommentReaction,
        isLoading
    };
}