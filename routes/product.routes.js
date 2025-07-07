const express = require('express');
const { addProduct, fecthProduct, deleteProduct, updateProduct, getProduct } = require('../controllers/product.controller');
const router = express.Router();

router.post('/product', addProduct);
router.get('/product', fecthProduct);
router.delete('/product/:id', deleteProduct);
router.put('/product/:id', updateProduct);
router.get('/product/:slug', getProduct);
module.exports = router;