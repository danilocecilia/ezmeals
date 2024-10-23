import { z } from 'zod';

export const mealPlannerSchema = z.object({
  dateFrom: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: 'Start date is required'
    }),
  dateTo: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: 'End date is required'
    }),
  selectedMeals: z.array(z.string()).nonempty('Select at least one meal'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  deliveryDate: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
      message: 'Delivery date is required'
    })
});
