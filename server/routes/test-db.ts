import { sql } from "../db";

export async function GET() {
  const result = await sql`SELECT NOW()`;
  return Response.json(result.rows);
}
