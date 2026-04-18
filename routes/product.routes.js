const express = require('express');
const { addProduct, fetchProduct, deleteProduct, updateProduct, getProduct, fetchArrival } = require('../controllers/product.controller');
const router = express.Router();

router.post('/product', addProduct);
router.get('/product', fetchProduct);
router.get('/product/arrival', fetchArrival);
router.delete('/product/:id', deleteProduct);
router.put('/product/:id', updateProduct);
router.get('/product/:slug', getProduct);
module.exports = router;