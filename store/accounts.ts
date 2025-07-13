import { account, Account } from "@/db/schema";
import { db } from "@/lib/db/db";
import { v4 as uuidv4 } from "@lukeed/uuid";
import { eq } from "drizzle-orm";
import { create } from "zustand";

export interface AccountState {
  accounts: Account[];
  loadAccounts: (bookId: string) => Promise<void>;
  addAccount: (account: Omit<Account, "id" | "createdAt">) => Promise<void>;
  updateAccount: (account: Account) => Promise<void>;
  deleteAccount: (accountId: string) => Promise<void>;
  getAccountById: (accountId: string) => Account | undefined;
}

export const useAccountsStore = create<AccountState>((set, get) => ({
  accounts: [],
  loadAccounts: async (bookId) => {
    const rows = await db
      .select()
      .from(account)
      .where(eq(account.bookId, bookId));
    console.log("Loaded accounts:", rows);
    set({ accounts: rows });
  },
  addAccount: async (accountPayload) => {
    console.log("Adding account:", accountPayload);
    try {
      await db.insert(account).values({
        id: uuidv4(),
        createdAt: new Date(),
        ...accountPayload,
      });
      const rows = await db.select().from(account);
      console.log("Added account, new list:", rows);
      set({ accounts: rows });
    } catch (error) {
      console.error("Error adding account:", error);
    }
  },
  updateAccount: async (accountPayload) => {
    console.log("Updating account:", accountPayload);
    try {
      await db
        .update(account)
        .set({
          name: accountPayload.name,
          type: accountPayload.type,
          currencyCode: accountPayload.currencyCode,
          balance: accountPayload.balance,
        })
        .where(eq(account.id, accountPayload.id));
      const rows = await db.select().from(account);
      console.log("Updated account, new list:", rows);
      set({ accounts: rows });
    } catch (error) {
      console.error("Error updating account:", error);
    }
  },
  deleteAccount: async (accountId) => {
    console.log("Deleting account:", accountId);
    try {
      await db.delete(account).where(eq(account.id, accountId));
      const rows = await db.select().from(account);
      console.log("Deleted account, new list:", rows);
      set({ accounts: rows });
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  },
  getAccountById: (accountId) => {
    const account = get().accounts.find((a) => a.id === accountId);
    return account;
  },
}));
