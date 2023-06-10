import * as Joi from 'joi';

export const LoginValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
