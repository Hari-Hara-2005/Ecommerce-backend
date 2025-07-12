const express = require('express');
const { addCart, fetchData, deleteCart } = require('../controllers/cart.controller');
const router = express.Router();

router.post('/cart', addCart);
router.get('/cart', fetchData);
router.delete('/cart/:id', deleteCart);

module.exports = router;