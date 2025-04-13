require("dotenv").config();
const Stripe = require("stripe");

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing in .env file");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
