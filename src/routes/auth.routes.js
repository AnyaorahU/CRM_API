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
module.exports = authRoutes;
