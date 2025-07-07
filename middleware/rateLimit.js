const rateLimit = require('express-rate-limit');

const loginLimit = rateLimit({
    window: 2 * 60 * 1000,
    max: 5,
    message: 'Too Many Attempts Made try Later..!',
    standardHeader: true,
    legacyHeader: false
});

module.exports = loginLimit;