import { z } from 'zod';

export const formSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.array(z.string()),
  price: z.number(),
  image: z.string().url(),
  portionSize: z.union([z.string(), z.number()]),
  preparationTime: z.string().optional(),
  allergens: z.array(z.string()).optional(),
  notes: z.string().optional()
});
