import { pgEnum } from "drizzle-orm/pg-core";

export const stateEnum = pgEnum("state", ["active", "inactive"]);
