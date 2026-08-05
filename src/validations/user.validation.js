const { z } = require("zod");

const updateProfileSchema = z.object({
  name: z.string().trim().min(2),
});

const updateProfileRole = z.object({
  role: z.enum(["admin", "sales", "viewer", "user"]).default("user"),
});

module.exports = { updateProfileSchema, updateProfileRole };
