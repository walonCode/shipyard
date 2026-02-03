import { sql } from "drizzle-orm";
import { index, integer, pgPolicy, pgRole, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";


export const userRole = pgRole("user_role");
export const adminRole = pgRole("admin_role");

export const user = pgTable("user", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user"),
  address: text("address"),
  age: integer("age"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdateFn(() => new Date())
}, (table) => [
  { rls: true },
  
  pgPolicy("user_policy_role", {
    for: "all",
    to: userRole,
    withCheck:sql`true`
  }),
  
  pgPolicy("admin_policy_role", {
    for: "all",
    to: adminRole,
    withCheck:sql`true`
  }),
  
  pgPolicy("public_insert_policy", {
    for: "insert",
    to: "public",
    withCheck:sql`true`
  }),
  
  pgPolicy("public_get_policy", {
    for: "select",
    to: userRole,
    using:sql`true`
  }),
  
  index("user_table_id_idx").on(table.id),
  index("user_table_email_username_idx").on(table.email, table.username)
])