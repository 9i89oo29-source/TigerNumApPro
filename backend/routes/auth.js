const router = require('express').Router();
const authController = require('../controllers/authController');
const { validate } = require('../validators'); // سننشئ دالة validate عامة
const { registerSchema, loginSchema } = require('../validators/authValidator');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/refresh', authController.refreshToken);

module.exports = router;
