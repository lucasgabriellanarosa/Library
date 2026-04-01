import { openLibraryApi } from "../lib/axiosClient";

export function useBooks() {

    async function searchBooks(query: string) {
        try {
            const response = await openLibraryApi.get('', {
                params: {
                    q: `${query} language:por`,
                    lang: 'pt',
                    limit: 10,
                    fields: 'title,title_suggest,author_name,cover_i,key,first_publish_year,ratings_average,subject,author_key,editions',
                }
            });
            return response.data.docs;
        } catch (error: any) {
            console.error("Erro na requisição:", error.response?.status);
            console.error("Conteúdo retornado:", error.response?.data);
            return [];
        }
    }

    return {
        searchBooks
    }

}