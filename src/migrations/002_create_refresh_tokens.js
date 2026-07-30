const pool = require("../database/database");

const refreshTokenSchema = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS refresh_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        device TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL,

        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )      
        `);
};

module.exports = refreshTokenSchema;
