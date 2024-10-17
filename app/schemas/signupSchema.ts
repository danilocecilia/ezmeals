import { z } from 'zod';

export const formSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: 'This field has to be filled.'
      })
      .email('This is not a valid email')
      .max(300, {
        message: "Password can't be longer than 300 characters."
      }),
    password: z
      .string()
      .min(6, { message: 'Password has to be at least 6 characters long.' }),
    confirmPassword: z.string().min(6, {
      message: 'Confirm-Password has to be at least 6 characters long.'
    })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword']
      });
    }
  });
