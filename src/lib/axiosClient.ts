import axios from 'axios';

const proxyUrl = import.meta.env.VITE_PROXY_URL || '';

export const openLibraryApi = axios.create({
  baseURL: proxyUrl ? `${proxyUrl}https://openlibrary.org/` : 'https://openlibrary.org/',
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