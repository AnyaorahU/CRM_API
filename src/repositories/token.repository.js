const pool = require("../database/database");

const saveRefreshToken = async ({ user_id, token, device, expires_at }) => {
  const result = await pool.query(
    `INSERT INTO refresh_tokens (user_id, token, device, expires_at) VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, token, device, expires_at],
  );

  return result.rows[0];
};
