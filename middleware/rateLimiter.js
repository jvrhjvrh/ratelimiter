const {
  increaseKey,
  timeUntilExpiration,
  addKeyExpiry
} = require('../redis/redis');

const privateMaxValue = process.env.PRIVATE_MAX_VALUE || 200;
const publicMaxValue = process.env.PUBLIC_MAX_VALUE || 100;
const expireTime = process.env.EXPIRE_TIME || 3600;

const convertToDate = (unixTime) => {
  return new Date(unixTime * 1000);
}

const calculateRate = async (key, weight, maxValue) => {
  const value = await increaseKey(key, weight);

  //Not awaiting because it isn't relevant when it finishes
  //NX option makes sure there won't be overwriting of the expiry time
  addKeyExpiry(key, expireTime, 'NX');

  if (value >= maxValue) {
    const time = await timeUntilExpiration(key);
    return {
      currentUse: value,
      overLimit: true,
      date: convertToDate(time)
    };
  }

  return {
    currentUse: value,
    overLimit: false,
  };
};

const rateLimiterMiddleware = (isPrivate, routeWeight) => async (req, res, next) => {
  let key, maxValue;

  if (isPrivate) {
    key = req.headers.authorization;
    maxValue = privateMaxValue;
  } else {
    key = req.socket.remoteAddress;
    maxValue = publicMaxValue;
  }

  const { currentUse, overLimit, date } = await calculateRate(key, routeWeight, maxValue);

  res.set('Current-Rate', currentUse);
  res.set('Rate-Limit', maxValue);
  if (overLimit) {
    return res.status(429).send(JSON.stringify({ err: date }));
  }

  return next();
};

module.exports = rateLimiterMiddleware;
