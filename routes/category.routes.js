const express = require('express');
const { addCategory, fetchData, updateCategory, deleteCategory } = require('../controllers/category.controller');
const router = express.Router();

router.post('/category', addCategory);
router.get('/category', fetchData);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

module.exports = router;