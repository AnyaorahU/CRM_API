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

module.exports = { register, login };
