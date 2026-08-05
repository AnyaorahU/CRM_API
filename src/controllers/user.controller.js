const { success } = require("zod");
const userService = require("../services/userService");

async function getProfile(req, res) {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
}

async function updateProfile(req, res) {
  const validatedData = req.validatedData;
  const user = req.user;

  const result = await userService.updateProfile({ validatedData, user });

  res.status(200).json({
    success: true,
    message: "profile updated",
    data: result,
  });
}

async function updateRole(req, res) {
  const user = req.user;
  const validatedData = req.validatedData;

  const result = await userService.updateRole({ user, validatedData });

  return res.status(200).json({
    success: true,
    message: "role updated",
    data: result,
  });
}

module.exports = { getProfile, updateProfile, updateRole };
