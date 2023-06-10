import * as Joi from 'joi';

export const CreateUserValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
