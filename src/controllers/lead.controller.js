const { success } = require("zod");
const leadService = require("../services/lead.service");
const validation = require("../middleware/validation.middleware");

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
  const user = req.user;
  const limit = Number(req.query.limit) || 20;
  const page = Number(req.query.page) || 1;
  const search = req.query.search;
  const status = req.query.status;

  const result = await leadService.getLeads({
    limit,
    page,
    user,
    search,
    status,
  });

  res.status(200).json({
    success: true,
    message: "All Leads",
    data: result.leads,
    pagination: result.pagination,
  });
}

async function getLeadById(req, res) {
  const user = req.user;
  const validatedData = req.validatedData;

  const result = await leadService.getLeadById({ id, user });

  return res.status(200).json({
    success: true,
    message: "Lead Found",
    data: result,
  });
}

async function updateLead(req, res) {
  const { id } = req.validatedParams;
  const validatedData = req.validatedBody;
  const user = req.user;

  const result = await leadService.updateLead({ id, user, validatedData });

  res.status(200).json({
    success: true,
    message: "Lead updated",
    data: result,
  });
}

async function deleteLead(req, res) {
  const { id } = req.validatedParams;
  const user = req.user;

  const result = await leadService.deleteLead({ id, user });

  return res.status(200).json({
    success: true,
    message: "Lead Deleted",
    data: result,
  });
}

module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead };
