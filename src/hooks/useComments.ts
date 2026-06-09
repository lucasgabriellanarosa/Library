import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { AddCommentParams, BookComment } from "@/@types/Comments";

export default function useComments() {
    const [loadingCommentId, setLoadingCommentId] = useState<string | null>(null);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);

    // Proxy nativo com Supabase Functions (Igual ao do useBooks)
    async function callProxy(method: string, body?: any, urlParams?: string) {
        const { data, error } = await supabase.functions.invoke('comments', {
            body: { method, body, urlParams }
        });
        if (error) throw error;
        return data;
    }

    // Get all comments from a book 
    async function getBookComments(bookId: string): Promise<BookComment[]> {
        setIsCommentsLoading(true);
        try {
            // Passa os parâmetros simulando uma query string via payload
            const data = await callProxy('GET', null, `?bookId=${bookId}`);
            return data || [];
        } catch (error) {
            console.error("Failed to fetch comments:", error);
            return [];
        } finally {
            setIsCommentsLoading(false);
        }
    }

    // Add Comment
    async function addComment({ bookId, content, parentCommentId = null }: AddCommentParams) {
        try {
            const data = await callProxy('POST', { bookId, content, parentCommentId });
            return { data: data.data, error: data.error };
        } catch (error: any) {
            console.error("Failed to add comment:", error);
            return { data: null, error };
        }
    }

    // Update an existing comment
    async function updateComment({ commentId, content }: { commentId: string; content: string }) {
        try {
            const data = await callProxy('PATCH', { commentId, content });
            return data;
        } catch (error) {
            console.error("Failed to update comment:", error);
            throw error;
        }
    }

    // Delete a comment
    async function deleteComment(commentId: string) {
        try {
            await callProxy('DELETE', { commentId });
            return true;
        } catch (error) {
            console.error("Failed to delete comment:", error);
            throw error;
        }
    }

    // Handle like & dislike logic
    async function toggleCommentReaction(params: {
        targetReaction: string,
        commentId: string,
        currentStatus: string | null
    }) {
        setLoadingCommentId(params.commentId);
        try {
            const data = await callProxy('POST', params);
            return data.reaction; // Retorna a nova string de reação ou null
        } catch (error) {
            console.error("Failed to toggle reaction:", error);
            return null;
        } finally {
            setLoadingCommentId(null);
        }
    }

    return {
        getBookComments,
        addComment,
        updateComment,
        deleteComment,
        toggleCommentReaction,
        loadingCommentId,
        isCommentsLoading
    };
}