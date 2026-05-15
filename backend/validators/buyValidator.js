const Joi = require('joi');

exports.buyNumberSchema = Joi.object({
  factory: Joi.string().valid('main', 'backup').required(),
  country: Joi.string().length(2).required(),
  service: Joi.string().max(50).required(),
});
