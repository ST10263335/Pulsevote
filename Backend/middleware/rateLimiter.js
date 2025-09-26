
const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');

const keyByIp = (req) => ipKeyGenerator(req);

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: keyByIp,
  handler: (req, res) => {
    return res.status(429).json({
      message: 'Too many registration attempts. Please try again later.'
    });
  },
});

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    keyGenerator: (req) => `${keyByIp(req)}:${req.body?.email || ''}`,
    handler: (req, res) => {
      return res.status(429).json({
        message: 'Too many login attempts. Please try again later.'
      });
    },
});

module.exports = { registerLimiter, loginLimiter };
