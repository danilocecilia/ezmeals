import { z } from 'zod';

export const mealPlannerSchema = z
  .object({
    dateRange: z.object(
      {
        from: z.date(),
        to: z.date()
      },
      {
        required_error: 'Please select a date range'
      }
    ),
    selectedMeals: z.array(z.string()).nonempty('Select at least one meal'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    deliveryDate: z.date({
      errorMap: () => ({
        message: 'Delivery date is required'
      })
    })
  })
  .refine((data) => data.dateRange.from < data.dateRange.to, {
    path: ['dateRange'],
    message: 'End date must be after start date'
  });
