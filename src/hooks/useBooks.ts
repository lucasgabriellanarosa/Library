import { useState } from "react";
import { openLibraryApi } from "../lib/axiosClient";

export function useBooks() {

    const [loading, setLoading] = useState(false);

    async function searchBooks(query: string) {
        setLoading(true);
        try {
            const response = await openLibraryApi.get('/search.json', {
                params: {
                    q: `title:${query}`,
                    limit: 10,
                    fields: 'title,author_name,cover_i,key,ratings_average,author_key',
                }
            });
            return response.data.docs;
        } catch (error: any) {
            console.error("Erro na requisição:", error.response?.status);
            console.error("Conteúdo retornado:", error.response?.data);
            return [];
        } finally {
            setLoading(false);
        }
    }

    async function searchPopularBooks() {
        setLoading(true);
        try {
            const response = await openLibraryApi.get('trending/daily.json', {
                params: {
                    limit: 9,
                    fields: 'title,author_name,cover_i,key,ratings_average,author_key',
                }
            });
            return response.data.works;
        } catch (error: any) {
            console.error("Erro na requisição:", error.response?.status);
            console.error("Conteúdo retornado:", error.response?.data);
            return [];
        } finally {
            setLoading(false);
        }
    }

    return {
        searchBooks,
        searchPopularBooks,
        loading
    }

}