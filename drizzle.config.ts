import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/models/*.ts",
  dialect: "postgresql",
  verbose: true,
  strict: true,
	dbCredentials: {
		url: process.env.DATABASE_URL!,
  },
});
