const { success } = require("zod");
const leadService = require("../services/lead.service");

async function createLead(req, res) {
  const validatedData = req.validatedData;
  const user = req.user;

  const result = await leadService.createLead({ validatedData, user });

  return res.status(201).json({
    success: true,
    message: "Lead Created successfully",
    data: result,
  });
}

async function getLeads(req, res) {
  const limit = Number(req.query.limit) || 20;
  const page = Number(req.query.page) || 1;
  const result = await leadService.getLeads({ limit, page });

  res.status(200).json({
    success: true,
    message: "All Leads",
    data: result,
  });
}

module.exports = { createLead, getLeads };
