import * as Joi from 'joi';

export const CreateOrderValidator = Joi.object({
  product_id: Joi.string().required(),
  address_id: Joi.string().required(),
});
