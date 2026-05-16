const router = require('express').Router();
const { userAuth } = require('../middleware/auth');
const { validate } = require('../validators');
const { buyNumberSchema } = require('../validators/buyValidator');
const buyController = require('../controllers/buyController');

router.post('/number', userAuth, validate(buyNumberSchema), buyController.buyNumber);
router.get('/code/:orderId', userAuth, buyController.getSmsCode);

module.exports = router;
