const { default: z } = require("zod");

const createLeadSchema = z.object({
  full_name: z.string().trim().min(2),
  job_title: z.string().trim().min(2).optional(),
  email: z.string().email().trim(),
  phone_number: z
    .string()
    .trim()
    .min(10)
    .regex(/^[0-9+()-\s]+$/, "Invalid phone number"),
  company_name: z.string().trim().optional(),
  address: z.string().trim().optional(),
  lead_source: z.string().min(2),
  notes: z.string().optional(),
});

module.exports = { createLeadSchema };
