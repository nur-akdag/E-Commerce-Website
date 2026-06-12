import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});