import { createRoute } from "@tanstack/start";
import { sql } from "../db";

export const Route = createRoute({
  path: "/test-db",
  async get() {
    const result = await sql`SELECT NOW()`;
    return Response.json(result.rows);
  },
});
