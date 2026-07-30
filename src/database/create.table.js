require("dotenv").config();

const authschema = require("../migrations/001_create_users");
const refreshTokenSchema = require("../migrations/002_create_refresh_tokens");
const leadsSchema = require("../migrations/003_create_leads");

async function run() {
  try {
    await authschema();
    await refreshTokenSchema();
    await leadsSchema();
    console.log("Database successfuly created");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

run();
