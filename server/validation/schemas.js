import Joi from 'joi';

export const NewProjectSchema = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  description: Joi.string().min(3).max(100).required(),
  clientId: Joi.string().uuid().required(),
  status: Joi.valid('In Progress', 'Not Started', 'Completed').default(
    'Not Started'
  ),
}).required();

export const UpdateProjectSchema = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(1).max(20),
  description: Joi.string().min(3).max(100),
  status: Joi.valid('In Progress', 'Not Started', 'Completed').default(
    'Not Started'
  ),
}).required();

export const NewClientSchema = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    )
    .required(),
}).required();
