import { Currency, currency } from "@/db/schema";
import { db } from "@/lib/db/db";
import { create } from "zustand";

export interface CurrenciesState {
  currencies: Currency[];
  loadCurrencies: () => Promise<void>;
}

export const useCurrenciesStore = create<CurrenciesState>((set) => ({
  currencies: [],
  loadCurrencies: async () => {
    const rows = await db.select().from(currency);
    console.log("Loaded currencies:", rows);
    set({ currencies: rows });
  },
}));
