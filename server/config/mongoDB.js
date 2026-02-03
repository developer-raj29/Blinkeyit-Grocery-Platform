const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("process.env.MONGO_DB: ", process.env.MONGO_DB);
    await mongoose.connect(process.env.MONGO_DB);
    console.log(`✅ MongoDB Connected Successfully`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = connectDB;
