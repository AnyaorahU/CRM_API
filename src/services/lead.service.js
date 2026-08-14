const leadRepository = require("../repositories/lead.repository");
const AppError = require("../errors/apperror");

async function createLead({ validatedData, user }) {
  const { id: ownerId } = user;
  const { full_name, email, ...rest } = validatedData;

  const exists = await leadRepository.findLeadByEmail(email);
  if (exists) {
    throw new AppError("Lead email already exixts", 400);
  }

  const result = await leadRepository.createLead({
    ownerId,
    email,
    full_name,
    ...rest,
  });

  return result;
}

async function getLeads({ limit, page, user, search, status, field, order }) {
  const { id: ownerId, role } = user;
  const { sortField, sortOrder } = sorting({ field, order });
  const offset = (page - 1) * limit;

  const leads = await leadRepository.leadDynamic({
    limit,
    offset,
    search,
    ownerId: role === "admin" ? null : ownerId,
    status,
    sortField,
    sortOrder,
  });

  if (leads.length === 0) {
    throw new AppError("No lead found", 404);
  }

  const total = await leadRepository.countLeads({
    search,
    ownerId: role === "admin" ? null : ownerId,
    status,
  });

  const totalPages = Math.ceil(total / limit);

  const pagination = {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };

  return { leads, pagination };
}

async function getLeadById({ id, user }) {
  const { id: userId, role } = user;

  const lead = await leadRepository.findLeadById(id);
  if (!lead) {
    throw new AppError("Lead Not Found", 404);
  }

  if (role === "admin" || role === "user") {
    return lead;
  }

  if (role === "sales" && lead.owner_id !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return lead;
}

async function updateLead({ id, user, validatedData }) {
  if (Object.keys(validatedData).length === 0) {
    throw new AppError("At least one field is required for update", 400);
  }

  const { id: userId, role } = user;

  const lead = await leadRepository.findLeadById(id);
  if (!lead) {
    throw new AppError("Lead Not Found", 404);
  }

  if (role !== "admin" && lead.owner_id !== userId) {
    throw new AppError("Forbidden", 403);
  }

  if (validatedData.email) {
    const email = await leadRepository.findLeadByEmail(validatedData.email);

    if (email && email.id !== id) {
      throw new AppError("Email already exists", 409);
    }
  }

  const update = await leadRepository.updateLead({ id, validatedData });

  return update;
}

async function deleteLead({ id, user }) {
  const { role, id: userId } = user;

  const lead = await leadRepository.findLeadById(id);
  if (!lead) {
    throw new AppError("Lead not found", 400);
  }

  if (role !== "admin" && lead.owner_id !== userId) {
    throw new AppError("Forbidden", 403);
  }

  const result = await leadRepository.deleteLead(id);

  return result;
}

function sorting({ field, order }) {
  const allowedField = ["created_at", "full_name", "status", "company_name"];
  const allowedOrder = ["ASC", "DESC"];

  const sortField = allowedField.includes(field) ? field : "created_at";
  const sortOrder = allowedOrder.includes(order?.toUpperCase())
    ? order.toUpperCase()
    : "DESC";

  return {
    sortField,
    sortOrder,
  };
}

module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead };
