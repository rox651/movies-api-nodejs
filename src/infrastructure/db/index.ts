import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import dotenv from "dotenv";
import { Pool } from "pg";
import { PgTransaction } from "drizzle-orm/pg-core";
import * as schema from "./tables";

dotenv.config();

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);
const mockDb = drizzle.mock();

export type Database = typeof db | typeof mockDb;
export type DbOrTx =
	| NodePgDatabase<typeof schema>
	| PgTransaction<any, typeof schema>;

export default db;
