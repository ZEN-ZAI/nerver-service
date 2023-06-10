import * as Joi from 'joi';

export const CreateAddressValidator = Joi.object({
  receiver: Joi.string().required(),
  building_number: Joi.string().required(),
  street: Joi.string().required(),
  subdistrict: Joi.string().required(),
  district: Joi.string().required(),
  province: Joi.string().required(),
  postal_code: Joi.string().required(),
});
