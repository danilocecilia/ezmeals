import { z } from 'zod';

export const mealSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z
      .number()
      .positive()
      .or(
        z.string().refine((val) => !isNaN(parseFloat(val)), {
          message: 'Price must be a number'
        })
      )
      // Regex to ensure the price is a valid number format
      .refine((val) => /^[0-9]*\.?[0-9]+$/.test(val.toString()), {
        message: 'Price must be a number'
      })
  ),
  image: z.array(z.instanceof(File)),
  portionSize: z.string(),
  preparationTime: z.string().optional(),
  allergens: z.array(z.string()).optional(),
  notes: z.string().optional()
});
