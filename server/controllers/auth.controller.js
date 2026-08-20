const sendEmail = require("../config/sendEmail.js");
const UserModel = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const verifyEmailTemplate = require("../utils/verifyEmailTemplate.js");
const generatedAccessToken = require("../utils/generatedAccessToken.js");
const generatedRefreshToken = require("../utils/generatedRefreshToken.js");
const generatedOtp = require("../utils/generatedOTP.js");
const forgotPasswordTemplate = require("../utils/forgotPasswordTemplate.js");
const jwt = require("jsonwebtoken");
const mailSender = require("../config/sendEmail.js");
const { verifyGoogleToken } = require("../services/googleAuth.service.js");
const { redisClient } = require("../config/redis.js");

/**
 * @description Google Auth
 * @route POST /api/user/auth/google
 */
const googleAuthController = async (request, response) => {
  try {
    const { idToken } = request.body;
    if (!idToken) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "idToken is required",
      });
    }

    // 1. Verify Google Token using Service
    let payload;
    try {
      payload = await verifyGoogleToken(idToken);
    } catch (_verifyError) {
      return response.status(401).json({
        success: false,
        error: true,
        message: "Invalid or expired Google Token",
      });
    }

    const { email, name, sub: googleId, picture, email_verified } = payload;

    if (!email_verified) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Google email is not verified",
      });
    }

    // 2. Atomic Upsert & Update last login in ONE query
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        $setOnInsert: {
          name,
          email,
          avatar: picture,
          status: "Active",
          verify_email: true,
        },
        $set: {
          googleId,
          provider: "google",
          last_login_date: new Date(),
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    // 3. Issue Tokens
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    // 4. Secure Cookie Settings
    const isProduction = process.env.NODE_ENV === "production";
    
    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "Strict" : "Lax",
      maxAge: 15 * 60 * 1000, // 15 mins
    });

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "Strict" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return response.status(200).json({
      success: true,
      error: false,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (_error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: "Internal server error during authentication",
    });
  }
};

/**
 * @description Register User
 * @route POST /api/user/register
 */
const registerUserController = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Provide name, email, and password",
      });
    }

    // Email regex expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Invalid email format",
      });
    }

    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return response.json({
        success: false,
        error: true,
        message: "Email is already registered",
      });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    // Save new user
    const newUser = new UserModel(payload);
    const save = await newUser.save();

    // Email verification link
    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    // Send verification mail
    await mailSender(
      email,
      "Verify email from Blinkeyit",
      verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      })
    );

    return response.status(201).json({
      success: true,
      error: false,
      message: "User registered successfully. Please verify your email.",
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

/**
 * @description Verify Email
 * @route POST /api/user/verify-email
 */
const verifyEmailController = async (request, response) => {
  try {
    const { code } = request.query; // frontend sends /verify-email?code=123

    if (!code) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Verification code is required.",
      });
    }

    const user = await UserModel.findById(code);

    if (!user) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Invalid verification link or user does'nt exist.",
      });
    }

    if (user.verify_email) {
      return response.status(200).json({
        success: true,
        error: false,
        message: "Email already verified.",
        data: { id: user._id },
      });
    }

    user.verify_email = true;
    user.status = "Active";
    await user.save();

    return response.status(200).json({
      success: true,
      error: false,
      message: "Email verification successful.",
      data: { id: user._id },
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * @description Login
 * @route POST /api/user/login
 */
const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Provide email and password",
      });
    }

    // Email regex expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Invalid email format",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "User not registered",
      });
    }

    if (user.status !== "Active") {
      return response.status(400).json({
        message:
          "Account not active. Please contact ❤️Raj.Dev - The Binkeyit Team.",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Incorrect password",
      });
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    response.cookie("accessToken", accesstoken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    return response.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

/**
 * @description Logout
 * @route GET /api/user/logout
 */
const logoutController = async (request, response) => {
  try {
    const userid = request.userId; //middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);

    // Remove token from Redis
    await redisClient.del(`refresh_token:${userid}`);

    return response.json({
      success: true,
      error: false,
      message: "Logout successfully",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

/**
 * @description Forgot Password
 * @route PUT /api/user/forgot-password
 */
const forgotPasswordController = async (request, response) => {
  try {
    const { email } = request.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Email not available",
      });
    }

    const otp = generatedOtp();
    const expireTime = new Date() + 60 * 60 * 1000; // 1hr

    await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    await sendEmail(
      email,
      "Forgot password from Binkeyit",
      forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      })
    );

    return response.json({
      success: true,
      error: false,
      message: "check your email",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

/**
 * @description Verify Forgot Password Otp
 * @route PUT /api/user/verify-forgot-password-otp
 */
const verifyForgotPasswordOtp = async (request, response) => {
  try {
    const { email, otp } = request.body;

    if (!email || !otp) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Provide required field email, otp.",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Email not available",
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Otp is expired",
      });
    }

    if (otp !== user.forgot_password_otp) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Invalid otp",
      });
    }

    await UserModel.findByIdAndUpdate(user?._id, {
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });

    return response.json({
      success: true,
      error: false,
      message: "Verify otp successfully",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

/**
 * @description Resetpassword
 * @route PUT /api/user/reset-password
 */
const resetpassword = async (request, response) => {
  try {
    const { email, newPassword, confirmPassword } = request.body;

    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: "provide required fields email, newPassword, confirmPassword",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "Email is not available",
      });
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        success: false,
        error: true,
        message: "newPassword and confirmPassword must be same.",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    await UserModel.findOneAndUpdate(user._id, {
      password: hashPassword,
    });

    return response.json({
      success: true,
      error: false,
      message: "Password updated successfully.",
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

/**
 * @description Refresh Token
 * @route POST /api/user/refresh-token
 */
const refreshToken = async (request, response) => {
  try {
    const refreshToken =
      request.cookies.refreshToken ||
      request?.headers?.authorization?.split(" ")[1]; /// [ Bearer token]

    if (!refreshToken) {
      return response.status(401).json({
        success: false,
        error: true,
        message: "Invalid token",
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return response.status(401).json({
        success: false,
        error: true,
        message: "token is expired",
      });
    }

    const userId = verifyToken?.id;

    // Verify token exists and matches in Redis
    const storedToken = await redisClient.get(`refresh_token:${userId}`);
    if (storedToken !== refreshToken) {
      return response.status(401).json({
        success: false,
        error: true,
        message: "Session is invalid or revoked",
      });
    }

    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
    };

    response.cookie("accessToken", newAccessToken, cookiesOption);

    return response.json({
      success: true,
      error: false,
      message: "New Access token generated",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
};

module.exports = {
  registerUserController,
  verifyEmailController,
  loginController,
  logoutController,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  resetpassword,
  refreshToken,
  googleAuthController,
};



