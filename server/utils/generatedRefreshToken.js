const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis.js");

const generatedRefreshToken = async (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );

  // Store in Redis with 7 days expiration (in seconds: 7 * 24 * 60 * 60 = 604800)
  await redisClient.setEx(`refresh_token:${userId}`, 604800, token);

  return token;
};

module.exports = generatedRefreshToken;
