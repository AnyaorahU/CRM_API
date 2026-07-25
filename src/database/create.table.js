require("dotenv").config();

const authschema = require("../migrations/001_create_users");
const refreshTokenSchema = require("../migrations/002_create_refresh_tokens");

async function run() {
  try {
    await authschema();
    await refreshTokenSchema();
    console.log("Database successfuly created");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

run();
