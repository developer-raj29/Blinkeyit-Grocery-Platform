const rateLimit = require('express-rate-limit');

// Limiter for authentication routes (login, register, forgot-password)
// Protects against brute-force and dictionary attacks
const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: {
        message: 'Too many requests from this IP, please try again after 15 minutes',
        error: true,
        success: false
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
    authRateLimiter
};
