export interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user_data?: User;
}

