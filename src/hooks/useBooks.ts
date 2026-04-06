import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { BookDataType } from "../@types/BookData";

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
            const data = await callProxy('/search.json', {
                q: `key:/works/${cleanKey}`,
                fields: 'title,author_name,ratings_average,cover_i,first_publish_year,number_of_pages_median,subject',
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

    async function getWorkDescription(workKey: string) {
        try {
            const id = workKey.replace('/works/', '').replace(/\//g, '');

            const data = await callProxy(`/works/${id}.json`);

            if (!data) return "Description not available.";

            if (typeof data.description === 'string') {
                return data.description;
            }
            return data.description?.value || "No description provided for this work.";

        } catch (error) {
            console.error("Erro ao buscar descrição:", error);
            return "Failed to load description.";
        }
    }

    async function getSimilarBooks(bookData: BookDataType) {
        setLoading(true)
        try {
            let queryParams: any = {
                limit: 12,
                lang: "eng",
                fields: 'key,cover_i,author_name,title',
                sort: 'rating'
            };

            // Try to find books from the same author 
            if (bookData.author && bookData.author !== "Autor Desconhecido") {
                queryParams.q = bookData.author;
            }
            // Books with the same category 
            else if (bookData.categories.length > 0) {
                queryParams.q = bookData.categories[0].toLowerCase();
            }
            // Books with the same first word from the title
            else {
                const firstTitleWord = bookData.title?.split(' ')[0];
                queryParams.q = firstTitleWord;
            }
            const data = await callProxy('/search.json', queryParams);
            return data;
        } catch (error) {
            console.error("Erro ao buscar livros similares:", error);
            return "Failed to load description.";
        } finally {
            setLoading(false)
        }
    }

    return {
        searchBooks,
        getWorkByISBN,
        getBookWithAuthors,
        getWorkDescription,
        getSimilarBooks,
        loading
    }
}