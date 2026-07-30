const authRepository = require("../repositories/auth.repository");
const userRepository = require("../repositories/user.repository");

const updateProfile = async ({ validatedData, user }) => {
  const { name } = validatedData;
  const { id: userId } = user;

  const result = await userRepository.updateProfileName({ name, userId });

  return result;
};

module.exports = { updateProfile };
