import axios from 'axios';

export const openLibraryApi = axios.create({
  baseURL: 'https://openlibrary.org/',
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'Biblioteca/1.0 (lucasgabriellr.dev@outlook.com)'
  }
});

openLibraryApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
  };
  return config;
});