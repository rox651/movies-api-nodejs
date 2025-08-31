import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import type { ExtractTablesWithRelations } from "drizzle-orm";
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
	| Database
	| PgTransaction<
			NodePgQueryResultHKT,
			Record<string, never>,
			ExtractTablesWithRelations<Record<string, never>>
	  >;

export default db;
