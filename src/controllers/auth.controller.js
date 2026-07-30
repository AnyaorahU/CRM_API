const { success } = require("zod");
const validation = require("../middleware/validation.middleware");
const authService = require("../services/auth.service");

async function register(req, res) {
  console.log("controller reached");
  const validatedData = req.validatedData;
  const result = await authService.register(validatedData);

  return res.status(201).json({
    success: true,
    message: "user registered successful",
    data: result,
  });
}

async function login(req, res) {
  const validatedData = req.validatedData;

  const result = await authService.login(validatedData);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
}

async function refreshToken(req, res) {
  const validatedData = req.validatedData;
  const result = await authService.refreshToken(validatedData);

  return res.status(200).json({
    success: true,
    message: "token refreshed successfully",
    data: result,
  });
}

async function verifyEmail(req, res) {
  const validationData = req.validatedData;
  const result = await authService.verifyEmail(validationData);

  return res.status(200).json({
    success: true,
    message: "verification successful",
    data: result,
  });
}

async function sendOTP(req, res) {
  const validatedData = req.validatedData;
  const result = await authService.sendOTP(validatedData);

  return res.status(200).json({
    success: true,
    message: "OTP sent",
    data: result,
  });
}

module.exports = { register, login, refreshToken, verifyEmail, sendOTP };
