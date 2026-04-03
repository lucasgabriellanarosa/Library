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

    async function getBookWithAuthors(workKey: string) {
    setLoading(true);
    try {
        const cleanKey = workKey.replace('/works/', '');
        // Buscamos pela chave da obra no endpoint de search
        const data = await callProxy('/search.json', {
            q: `key:/works/${cleanKey}`,
            fields: 'title,author_name,ratings_average,cover_i,first_publish_year,number_of_pages_median',
            limit: 1
        });

        if (data.docs && data.docs.length > 0) {
            return data.docs[0];
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        setLoading(false);
    }
}

    return {
        searchBooks,
        getWorkByISBN,
        getBookWithAuthors,
        loading
    }
}