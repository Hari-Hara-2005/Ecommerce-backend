const express = require('express');
const { addOrder } = require('../controllers/order.controller');
const router = express.Router();

router.post('/order', addOrder);

module.exports = router;