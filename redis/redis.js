const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

const client = redis.createClient({
  host: redisHost,
  port: redisPort,
});

client.connect();

//Increase value in redis by weight, if not exists redis will create and start key with weight value
const increaseKey = async (key, weight) => client.INCRBY(`${key}`, `${weight}`);

const addKeyExpiry = async (key, time, option) => client.EXPIRE(`${key}`, `${time}`, `${option}`);

const timeUntilExpiration = async (key) => client.EXPIRETIME(`${key}`);

module.exports = {
  increaseKey,
  addKeyExpiry,
  timeUntilExpiration
};
