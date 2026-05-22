import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { BookDataType } from "../@types/BookData";
import type { BookType } from "../@types/BookType";
import { cache } from "../utils/cache";

interface SearchResponse {
    docs: BookType[];
    totalPages: number;
    numFound: number;
}

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

    // Get popular books for home page - HomePage.tsx
    async function getPopularBooks() {

        const cached = cache.get(`popular-books`);
        if (cached) return cached;

        setLoading(true);

        const MOCK_BOOKS: BookType[] = [
            { "author_name": ["Jane Austen"], "cover_i": 14348537, "key": "/works/OL66554W", "title": "Pride and Prejudice", "ratings_average": 4.1994886 },
            { "author_name": ["Lewis Carroll"], "cover_i": 10527843, "key": "/works/OL138052W", "title": "Alice's Adventures in Wonderland", "ratings_average": 4.059091 },
            { "author_name": ["Charles Dickens"], "cover_i": 12875748, "key": "/works/OL32466W", "title": "A Christmas Carol", "ratings_average": 3.962617 },
            { "author_name": ["Oscar Wilde"], "cover_i": 14314858, "key": "/works/OL8193416W", "title": "The Picture of Dorian Gray", "ratings_average": 4.1788616 },
            { "author_name": ["Emily Brontë"], "cover_i": 12818862, "key": "/works/OL21177W", "title": "Wuthering Heights", "ratings_average": 4.1166077 },
            { "author_name": ["Mark Twain"], "cover_i": 8157718, "key": "/works/OL53908W", "title": "Adventures of Huckleberry Finn", "ratings_average": 3.9586778 },
            { "author_name": ["Daniel Defoe", "J. J. Grandville", "Petrus Borel", "Les éditions du Rey", "N. C. Wyeth"], "cover_i": 368541, "key": "/works/OL45089W", "title": "Robinson Crusoe", "ratings_average": 3.92 },
            { "author_name": ["Nathaniel Hawthorne"], "cover_i": 5654516, "key": "/works/OL455305W", "title": "The Scarlet Letter", "ratings_average": 3.4047618 },
            { "author_name": ["William Shakespeare"], "cover_i": 8281954, "key": "/works/OL9170454W", "title": "Hamlet", "ratings_average": 4.018072 },
            { "author_name": ["Jane Austen"], "cover_i": 9278312, "key": "/works/OL66513W", "title": "Emma", "ratings_average": 3.9491525 },
            { "author_name": ["Charles Dickens"], "cover_i": 13300802, "key": "/works/OL8193478W", "title": "Oliver Twist", "ratings_average": 4.0864196 },
            { "author_name": ["Mary Shelley"], "cover_i": 12356249, "key": "/works/OL450063W", "title": "Frankenstein or The Modern Prometheus", "ratings_average": 3.967742 },
            { "author_name": ["Jane Austen"], "cover_i": 9278292, "key": "/works/OL66562W", "title": "Sense and Sensibility", "ratings_average": 3.8913043 },
            { "author_name": ["Charles Dickens"], "cover_i": 13301713, "key": "/works/OL8193465W", "title": "A Tale of Two Cities", "ratings_average": 3.79 },
            { "author_name": ["L. Frank Baum"], "cover_i": 552443, "key": "/works/OL18417W", "title": "The Wonderful Wizard of Oz", "ratings_average": 3.935484 },
            { "author_name": ["Robert Louis Stevenson"], "cover_i": 13859660, "key": "/works/OL24034W", "title": "Treasure Island", "ratings_average": 3.7755103 },
            { "author_name": ["Louisa May Alcott"], "cover_i": 8775559, "key": "/works/OL29983W", "title": "Little Women", "ratings_average": 4.041322 },
            { "author_name": ["William Shakespeare"], "cover_i": 872432, "key": "/works/OL258902W", "title": "Macbeth", "ratings_average": 3.979021 },
            { "author_name": ["Jonathan Swift"], "cover_i": 12717083, "key": "/works/OL20600W", "title": "Gulliver's Travels", "ratings_average": 3.6136363 },
            { "author_name": ["Jack London"], "cover_i": 12393037, "key": "/works/OL14942956W", "title": "The Call of the Wild", "ratings_average": 3.949367 },
            { "author_name": ["William Shakespeare"], "cover_i": 7420452, "key": "/works/OL259026W", "title": "King Lear", "ratings_average": 4 },
            { "author_name": ["Frances Hodgson Burnett"], "cover_i": 12622062, "key": "/works/OL69612W", "title": "The Secret Garden", "ratings_average": 3.9333334 },
            { "author_name": ["Miguel de Cervantes Saavedra"], "cover_i": 14428305, "key": "/works/OL503666W", "title": "Don Quijote de la Mancha", "ratings_average": 3.8947368 },
            { "author_name": ["Gustave Flaubert"], "cover_i": 12993424, "key": "/works/OL893707W", "title": "Madame Bovary", "ratings_average": 3.7307692 }
        ];

        try {
            const data = await callProxy('/trending/daily.json', {
                q: 'subject:fiction language:eng',
                fields: 'title,author_name,ratings_average,cover_i,key',
                sort: 'editions',
                limit: 24
            });

            cache.set(`popular-books`, data.works);
            return data.works as BookType[];

        } catch (error) {
            return MOCK_BOOKS;
        } finally {
            setLoading(false);
        }
    };

    // Get books by query - SearchPage.tsx
    async function searchBooks(query: string, page: number = 1): Promise<SearchResponse | null> {

        const cached = cache.get(`search-books-${query}-page${page}`);
        if (cached) return cached;

        setLoading(true);
        try {
            const data = await callProxy('/search.json', {
                q: `title:${query}`,
                limit: 24,
                fields: 'title,author_name,cover_i,key,ratings_average,author_key',
                page: page,
            });

            const total = Math.ceil(data.numFound / 24);

            cache.set(`search-books-${query}-page${page}`, {
                docs: data.docs,
                totalPages: total,
                numFound: data.numFound
            });

            return {
                docs: data.docs,
                totalPages: total,
                numFound: data.numFound
            };
        } catch (error) {
            console.error("Failed to search:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    // BookPage.tsx hooks (all four)

    async function getBookWithAuthors(workKey: string) {

        const cached = cache.get(`bookData-with-authors-${workKey}`);
        if (cached) return cached;

        setLoading(true);
        try {
            const cleanKey = workKey.replace('/works/', '');
            const data = await callProxy('/search.json', {
                q: `key:/works/${cleanKey}`,
                fields: 'title,author_name,ratings_average,cover_i,first_publish_year,number_of_pages_median,subject',
                limit: 1
            });

            if (data.docs && data.docs.length > 0) {
                cache.set(`bookData-with-authors-${workKey}`, data.docs[0]);
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

        const cached = cache.get(`bookData-description-${workKey}`);
        if (cached) return cached;

        try {
            const id = workKey.replace('/works/', '').replace(/\//g, '');

            const data = await callProxy(`/works/${id}.json`);

            if (!data) return "Description not available.";

            if (typeof data.description === 'string') {
                cache.set(`bookData-description-${workKey}`, data.description);
                return data.description;
            }

            cache.set(`bookData-description-${workKey}`, data.description?.value || "No description provided for this work");
            return data.description?.value || "No description provided for this work.";

        } catch (error) {
            console.error("Failed to load description:", error);
            return "Failed to load description.";
        }
    }

    async function getWorkByISBN(isbn: string) {
        setLoading(true);
        try {
            const data = await callProxy(`/isbn/${isbn}.json`);
            return data;
        } catch (error) {
            console.error("Failed to find ISBN:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function getSimilarBooks(bookData: BookDataType) {

        const cached = cache.get(`similarBooks-${bookData.title}`);
        if (cached) return cached;

        setLoading(true)
        try {
            let queryParams: any = {
                limit: 18,
                lang: "eng",
                fields: 'key,cover_i,author_name,title,ratings_average',
                sort: 'rating'
            };

            // Try to find books from the same author 
            if (bookData.author && bookData.author !== "Unknown Author") {
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
            cache.set(`similarBooks-${bookData.title}`, data.docs);
            return data.docs;
        } catch (error) {
            console.error("Failed to find similar books:", error);
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
        getPopularBooks,
        loading
    }
}