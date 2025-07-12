const express = require('express');
const { fetchBanner, deleteBanner, addBanner, updateBanner } = require('../controllers/banner.controller');
const router = express.Router();

router.get('/banner', fetchBanner);
router.delete('/banner/:id', deleteBanner);
router.post('/banner', addBanner);
router.put('/banner/:id', updateBanner);
module.exports = router;