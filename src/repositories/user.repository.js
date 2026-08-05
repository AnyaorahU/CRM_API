const pool = require("../database/database");

async function updateProfileName({ name, userId }) {
  const result = await pool.query(
    `UPDATE users SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, name, email, role`,
    [name, userId],
  );

  return result.rows[0];
}

async function updateProfileRole({ id, role }) {
  const result = await pool.query(
    `UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, name, email, role`,
    [role, id],
  );

  return result.rows[0];
}

module.exports = { updateProfileName, updateProfileRole };
