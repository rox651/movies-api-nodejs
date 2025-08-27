import pgPromise from "pg-promise";

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL || "");

type DB = typeof db;

export type { DB };
export default db;
