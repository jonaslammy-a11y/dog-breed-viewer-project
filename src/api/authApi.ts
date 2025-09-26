import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://dummyjson.com/auth',
  timeout: 5000,
});

type LoginCredentials = {
  username: string;
  password: string;
  expiresInMins?: number; // Optional, default 60
};

export const login = async (credentials: LoginCredentials) => {
  const response = await authApi.post('/login', credentials);
  return response.data;
};

export const getMe = async (token: string) => {
  const response = await authApi.get('/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};