const authRepository = require("../repositories/auth.repository");
const bcrypt = require("bcrypt");
const otpservice = require("./otp.service");
const emailservice = require("./email.service");
const tokenRepository = require("../repositories/token.repository");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const pool = require("../database/database");
const { Client } = require("pg");
const AppError = require("../utils/error.handling");

const register = async (validatedData) => {
  const { email, password, ...rest } = validatedData;
  const exist = await authRepository.findByEmail(email);

  if (exist) {
    throw new AppError("user already exists.", 400);
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
    throw new AppError("invalid credentials", 400);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError("invalid credentials", 400);
  }

  if (!user.is_verified) {
    // /verfy-email
    const otp = otpservice.generateOTP();
    otpservice.storeOTP({ email, otp });
    await emailservice.sendOTPEmail({ email, otp });
    throw new AppError("email not verified, a new otp has been sent", 400);
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

const refreshToken = async (validatedData) => {
  const client = await pool.connect();

  const { refreshToken, device } = validatedData;

  const payload = verifyRefreshToken(refreshToken);

  const storedToken = await tokenRepository.findRefreshToken(refreshToken);

  if (!storedToken) {
    throw new AppError("Unauthorized", 401);
  }
  if (storedToken.user_id !== payload.id) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await authRepository.findById(payload.id);
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  try {
    await client.query(`BEGIN`);

    await tokenRepository.deleteRefreshToken(storedToken.id, client);

    await tokenRepository.saveRefreshToken(
      {
        userId: user.id,
        refreshToken: newRefreshToken,
        device,
        expiresAt,
      },
      client,
    );

    await client.query(`COMMIT`);
  } catch (error) {
    await client.query(`ROLLBACK`);
    throw error;
  } finally {
    await client.release();
  }

  return {
    accessTOken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

const verifyEmail = async (validatedData) => {
  const { email, otp } = validatedData;

  const verify = await otpservice.verifyOTP({ email, otp: Number(otp) });

  const user = await authRepository.findByEmail(email);
  if (!user) {
    throw new AppError("Unauthorized", 400);
  }
  if (user.is_verified === true) {
    throw new AppError("user already verified", 400);
  }

  const updateUser = await authRepository.updateUserVerification(email);

  return true;
};

const sendOTP = async (validatedData) => {
  const { email } = validatedData;

  const user = await authRepository.findByEmail(email);
  if (!user) {
    throw new AppError("Email not registered", 400);
  }

  if (user.is_verified) {
    throw new AppError("Email already verified", 400);
  }

  const otp = otpservice.generateOTP();

  await otpservice.storeOTP({ email, otp });

  await emailservice.sendOTPEmail({ email, otp });

  return "OTP sent";
};

module.exports = { register, login, refreshToken, verifyEmail, sendOTP };
