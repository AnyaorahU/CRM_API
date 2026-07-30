const pool = require("../database/database");

async function findLeadByEmail(email) {
  const result = await pool.query(`SELECT * FROM leads WHERE email = $1`, [
    email,
  ]);

  return result.rows[0];
}

async function createLead(lead) {
  const {
    full_name,
    email,
    job_title,
    phone_number,
    lead_source,
    address,
    notes,
    company_name,
    ownerId,
  } = lead;
  const result = await pool.query(
    `INSERT INTO leads (full_name, email, job_title, phone_number, lead_source, address, notes, company_name, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [
      full_name,
      email,
      job_title,
      phone_number,
      lead_source,
      address,
      notes,
      company_name,
      ownerId,
    ],
  );

  return result.rows[0];
}

async function getLeads({ limit, offset }) {
  const result = await pool.query(
    `
        SELECT * FROM leads
        LIMIT $1
        OFFSET $2
        `,
    [limit, offset],
  );

  return result.rows;
}

module.exports = { findLeadByEmail, createLead, getLeads };
