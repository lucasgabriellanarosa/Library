import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useBooks() {
    const [loading, setLoading] = useState(false);

    // Proxy with Supabase Functions to avoid CORS issues and send User-Agent
    async function callProxy(endpoint: string, params?: any) {
        const { data, error } = await supabase.functions.invoke('api-proxy', {
            body: { endpoint, params }
        });
        if (error) throw error;
        return data;
    }

    async function searchBooks(query: string) {
        setLoading(true);
        try {
            const data = await callProxy('/search.json', {
                q: `title:${query}`,
                limit: 10,
                fields: 'title,author_name,cover_i,key,ratings_average,author_key',
            });
            return data.docs;
        } catch (error) {
            console.error("Erro na busca:", error);
            return [];
        } finally {
            setLoading(false);
        }
    }

    async function getWorkDetails(workKey: string) {
        setLoading(true);
        try {
            // Se o workKey já vier com /works/, removemos para não duplicar
            const cleanKey = workKey.replace('/works/', '');
            const data = await callProxy(`/works/${cleanKey}.json`);
            return data;
        } catch (error) {
            console.error("Erro nos detalhes:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function getWorkByISBN(isbn: string) {
        setLoading(true);
        try {
            const data = await callProxy(`/isbn/${isbn}.json`);
            return data;
        } catch (error) {
            console.error("Erro ao buscar ISBN:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return {
        searchBooks,
        getWorkDetails,
        getWorkByISBN,
        loading
    }
}