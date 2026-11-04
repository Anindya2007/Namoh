import { z } from 'zod';
import { ProductCategory } from '../../generated/prisma/enums.js';

export const product_validate = z.object({
    name: z.string().trim().min(1, 'Please enter name'),
    description: z.string().trim().min(1, 'Please enter description'),
    price: z.number().positive('Price must be a positive number'),
    stock: z.number().int().min(0, 'Stock cannot be negative'),
    category: z.nativeEnum(ProductCategory).default(ProductCategory.REGULAR),
    imageUrl: z.string().trim().optional(),
    images: z.array(z.string()).optional(),
});

export const product_partial_validate = product_validate.partial();
