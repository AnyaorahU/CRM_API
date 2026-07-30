const leadRepository = require("../repositories/lead.repository");

async function createLead({ validatedData, user }) {
  const { id: ownerId } = user;
  const { full_name, email, ...rest } = validatedData;

  const exists = await leadRepository.findLeadByEmail(email);
  if (exists) {
    throw new Error("Lead email already exixts");
  }

  const result = await leadRepository.createLead({
    ownerId,
    email,
    full_name,
    ...rest,
  });

  return result;
}

async function getLeads({ limit, page }) {
  const offset = (page - 1) * limit;
  const result = await leadRepository.getLeads({ limit, offset });
  if (result.length === 0) {
    throw new Error("No lead found");
  }

  return result;
}

module.exports = { createLead, getLeads };
