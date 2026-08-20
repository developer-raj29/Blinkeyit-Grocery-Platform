const request = require("supertest");
const app = require("../app");
const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");
const CartProductModel = require("../models/cartProduct.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("Cart API Integration Tests", () => {
  let userToken;
  let userId;
  let testProductId;

  beforeAll(async () => {
    // 1. Create a dummy user
    const user = await UserModel.create({
      name: "Cart Tester",
      email: "carttester@example.com",
      password: "Password123!",
      status: "Active",
      verify_email: true
    });
    userId = user._id;

    // 2. Generate an Access Token for auth
    userToken = jwt.sign(
      { id: userId },
      process.env.SECRET_KEY_ACCESS_TOKEN,
      { expiresIn: "1h" }
    );

    // 3. Create a dummy product
    const product = await ProductModel.create({
      name: "Organic Apples",
      price: 150,
      stock: 100,
      isAvailable: true,
      category: []
    });
    testProductId = product._id;
  });

  describe("POST /api/cart", () => {
    it("should reject unauthenticated requests", async () => {
      const response = await request(app)
        .post("/api/cart/create")
        .send({ productId: testProductId })
        .expect(401);
      
      expect(response.body.message).toMatch(/token/i);
    });

    it("should add a product to the cart successfully", async () => {
      const response = await request(app)
        .post("/api/cart/create")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ productId: testProductId })
        .expect(201);
      
      expect(response.body.success).toBe(true);
      
      // Verify DB state
      const cartItem = await CartProductModel.findOne({ userId, productId: testProductId });
      expect(cartItem).not.toBeNull();
      expect(cartItem.quantity).toBe(1);
    });

    it("should reject adding missing product ID", async () => {
      const response = await request(app)
        .post("/api/cart/create")
        .set("Authorization", `Bearer ${userToken}`)
        .send({}) // Send missing payload
        .expect(402);
      
      expect(response.body.error).toBe(true);
      expect(response.body.message).toBe("Provide productId");
    });
  });
});
