const express = require("express");
const validation = require("../middleware/validation.middleware");
const authValidation = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");
const asyncHandler = require("../middleware/asynchandler");

const authRoutes = express.Router();

authRoutes.post(
  "/register",
  validation(authValidation.registerSchema),
  asyncHandler(authController.register),
);

authRoutes.post(
  "/login",
  validation(authValidation.loginSchema),
  asyncHandler(authController.login),
);

authRoutes.post(
  "/refresh ",
  validation(authValidation.refreshTokenSchema),
  asyncHandler(authController.refreshToken),
);

authRoutes.post(
  "/verify-email",
  validation(authValidation.verifyEmailSchema),
  asyncHandler(authController.verifyEmail),
);

authRoutes.post(
  "/send-otp",
  validation(authValidation.sendOTPSchema),
  asyncHandler(authController.sendOTP),
);

module.exports = authRoutes;
