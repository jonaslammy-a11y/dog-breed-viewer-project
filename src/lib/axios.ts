import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export const backendApi = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
});

// Interceptor to add token
backendApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor for responses: Handle 401 expiry
backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      toast.error('Session expired. Please log in again.');
    }
    return Promise.reject(error);
  }
);