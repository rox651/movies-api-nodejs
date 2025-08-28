import { drizzle } from "drizzle-orm/node-postgres";

import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export type Database = typeof db;
export default db;
