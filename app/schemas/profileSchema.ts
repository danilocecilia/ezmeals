import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const formSchema = z.object({
  full_name: z.string(),
  phone_number: z
    .string()
    .refine((val) => val === '' || isValidPhoneNumber(val), {
      message: 'Invalid phone number'
    })
    .optional(),
  address: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  email: z.string().email('This is not a valid email').max(300, {
    message: "Email can't be longer than 300 characters."
  })
});
