const express = require("express");
const authorize = require("../middleware/auth.authorize");
const validation = require("../middleware/validation.middleware");
const leadValidation = require("../validations/lead.validation");
const leadController = require("../controllers/lead.controller");
const asyncHandler = require("../middleware/asynchandler");
const authMiddleware = require("../middleware/auth.middleware");

const leadRoute = express.Router();

leadRoute.post(
  "/",
  authMiddleware,
  authorize("admin", "sales", "user"),
  validation(leadValidation.createLeadSchema),
  asyncHandler(leadController.createLead),
);

leadRoute.get(
  "/",
  authMiddleware,
  authorize("admin", "sales", "user"),
  asyncHandler(leadController.getLeads),
);
module.exports = leadRoute;
