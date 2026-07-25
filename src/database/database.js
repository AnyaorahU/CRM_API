const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

pool
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database Error:", err));

module.exports = pool;
