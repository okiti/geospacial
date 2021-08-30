import Joi from '@hapi/joi';

export const signup = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  address: Joi.string(),
  location: {
    country: Joi.string(),
    city: Joi.string(),
    address: Joi.string(),
    loc: {
      type: Joi.string().default('Point'),
      coordinates: Joi.array(),
    },
  },
});

export const signin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});
