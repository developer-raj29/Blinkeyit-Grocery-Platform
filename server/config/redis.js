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
    reconnectStrategy: (retries) => {
      if (retries > 10) return new Error("Max Redis reconnection retries reached");
      return Math.min(retries * 100, 3000);
    },
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

// Auto-connect as soon as module is loaded
(async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (err) {
    console.error("❌ Redis connection error:", err.message);
  }
})();

module.exports = { redisClient };
