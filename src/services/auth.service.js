const authRepository = require("../repositories/auth.repository");
const bcrypt = require("bcrypt");
const otpservice = require("./otp.service");
const emailservice = require("./email.service");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const register = async (validatedData) => {
  const { email, password, ...rest } = validatedData;
  const exist = await authRepository.findByEmail(email);

  if (exist) {
    throw new Error("user already exists.");
  }

  const passwordHashed = await bcrypt.hash(password, 10);

  const result = await authRepository.createUser({
    email,
    password: passwordHashed,
    ...rest,
  });

  const otp = otpservice.generateOTP();

  await otpservice.storeOTP({ email, otp });

  await emailservice.sendOTPEmail({ email, otp });

  return result;
};

const login = async (validatedData) => {
  const { email, password } = validatedData;

  const user = await authRepository.findByEmail(email);
  if (!user) {
    throw new Error("invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("invalid credentials");
  }

  if (!user.is_verified) {
    // /verfy-email
    const otp = otpservice.generateOTP();
    otpservice.storeOTP({ email, otp });
    await emailservice.sendOTPEmail({ email, otp });
    throw new Error("email not verified, a new otp has been sent");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = { register, login };
