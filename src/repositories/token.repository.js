const pool = require("../database/database");

const saveRefreshToken = async (
  { userId, refreshToken, device, expiresAt },
  executor = pool,
) => {
  const result = await executor.query(
    `INSERT INTO refresh_tokens (user_id, token, device, expires_at) VALUES ($1, $2, $3, $4) `,
    [userId, refreshToken, device, expiresAt],
  );
};

const findRefreshToken = async (refreshToken, executor = pool) => {
  const result = await executor.query(
    `SELECT * FROM refresh_tokens WHERE token = $1
    `,
    [refreshToken],
  );

  return result.rows[0];
};

const deleteRefreshToken = async (id, executor = pool) => {
  const result = await executor.query(
    `DELETE FROM refresh_tokens WHERE id = $1`,
    [id],
  );
};

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
};
