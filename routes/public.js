const express = require('express');
const rateLimiterMiddleware = require('../middleware/rateLimiter');
const router = express.Router();


/* GET home page. */
router.get('/', rateLimiterMiddleware(false, 1), (req, res) => {
  res.send('Your rate increased by 1');
});

router.get('/2', rateLimiterMiddleware(false, 2), (req, res) => {
  res.send('Your Rate increased by 2');
});

router.get('/5', rateLimiterMiddleware(false, 5), (req, res) => {
  res.send('Your Rate increased by 5');
});

module.exports = router;
