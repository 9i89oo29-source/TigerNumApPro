const Joi = require('joi');

exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: 'VALIDATION_ERROR', message: error.details[0].message });
  }
  next();
};
