import { z } from 'zod';

export const mealSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z
    .union([z.string(), z.number()]) // Accept both string and number
    .transform((value) =>
      typeof value === 'number' ? value : parseFloat(value)
    ) // Transform to a number if it's a string
    .refine((value) => !isNaN(value), {
      message: 'Price must be a valid number'
    })
    .refine((value) => value > 0, {
      message: 'Price must be a positive number'
    })
    .refine((value) => Number(value.toFixed(2)) === value, {
      message: 'Price can only have up to 2 decimal places'
    }),
  side: z.boolean().optional(),
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
