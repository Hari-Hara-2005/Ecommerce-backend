const express = require('express');
const { addBar, getBar, deleteBar } = require('../controllers/topbart.controller');
const router = express.Router();


router.post("/topbar",addBar);
router.get("/topbar",getBar);
router.delete("/topbar/:id",deleteBar);
module.exports = router;