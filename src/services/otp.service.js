const crypto = require("crypto");
const redis = require("../config/redis");

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
    throw new Error("otp not found");
  }

  const match = Number(storedOTP) === otp;
  if (!match) {
    throw new Error("invalid otp");
  }

  await redis.del(key);

  return true;
}

module.exports = { generateOTP, storeOTP, verifyOTP };
