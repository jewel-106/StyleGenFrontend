import axios from 'axios';

export const API_URL = 'https://stylegenbackend.netlify.app/';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Adding an Interceptor 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
