import { z } from 'zod';

export const register_validator = z.object({
    name: z.string().trim().min(1, 'name is required'),
    email: z.string().email().trim().min(1, 'Please provide an email'),
    password: z.string().trim().min(8, 'Password must be at least 8 characters long')
});

export const login_validator = z.object({
    email: z.string().email().trim().min(1, 'Please provide an email'),
    password: z.string().trim().min(8, 'Password must be at least 8 characters long')
});
