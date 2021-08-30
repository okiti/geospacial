import Joi from '@hapi/joi';

export const createProduct = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.string().required(),
  images: Joi.array().required(),
  location: {
    country: Joi.string(),
    city: Joi.string(),
    address: Joi.string(),
  },
  geo: {
    type: Joi.string().default('Point'),
    coordinates: Joi.array(),
  },
});
