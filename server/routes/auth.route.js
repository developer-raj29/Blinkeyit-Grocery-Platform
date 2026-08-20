const express = require("express");
const router = express.Router();
const {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetpassword,
  verifyEmailController,
  verifyForgotPasswordOtp,
  googleAuthController,
} = require("../controllers/auth.controller.js");

const auth = require("../middlewares/auth.middleware.js");
const { authRateLimiter } = require("../middlewares/rateLimit.js");

// Public Access Routes
/*========================================Authentication================================*/
router.post("/register", authRateLimiter, registerUserController);
router.post("/verify-email", authRateLimiter, verifyEmailController);
router.post("/login", authRateLimiter, loginController);
router.post("/google", authRateLimiter, googleAuthController);

router.post("/forgot-password", authRateLimiter, forgotPasswordController);
router.post("/verify-forgot-password-otp", authRateLimiter, verifyForgotPasswordOtp);
router.post("/reset-password", authRateLimiter, resetpassword);
router.post("/refresh-token", refreshToken);

router.use(auth);

// User Access Routes
router.get("/logout", logoutController);

module.exports = router;
