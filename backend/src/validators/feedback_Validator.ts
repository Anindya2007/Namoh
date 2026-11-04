import { z } from 'zod';

// Full validator for creating feedback
export const feedback_validator = z.object({
  productId: z.number().int().positive({ message: 'Valid productId is required' }),
  ratings: z.number().int().min(1, { message: 'Rating must be at least 1' }).max(5, { message: 'Rating cannot be greater than 5' }),
  review: z.string().trim().min(1, { message: 'Review cannot be empty' }),
});

// Partial validator for updating feedback (only ratings and review can be updated)
export const feedback_update_validator = z.object({
  ratings: z.number().int().min(1, { message: 'Rating must be at least 1' }).max(5, { message: 'Rating cannot be greater than 5' }).optional(),
  review: z.string().trim().min(1, { message: 'Review cannot be empty' }).optional(),
});
