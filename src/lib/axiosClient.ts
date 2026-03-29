import axios from 'axios';

export const googleBooksApi = axios.create({
  // baseURL: 'https://www.googleapis.com/books/v1',
});

googleBooksApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    key: import.meta.env.VITE_GOOGLE_BOOKS_KEY,
  };
  return config;
});