import { InferSelectModel, relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const book = sqliteTable("book", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

export const currency = sqliteTable("currency", {
  code: text("code").primaryKey(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  exchangeRate: real("exchangeRate").notNull(),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  bookId: text("bookId")
    .notNull()
    .references(() => book.id),
  name: text("name").notNull(),
  type: text("type").notNull(),
  currencyCode: text("currencyCode")
    .notNull()
    .references(() => currency.code),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  balance: real("balance").notNull().default(0),
});

export const category = sqliteTable("category", {
  id: text("id").primaryKey(),
  bookId: text("bookId")
    .notNull()
    .references(() => book.id),
  name: text("name").notNull(),
  type: text("type", {
    enum: ["INCOME", "EXPENSE", "ADJUSTMENT", "TRANSFER"],
  }).notNull(),
});

export const transaction = sqliteTable("transaction", {
  id: text("id").primaryKey(),
  accountId: text("accountId")
    .notNull()
    .references(() => account.id),
  categoryId: text("categoryId")
    .notNull()
    .references(() => category.id),
  amount: real("amount").notNull(),
  transactionAt: integer("transactionAt", { mode: "timestamp" }).notNull(),
  description: text("description"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

export const budget = sqliteTable("budget", {
  id: text("id").primaryKey(),
  bookId: text("bookId")
    .notNull()
    .references(() => book.id),
  categoryId: text("categoryId")
    .notNull()
    .references(() => category.id),
  amount: real("amount").notNull(),
  period: text("period").notNull(),
  startDate: integer("startDate", { mode: "timestamp" }).notNull(),
  endDate: integer("endDate", { mode: "timestamp" }),
});

export const exchangeRate = sqliteTable("exchangeRate", {
  id: text("id").primaryKey(),
  currencyCode: text("currencyCode")
    .notNull()
    .references(() => currency.code),
  rateToBase: real("rateToBase").notNull(),
  validFrom: integer("validFrom", { mode: "timestamp" }).notNull(),
  validTo: integer("validTo", { mode: "timestamp" }),
  source: text("source").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
});

export const bookRelations = relations(book, ({ many }) => ({
  accounts: many(account),
  categories: many(category),
  budgets: many(budget),
}));

export const accountRelations = relations(account, ({ one, many }) => ({
  book: one(book, { fields: [account.bookId], references: [book.id] }),
  currency: one(currency, {
    fields: [account.currencyCode],
    references: [currency.code],
  }),
  transactions: many(transaction),
}));

export const categoryRelations = relations(category, ({ one, many }) => ({
  book: one(book, { fields: [category.bookId], references: [book.id] }),
  transactions: many(transaction),
  budgets: many(budget),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
  account: one(account, {
    fields: [transaction.accountId],
    references: [account.id],
  }),
  category: one(category, {
    fields: [transaction.categoryId],
    references: [category.id],
  }),
}));

export const budgetRelations = relations(budget, ({ one }) => ({
  book: one(book, { fields: [budget.bookId], references: [book.id] }),
  category: one(category, {
    fields: [budget.categoryId],
    references: [category.id],
  }),
}));

export const exchangeRateRelations = relations(exchangeRate, ({ one }) => ({
  currency: one(currency, {
    fields: [exchangeRate.currencyCode],
    references: [currency.code],
  }),
}));

// TYPES
export type Book = InferSelectModel<typeof book>;
export type Account = InferSelectModel<typeof account>;
