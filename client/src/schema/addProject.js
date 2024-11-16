import { z } from 'zod';

import { AddClientSchema } from './addClient';

export const AddProjectSchema = z
  .object({
    status: z.enum(['new', 'progress', 'completed'], {
      message: 'The value you entered is not a valid status!',
    }),
    description: z
      .string()
      .min(3, 'This field should be at least 3 characters long!')
      .max(100, 'This field should not be more than 100 characters long!'),
  })
  .merge(AddClientSchema.pick({ name: true }));
