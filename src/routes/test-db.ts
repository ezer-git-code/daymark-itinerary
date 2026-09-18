import { createFileRoute } from "@tanstack/start";
import { sql } from "../../server/db";

export const Route = createFileRoute("/test-db")({
  async loader() {
    const result = await sql`SELECT NOW()`;
    return result.rows;
  },
});

// This file is a test route to verify that the database connection is working correctly. It executes a simple SQL query to get the current timestamp from the database and returns the result as JSON.
