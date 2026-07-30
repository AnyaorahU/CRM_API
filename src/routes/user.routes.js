const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");
const validation = require("../middleware/validation.middleware");
const userValidation = require("../validations/user.validation");
const asyncHandler = require("../middleware/asynchandler");

const userRoutes = express.Router();

userRoutes.get("/me", authMiddleware, userController.getProfile);

userRoutes.put(
  "/me",
  authMiddleware,
  validation(userValidation.updateProfileSchema),
  asyncHandler(userController.updateProfile),
);

module.exports = userRoutes;
