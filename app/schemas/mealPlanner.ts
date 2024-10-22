import { z } from 'zod';

export const mealPlannerSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  meals: z.array(
    z.object({
      name: z.string(),
      _id: z.string()
    })
  ),
  quantity: z.number(),
  deliveryDate: z.string()
});
