const mongoSanitize = require('express-mongo-sanitize'); // لكننا نضيف تبعية إضافية، ننفذ يدوياً

module.exports = (req, res, next) => {
  const removeDollarSign = (obj) => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key.startsWith('$')) delete obj[key];
        else removeDollarSign(obj[key]);
      }
    }
  };
  removeDollarSign(req.body);
  removeDollarSign(req.query);
  removeDollarSign(req.params);
  next();
};
