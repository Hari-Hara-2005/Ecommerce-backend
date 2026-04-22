const express = require('express');
const router = express.Router();
const { addDeliveryPrice, getAllDeliveryPrices, updateDeliveryPrice, deleteDeliveryPrice } = require('../controllers/deleveryprice.controller');

router.post('/delivery', addDeliveryPrice);
router.get('/delivery', getAllDeliveryPrices);
router.put('/delivery/:id', updateDeliveryPrice);
router.delete('/delivery/:id',deleteDeliveryPrice);

module.exports = router;