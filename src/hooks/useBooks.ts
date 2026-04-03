import { useState } from "react";
import { openLibraryApi } from "../lib/axiosClient";

export function useBooks() {

    const [loading, setLoading] = useState(false);

    // Get books based on a search query
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

    async function getWorkDetails(workKey: string) {

        setLoading(true);
        try {
            const response = await openLibraryApi.get(`/works/${workKey}.json`, {
                params: {
                    limit: 1,
                    fields: 'title,description,subjects,authors,covers,created,first_publish_date',
                }
            });
            return response.data;
        } catch (error: any) {
            console.error("Erro na requisição:", error.response?.status);
            console.error("Conteúdo retornado:", error.response?.data);
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function getWorkByISBN(isbn: string) {
        try {
            const response = await openLibraryApi.get(`/isbn/${isbn}.json`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar edições:", error);
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