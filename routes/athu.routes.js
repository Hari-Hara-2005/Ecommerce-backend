const express = require('express');
const router = express.Router();

const { loginUser, registerUser } = require('../controllers/athu.controller');
const loginLimit = require('../middleware/rateLimit');

router.post('/login', loginLimit, loginUser);
router.post('/register', registerUser);

module.exports = router;