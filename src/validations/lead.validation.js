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

const getLeadsSchema = z.object({
  page: z.coerce.number().int().min(1).default(20),
  limit: z.coerce.number().int().min(1).max(20).default(20),
  search: z.string().trim().optional(),
  status: z.enum([
    "new",
    "contacted",
    "qualified",
    "proposal_sent",
    "won",
    "lost",
  ]).optional,
  sort: z
    .enum(["created_at", "full_name", "company_name"])
    .default("created_at"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

const getLeadByIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const updateLeadSchema = z.object({
  full_name: z.string().trim().min(2).optional(),
  job_title: z.string().trim().min(2).optional(),
  email: z.string().email().trim().optional(),
  phone_number: z
    .string()
    .trim()
    .min(10)
    .regex(/^[0-9+()-\s]+$/, "Invalid phone number")
    .optional(),
  company_name: z.string().trim().optional(),
  address: z.string().trim().optional(),
  lead_source: z.string().min(2).optional(),
  notes: z.string().optional(),
  status: z.enum([
    "new",
    "contacted",
    "qualified",
    "proposal_sent",
    "won",
    "lost",
  ]).optional,
});

module.exports = {
  createLeadSchema,
  getLeadsSchema,
  getLeadByIdSchema,
  updateLeadSchema,
};
