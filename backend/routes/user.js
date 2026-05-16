const router = require('express').Router();
const { userAuth } = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/profile', userAuth, userController.getProfile);
router.get('/balance', userAuth, userController.getBalance);
router.get('/orders', userAuth, userController.getOrders);

module.exports = router;
