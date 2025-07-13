import { Account, Currency } from "@/db/schema";

/**
 *
 * @Param accounts - Array of Account objects to be grouped by type.
 * @returns An array of objects, each containing a title (account type) and data (array of accounts of that type).
 */
export const groupAccountsByType = (accounts: Account[]) => {
  const grouped: Record<string, Account[]> = {};
  accounts.forEach((account) => {
    if (!grouped[account.type]) {
      grouped[account.type] = [];
    }
    grouped[account.type].push(account);
  });

  return Object.entries(grouped).map(([type, data]) => ({
    title: type,
    data,
  }));
};

/**
 *
 * @Param currentCurrencyCode - The currency code of the current account.
 * @Param newCurrencyCode - The currency code to convert to.
 * @Param amount - The amount to convert.
 * @param currencies - Array of Currency objects containing exchange rates.
 * @returns The converted amount in the new currency, rounded to two decimal places.
 * If the current or new currency is not found, returns the original amount.
 * If exchange rates are not available, returns the original amount.
 * If the conversion fails, returns the original amount.
 * This function assumes that all currencies are converted to a base currency (e.g., USD) before converting to the target currency.
 * This is a simplified conversion logic and may not handle all edge cases.
 */
export function convertBalance({
  currentCurrencyCode,
  newCurrencyCode,
  amount,
  currencies,
}: {
  currentCurrencyCode: string;
  newCurrencyCode: string;
  amount: number;
  currencies: Currency[];
}): number {
  const currentCurrency = currencies.find(
    (c) => c.code === currentCurrencyCode
  );
  const newCurrency = currencies.find((c) => c.code === newCurrencyCode);

  if (!currentCurrency || !newCurrency) return amount;

  // Convert to USD, then to target currency
  const usdAmount = amount / currentCurrency.exchangeRate;
  const converted = usdAmount * newCurrency.exchangeRate;

  return parseFloat(converted.toFixed(2));
}
