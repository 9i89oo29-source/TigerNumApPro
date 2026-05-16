const router = require('express').Router();
const metaController = require('../controllers/metaController');

router.get('/countries', metaController.getCountries);
router.get('/services', metaController.getServices);

module.exports = router;
