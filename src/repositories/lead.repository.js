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

// async function getAllLeads({ limit, offset }) {
//   const result = await pool.query(
//     `SELECT  id,
//         full_name,
//         company_name,
//         status,
//         lead_source,
//         owner_id,
//         created_at
//     FROM leads
//     ORDER BY created_at DESC
//     LIMIT $1
//     OFFSET $2;`,
//     [limit, offset],
//   );

//   return result.rows;
//}

// async function getLeadsByOwner({ limit, offset, ownerId }) {
//   const result = await pool.query(
//     `SELECT  id,
//         full_name,
//         company_name,
//         status,
//         lead_source,
//         owner_id,
//         created_at
//     FROM leads
//     WHERE owner_id = $1
//     ORDER BY created_at DESC
//     LIMIT $2
//     OFFSET $3;`,
//     [ownerId, limit, offset],
//   );

//   return result.rows;
// }

async function leadDynamic({ search, status, ownerId, limit, offset }) {
  let query = `SELECT  id,
    full_name,
    email,
    company_name,
    status,
    lead_source,
    owner_id,
    created_at FROM leads`;

  const conditions = [];
  const values = [];

  //search
  if (search) {
    const index = values.length + 1;

    conditions.push(
      `(full_name ILIKE $${index} OR company_name ILIKE $${index} OR email ILIKE $${index})`,
    );
    values.push(`%${search}%`);
  }
  //status
  if (status) {
    const index = values.length + 1;

    conditions.push(`status = $${index}`);
    values.push(status);
  }
  //owner id
  if (ownerId) {
    const index = values.length + 1;

    conditions.push(`owner_id = $${index}`);
    values.push(ownerId);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  values.push(limit);
  const limitIndex = values.length;
  values.push(offset);
  const offsetIndex = values.length;
  query += `
  ORDER BY created_at DESC 
  LIMIT $${limitIndex} 
  OFFSET $${offsetIndex}
  `;

  const result = await pool.query(query, values);

  return result.rows;
}

async function countLeads({ search, status, ownerId }) {
  let query = `SELECT COUNT(*) AS total FROM leads`;

  const conditions = [];
  const values = [];

  if (search) {
    const index = values.length + 1;
    conditions.push(
      `(full_name ILIKE $${index} OR email ILIKE $${index} OR company_name ILIKE $${index})`,
    );
    values.push(`%${search}%`);
  }

  if (status) {
    const index = values.length + 1;
    conditions.push(`status = $${index}`);
    values.push(status);
  }

  if (ownerId) {
    const index = values.length + 1;
    conditions.push(`owner_id = $${index}`);
    values.push(ownerId);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  const result = await pool.query(query, values);

  return Number(result.rows[0].total);
}

async function findLeadById(id) {
  const result = await pool.query(
    `
    SELECT id,
        full_name,
        job_title,
        email,
        phone_number,
        company_name,
        address,
        lead_source,
        status,
        owner_id,
        notes,
        created_at,
        updated_at 
      FROM leads WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
}

async function updateLead({ id, validatedData }) {
  let query = `UPDATE leads`;

  const updates = [];
  const values = [];

  for (const [key, value] of Object.entries(validatedData)) {
    const index = values.length + 1;

    updates.push(`${key} = $${index}`);
    values.push(value);
  }
  query += `
    SET ${updates.join(", ")}
    `;

  values.push(id);
  const idIndex = values.length;
  query += `
    WHERE id = $${idIndex}
    RETURNING *
    `;

  const result = await pool.query(query, values);

  return result.rows[0];
}

async function deleteLead(id) {
  const result = await pool.query(
    `DELETE FROM leads WHERE id = $1 RETURNING *`,
    [id],
  );

  return result.rows[0];
}

module.exports = {
  findLeadByEmail,
  createLead,
  leadDynamic,
  countLeads,
  findLeadById,
  updateLead,
  deleteLead,
};
