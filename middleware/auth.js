const { isIdValid } = require('../controller/authController');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!isIdValid(authorization)) {
    return res.send(401);
  }
  next();
};

module.exports = authMiddleware;
