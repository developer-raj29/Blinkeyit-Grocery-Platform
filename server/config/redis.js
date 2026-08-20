const redis = require("redis");

const url = process.env.REDIS_URL || "redis://localhost:6379";

if (url.startsWith("https://") || url.startsWith("http://")) {
  console.error("❌ CRITICAL ERROR: You provided an HTTP REST URL for Redis.");
  console.error("Please go to Upstash, scroll down to the 'Node.js' tab or 'Redis Connect' section, and copy the URL that starts with 'rediss://'.");
  process.exit(1);
}

const redisClient = redis.createClient({
  url: url,
  socket: {
    reconnectStrategy: false, // Fails immediately if Redis is unavailable
    tls: url.startsWith("rediss://") ? true : undefined
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
