const Joi = require('joi');

export const schema = Joi.object().keys({
  productId: Joi.number(),
  productName: Joi.string().required(),
  productDesc: Joi.string().required(),
  productPrice: Joi.number().min(1).required(),
  productImage: Joi.string().allow('').optional()
  });
