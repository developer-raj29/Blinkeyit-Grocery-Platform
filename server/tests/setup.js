const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

// Mock environment variables securely
process.env.SECRET_KEY_ACCESS_TOKEN = "test-access-secret-123";
process.env.SECRET_KEY_REFRESH_TOKEN = "test-refresh-secret-456";
process.env.FRONTEND_URL = "http://localhost:5173";

// Mock the Redis client used by the app to use ioredis-mock instead
jest.mock("redis", () => {
  const RedisMock = require("ioredis-mock");
  return {
    createClient: () => {
      const mockClient = new RedisMock();
      mockClient.connect = jest.fn(); // Stub connect for v4+ clients
      mockClient.on = jest.fn();
      mockClient.setEx = mockClient.setex.bind(mockClient); // Patch camelCase for redis v4
      return mockClient;
    },
  };
});

// If the app uses Upstash Redis directly, mock it too
jest.mock("@upstash/redis", () => {
  const RedisMock = require("ioredis-mock");
  return {
    Redis: jest.fn().mockImplementation(() => {
      const mockClient = new RedisMock();
      mockClient.set = jest.fn();
      mockClient.get = jest.fn();
      return mockClient;
    })
  };
});

// Mock rate limiter to pass through during tests
jest.mock("../middlewares/rateLimit.js", () => {
  return {
    authRateLimiter: (req, res, next) => next(),
  };
});

// Mock sendEmail to prevent external network calls during tests
jest.mock("../config/sendEmail.js", () => {
  return jest.fn().mockResolvedValue({ success: true, messageId: "mock-test-id" });
});

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});
