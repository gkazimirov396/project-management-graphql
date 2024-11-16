import { z } from 'zod';

import { Client } from '../models/Client.js';

export const NewClientSchema = z.object({
  name: z.string().refine(
    async name => {
      const client = await Client.findOne({ where: { name } });
      return client === null;
    },
    { message: 'Client with this name already exists!' }
  ),
  email: z
    .string()
    .email('The value is not a valid email!')
    .refine(
      async email => {
        const client = await Client.findOne({ where: { email } });
        return client === null;
      },
      { message: 'Client with this email already exists!' }
    ),
  phone: z
    .string()
    .regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      'The value is not a valid phone number!'
    )
    .refine(
      async phone => {
        const client = await Client.findOne({ where: { phone } });
        return client === null;
      },
      { message: 'Client with this phone number already exists!' }
    ),
});
