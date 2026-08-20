const request = require("supertest");
const app = require("../app");
const UserModel = require("../models/user.model");

describe("Auth API Integration Tests", () => {
  const testUser = {
    name: "Test User",
    email: "testuser@example.com",
    password: "Password123!",
  };

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send(testUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain("User registered successfully");
      expect(response.body.data.email).toBe(testUser.email);
    });

    it("should reject duplicate email registration", async () => {
      // First registration
      await request(app).post("/api/auth/register").send(testUser);

      // Duplicate registration
      const response = await request(app)
        .post("/api/auth/register")
        .send(testUser);

      // Depending on the exact logic, it returns 200 with error: true or 400.
      // Looking at the controller earlier, it returns 200 with {error: true} for duplicates.
      // We will assert on the body flag.
      expect(response.body.error).toBe(true);
      expect(response.body.message).toBe("Email is already registered");
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      // Create user before testing login
      await request(app).post("/api/auth/register").send(testUser);

      // Note: The login controller checks if status === 'Active'.
      // The register controller creates them as 'Inactive' by default.
      // Let's force them to 'Active' so they can log in.
      await UserModel.findOneAndUpdate(
        { email: testUser.email },
        { status: "Active", verify_email: true }
      );
    });

    it("should login successfully with correct credentials and set cookies", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(testUser.email);
      expect(response.body.data).toHaveProperty("accesstoken");
      expect(response.body.data).toHaveProperty("refreshToken");

      // Verify cookies are set
      const cookies = response.headers["set-cookie"];
      expect(cookies).toBeDefined();
      expect(cookies.some((c) => c.includes("accessToken="))).toBe(true);
      expect(cookies.some((c) => c.includes("refreshToken="))).toBe(true);
    });

    it("should fail login with invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: "WrongPassword" })
        .expect(400);

      expect(response.body.error).toBe(true);
      expect(response.body.message).toBe("Incorrect password");
    });
  });
});
