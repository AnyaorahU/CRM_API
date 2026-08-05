const authRepository = require("../repositories/auth.repository");
const userRepository = require("../repositories/user.repository");
const AppError = require("../utils/error.handling");

const updateProfile = async ({ validatedData, user }) => {
  const { name } = validatedData;
  const { id: userId } = user;

  const result = await userRepository.updateProfileName({ name, userId });

  return result;
};

const updateRole = async ({ user, validatedData }) => {
  const { id, role: userRole } = user;
  const { role } = validatedData;

  if (userRole !== "admin") {
    throw new AppError("access denied", 401);
  }

  const result = await userRepository.updateProfileRole({ id, role });

  return result;
};

module.exports = { updateProfile, updateRole };
