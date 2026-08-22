const http = require("http");
const app = require("./app");
const connectDB = require("./config/mongoDB");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and Redis concurrently, then start server
Promise.all([connectDB()]).then(() => {
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("❌ Critical server startup error:", error);
});
