const pool = require("../database/database");

async function findByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

async function createUser(user) {
  const { name, email, password } = user;
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, password],
  );

  return result.rows[0];
}

async function updateUserVerification(email) {
  const result = await pool.query(
    `UPDATE users SET is_verified = true WHERE email = $1`,
    [email],
  );
}

module.exports = { createUser, findByEmail, findById, updateUserVerification };
