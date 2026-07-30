const pool = require("../database/database");

async function updateProfileName({ name, userId }) {
  const result = await pool.query(
    `UPDATE users SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, name, email, role`,
    [name, userId],
  );

  return result.rows[0];
}

module.exports = { updateProfileName };
