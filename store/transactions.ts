import { account, transaction, Transaction } from "@/db/schema";
import { db } from "@/lib/db/db";
import { v4 as uuidv4 } from "@lukeed/uuid";
import { eq, inArray } from "drizzle-orm";
import { create } from "zustand";

export interface TransactionState {
  transactions: Transaction[];
  loadTransactionsByBook: (bookId: string) => Promise<void>;
  addTransaction: (
    transaction: Omit<Transaction, "id" | "createdAt">
  ) => Promise<void>;
  getTransactionById: (id: string) => Transaction | undefined;
  updateTransaction: (
    id: string,
    updates: Partial<Omit<Transaction, "id" | "createdAt">>
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useTransactionsStore = create<TransactionState>((set, get) => ({
  transactions: [],
  loadTransactionsByBook: async (bookId) => {
    const accountsInBook = await db
      .select()
      .from(account)
      .where(eq(account.bookId, bookId));

    const accountIds = accountsInBook.map((acc) => acc.id);

    if (accountIds.length === 0) {
      set({ transactions: [] });
      return;
    }

    const rows = await db
      .select()
      .from(transaction)
      .where(inArray(transaction.accountId, accountIds));

    set({ transactions: rows });
  },
  addTransaction: async (transactionPayload) => {
    const newTransaction = {
      ...transactionPayload,
      id: uuidv4(),
      createdAt: new Date(),
    };
    await db.insert(transaction).values(newTransaction);
    set((state) => ({ transactions: [...state.transactions, newTransaction] }));
  },
  getTransactionById: (id) => {
    return get().transactions.find((t) => t.id === id);
  },
  updateTransaction: async (id, updates) => {
    await db.update(transaction).set(updates).where(eq(transaction.id, id));
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  },
  deleteTransaction: async (id) => {
    await db.delete(transaction).where(eq(transaction.id, id));
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },
}));
