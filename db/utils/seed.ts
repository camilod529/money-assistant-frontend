import { category, currency } from "@/db/schema";
import { db } from "@/lib/db/db";
import { v4 as uuidv4 } from "@lukeed/uuid";
import { currencyCodes, currencyNames, types } from "./constants";

export async function seedCurrencies() {
  const existing = await db.select().from(currency).limit(1);
  if (existing.length === 0) {
    await db.transaction(async () => {
      for (const code of currencyCodes) {
        await db.insert(currency).values({
          code,
          name: currencyNames[code],
          symbol: code === "USD" ? "$" : code,
          exchangeRate: 1,
        });
      }
    });
    console.log("Seeded currencies");
  }
}

export async function seedCategories(bookId: string) {
  const categorySeed = [
    {
      name: "Groceries",
      type: types.EXPENSE,
    },
    {
      name: "Utilities",
      type: types.EXPENSE,
    },
    {
      name: "Rent",
      type: types.EXPENSE,
    },
    {
      name: "Salary",
      type: types.INCOME,
    },
    {
      name: "Freelance",
      type: types.INCOME,
    },
  ];

  const existing = await db.select().from(category).limit(1);
  if (existing.length === 0) {
    await db.transaction(async () => {
      for (const { name, type } of categorySeed) {
        await db.insert(category).values({
          id: uuidv4(),
          bookId: bookId,
          name,
          type,
        });
      }
    });
    console.log("Seeded categories");
  }
}
