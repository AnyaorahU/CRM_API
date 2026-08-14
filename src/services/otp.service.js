const crypto = require("crypto");
const redis = require("../config/redis");
const AppError = require("../errors/apperror");

function generateOTP() {
  const otp = crypto.randomInt(100000, 1000000);
  return otp;
}

async function storeOTP({ email, otp }) {
  const key = `otp:${email}`;
  const result = await redis.set(key, otp, "EX", 300);

  return result;
}

async function verifyOTP({ email, otp }) {
  const key = `otp:${email}`;
  const storedOTP = await redis.get(key);
  if (!storedOTP) {
    throw new AppError("otp not found", 404);
  }

  const match = Number(storedOTP) === otp;
  if (!match) {
    throw new AppError("invalid otp", 400);
  }

  await redis.del(key);

  return true;
}

module.exports = { generateOTP, storeOTP, verifyOTP };
