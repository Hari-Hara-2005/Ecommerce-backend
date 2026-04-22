const express = require('express');
const router = express.Router();
const controller = require('../controllers/deleveryPrice.controller');

router.post('/delivery', controller.addDeliveryPrice);
router.get('/delivery', controller.getAllDeliveryPrices);
router.put('/delivery/:id', controller.updateDeliveryPrice);
router.delete('/delivery/:id', controller.deleteDeliveryPrice);

module.exports = router;