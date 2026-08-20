const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  socket: {
    reconnectStrategy: false // Fails immediately if Redis is unavailable
  }
});

redisClient.on("error", (error) => {
  console.error("❌ Redis Connection Error:", error.message || error);
  // Graceful degradation: log the error but do not crash the app
});

redisClient.on("connect", () => {
  console.log("✅ Redis Connected Successfully");
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error("❌ Failed to connect to Redis during startup");
  }
};

module.exports = { redisClient, connectRedis };
