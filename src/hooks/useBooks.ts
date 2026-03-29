import { googleBooksApi } from "../lib/axiosClient"

export function useBooks() {

    async function searchBooks() {
        try {
            // Usamos o 'await' para esperar a Promise resolver
            // E como a baseURL já é '.../v1', passamos só o endpoint
            const response = await googleBooksApi.get('/volumes', {
                params: {
                    q: 'lord of the rings'
                }
            });

            // O Axios coloca os dados da API dentro da propriedade 'data'
            console.log("Dados dos livros:", response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
        }
    }

    function getBookById() {
        console.log("Book by id")
    }

    return {
        searchBooks,
        getBookById
    }

}