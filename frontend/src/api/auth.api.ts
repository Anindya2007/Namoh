import { apiRequest } from './client';
import { AuthResponse } from '../types/auth.types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  return apiRequest<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const logout = async (): Promise<{ success: boolean; message: string }> => {
  return apiRequest<{ success: boolean; message: string }>('/api/auth/logout', {
    method: 'POST',
  });
};

