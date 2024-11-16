import { z } from 'zod';

import { Client } from '../models/Client.js';
import { Project } from '../models/Project.js';

export const NewProjectSchema = z.object({
  name: z
    .string()
    .min(2, 'Name has to be at least 2 characters long.')
    .refine(
      async name => {
        const project = await Project.findOne({ where: { name } });
        return project === null;
      },
      { message: 'Project with this name already exists!' }
    ),
  description: z
    .string()
    .min(3, 'This field should be at least 3 characters long!')
    .max(100, 'This field should not be more than 100 characters long!'),
  clientId: z
    .string()
    .uuid('This field is not a valid uuid!')
    .refine(
      async id => {
        const client = await Client.findByPk(id);
        return client !== null;
      },
      { message: "Client with this id doesn't exist!" }
    ),
  status: z
    .enum(['In Progress', 'Not Started', 'Completed'])
    .default('Not Started'),
});

export const UpdateProjectSchema = z
  .object({
    id: z
      .string()
      .uuid('This field is not a valid uuid!')
      .refine(
        async id => {
          const project = await Project.findByPk(id);
          return project !== null;
        },
        { message: "Project with this id doesn't exist!" }
      ),
    name: z
      .string()
      .min(2, 'Name has to be at least 2 characters long.')
      .refine(
        async name => {
          const project = await Project.findOne({ where: { name } });
          return project !== null;
        },
        { message: "Project with this name doesn't exist!" }
      ),
  })
  .merge(NewProjectSchema.omit({ clientId: true, name: true }));
