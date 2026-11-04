import { z } from 'zod';

export const preorder_validator = z.object({
  address: z.string().trim().min(5, { message: 'Address must be at least 5 characters long' }),
});

export const update_preorder_validator = z.object({
  address: z.string().trim().min(5, { message: 'Address must be at least 5 characters long' }),
});
