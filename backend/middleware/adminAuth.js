const jwtUtils = require('../utils/jwt');

exports.adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'NO_TOKEN' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'NO_TOKEN' });

  const decoded = jwtUtils.verifyAccessToken(token);
  if (!decoded || decoded.role !== 'admin') return res.status(401).json({ error: 'INVALID_TOKEN' });
  req.admin = decoded;
  next();
};
