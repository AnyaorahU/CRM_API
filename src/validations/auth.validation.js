const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2).trim(),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .trim(),
});

const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1).trim(),
});

const verifyEmailSchema = z.object({
  email: z.string().email().trim(),
  otp: z.string().trim().length(6),
});

const sendOTPSchema = z.object({
  email: z.string().email().trim(),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  verifyEmailSchema,
  sendOTPSchema,
};
