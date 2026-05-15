const Joi = require('joi');

exports.topupSchema = Joi.object({
  uuid: Joi.string().guid({ version: 'uuidv4' }).required(),
  amount: Joi.number().positive().required(),
});

exports.pricingSchema = Joi.object({
  factory: Joi.string().valid('main', 'backup').required(),
  country: Joi.string().length(2).required(),
  service: Joi.string().max(50).required(),
  retailPrice: Joi.number().positive().required(),
  baseCost: Joi.number().positive().required(),
  currency: Joi.string().length(3).uppercase().default('USD'),
});
