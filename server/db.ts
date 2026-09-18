import { createClient } from "@vercel/postgres";

export const client = createClient({
  connectionString: process.env.DATABASE_URL,
});

export const sql = client.sql;
