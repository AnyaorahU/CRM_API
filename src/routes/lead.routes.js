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
  validation(leadValidation.getLeadsSchema, "query"),
  asyncHandler(leadController.getLeads),
);

leadRoute.get(
  "/:id",
  authMiddleware,
  authorize("admin", "sales", "user"),
  validation(leadValidation.getLeadByIdSchema, "params"),
  asyncHandler(leadController.getLeadById),
);

leadRoute.patch(
  "/:id",
  authMiddleware,
  authorize("admin", "sales"),
  validation(leadValidation.getLeadByIdSchema, "params"),
  validation(leadValidation.updateLeadSchema, "body"),
  asyncHandler(leadController.updateLead),
);

leadRoute.delete(
  "/:id",
  authMiddleware,
  authorize("admin", "sales"),
  validation(leadValidation.getLeadByIdSchema, "params"),
  asyncHandler(leadController.deleteLead),
);
module.exports = leadRoute;
