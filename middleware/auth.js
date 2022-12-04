const { isIdValid } = require('../controller/authController');

const authMiddleware = (req, res, next) => {
  const uuid = req.headers.authorization;
  if (!isIdValid(uuid)) {
    return res.send(401);
  }
  next();
};

module.exports = authMiddleware;
