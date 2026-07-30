const pool = require("../database/database");

async function leadsSchema() {
  await pool.query(`
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1
                FROM pg_type
                WHERE typname = 'lead_status'
            ) THEN
                CREATE TYPE lead_status  AS ENUM (
                    'new',
                    'contacted',
                    'qualified',
                    'proposal_sent',
                    'won',
                    'lost'
                );
            END IF;
        END $$;

        CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        job_title TEXT,
        email TEXT UNIQUE NOT NULL,
        phone_number VARCHAR(20),
        company_name TEXT,
        address TEXT,
        lead_source TEXT,
        status lead_status DEFAULT 'new',
        owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `);
}

module.exports = leadsSchema;
