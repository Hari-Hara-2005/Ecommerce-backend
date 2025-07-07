const express = require('express');
const { addCart, fecthData, deleteCart } = require('../controllers/cart.controller');
const router = express.Router();

router.post('/cart', addCart);
router.get('/cart', fecthData);
router.delete('/cart/:id', deleteCart);

module.exports = router;