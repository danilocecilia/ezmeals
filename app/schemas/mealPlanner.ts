import { z } from 'zod';

export const mealPlannerSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  selectedMeals: z.array(z.string()),
  quantity: z.number(),
  deliveryDate: z.string()
});
