import axios from 'axios';

export const openLibraryApi = axios.create({
  baseURL: 'https://openlibrary.org/search.json',
  headers: {
    'Accept': 'application/json',
  }
});

openLibraryApi.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
  };
  return config;
});