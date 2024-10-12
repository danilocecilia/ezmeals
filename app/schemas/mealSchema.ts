import { z } from 'zod';

export const mealSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.string(),
  price: z.number(),
  image: z.instanceof(File),
  portionSize: z.union([z.string(), z.number()]),
  preparationTime: z.string().optional(),
  allergens: z.array(z.string()).optional(),
  notes: z.string().optional()
});
