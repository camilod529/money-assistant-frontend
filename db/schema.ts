import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  currency: text("currency").notNull(),
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "income" or "expense"
});

export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey(),
  accountId: text("accountId")
    .notNull()
    .references(() => accounts.id),
  amount: real("amount").notNull(),
  date: integer("date").notNull(),
  categoryId: text("categoryId")
    .notNull()
    .references(() => categories.id),
  description: text("description"),
});
