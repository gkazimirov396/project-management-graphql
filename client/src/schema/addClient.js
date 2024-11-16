import { z } from 'zod';

export const AddClientSchema = z.object({
  name: z.string().min(2, 'Name has to be at least 2 characters long.'),
  email: z.string().email('The value you entered is not a valid email.'),
  phone: z
    .string()
    .regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g,
      'The value you entered is not a valid phone number.'
    ),
});
