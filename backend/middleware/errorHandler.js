const logger = require('../config/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'VALIDATION_ERROR', message: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ error: 'DUPLICATE_ENTRY' });
  }
  const status = err.statusCode || 500;
  const message = err.message || 'INTERNAL_SERVER_ERROR';
  res.status(status).json({ error: message });
};
