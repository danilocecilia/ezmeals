import { z } from 'zod';

export const mealSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: 'Price must be a valid number'
    })
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, {
      message: 'Price must be a positive number'
    })
    .refine((value) => Number(value.toFixed(2)) === value, {
      message: 'Price can only have up to 2 decimal places'
    }),
  image: z.array(
    z.object({
      name: z.string(),
      size: z.number(),
      key: z.string(),
      lastModified: z.number(),
      serverData: z.object({ uploadedBy: z.string() }),
      url: z.string().url(),
      appUrl: z.string().url(),
      customId: z.nullable(z.string()),
      type: z.string(),
      fileHash: z.string()
    })
  ),
  portionSize: z.string(),
  preparationTime: z.string().optional().nullable(),
  allergens: z.array(z.string()).optional(),
  notes: z.string().optional()
});
