import { currency } from "@/db/schema";
import { db } from "@/lib/db/db";
import { currencyCodes, currencyNames } from "./constants";

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
