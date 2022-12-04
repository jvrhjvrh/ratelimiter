const express = require('express');
const rateLimiterMiddleware = require('../middleware/rateLimiter');
const router = express.Router();

router.get('/', rateLimiterMiddleware(true, 1), (req, res) => {
  res.send('Your rate increased by 1');
});

router.get('/', rateLimiterMiddleware(true, 2), (req, res) => {
  res.send('Your rate increased by 2');
});

router.get('/', rateLimiterMiddleware(true, 5), (req, res) => {
  res.send('Your rate increased by 5');
});

module.exports = router;
