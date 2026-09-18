import { createClient } from "@vercel/postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

export const client = createClient({ connectionString });

export const sql = client.sql;
