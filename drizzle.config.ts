import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/infrastructure/db/tables/*",
	out: "./drizzle",
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
	},
});
