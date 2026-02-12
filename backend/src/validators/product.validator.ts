import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200, 'Name too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  price: z
    .number({ required_error: 'Price is required' })
    .positive('Price must be positive')
    .max(99999.99, 'Price too high'),
  category: z.string().min(1, 'Category is required').max(100, 'Category too long'),
  imageUrl: z.string().url('Invalid image URL').optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative').optional().default(0),
  variants: z.array(z.string().min(1)).optional().default([]),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
