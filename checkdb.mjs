import pg from 'pg'
const { Pool } = pg
const pool = new Pool({
  connectionString: 'postgresql://postgres.timwzfjbcztfwcgdlqlh:HuhsqFF6cIsfQoLo@aws-0-eu-central-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false },
})
const r = await pool.query(
  "SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name",
)
console.log('TABLES:', r.rows.map((x) => x.table_name).join(', '))
await pool.end()
