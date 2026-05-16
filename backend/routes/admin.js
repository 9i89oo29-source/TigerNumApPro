const router = require('express').Router();
const { adminAuth } = require('../middleware/adminAuth');
const { validate } = require('../validators');
const { topupSchema, pricingSchema } = require('../validators/adminValidator');
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.get('/users', adminAuth, adminController.getUsers);
router.post('/topup', adminAuth, validate(topupSchema), adminController.topUp);
router.get('/pricing', adminAuth, adminController.getPricing);
router.post('/pricing', adminAuth, validate(pricingSchema), adminController.createPricing);
router.put('/pricing/:id', adminAuth, adminController.updatePricing);
router.delete('/pricing/:id', adminAuth, adminController.deletePricing);

module.exports = router;
