import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://4100.api.green-api.com',
  headers: { 'Content-Type': 'application/json' },
});