export const types = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
  ADJUSTMENT: "ADJUSTMENT",
  TRANSFER: "TRANSFER",
} as const;
export type TransactionType = (typeof types)[keyof typeof types];
export const typeValues = Object.values(types);
export const transactionTypesList = [
  typeValues[0],
  ...typeValues.slice(1),
] as const;

export const accountTypes = {
  CASH: "CASH",
  BANK: "BANK",
  CREDIT_CARD: "CREDIT_CARD",
  INVESTMENT: "INVESTMENT",
  OTHER: "OTHER",
} as const;
export type AccountType = (typeof accountTypes)[keyof typeof accountTypes];
export const accountTypeValues = Object.values(accountTypes);
export const accountTypesList = [
  accountTypeValues[0],
  ...accountTypeValues.slice(1),
] as const;

export const currencyCodes = ["USD", "COP", "EUR", "MXN"] as const;
export type CurrencyCode = (typeof currencyCodes)[number];
export const currencyNames: Record<CurrencyCode, string> = {
  USD: "US Dollar",
  COP: "Colombian Peso",
  EUR: "Euro",
  MXN: "Mexican Peso",
};
