import { createFileRoute } from "@tanstack/react-router";
import { sql } from "../../server/db";

export const Route = createFileRoute("/test-db")({
  async loader() {
    const result = await sql`SELECT NOW()`;
    return result.rows;
  },
});
