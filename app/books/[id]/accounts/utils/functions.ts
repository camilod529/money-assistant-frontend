import { Account } from "@/db/schema";

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
