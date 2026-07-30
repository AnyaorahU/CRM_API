const { z } = require("zod");

const updateProfileSchema = z.object({
  name: z.string().trim().min(2),
});

module.exports = { updateProfileSchema };
