import { seedCurrencies } from "@/db/utils/seed";
import { runMigrations } from "@/lib/db/db";
import { useAccountsStore } from "@/store/accounts";
import { useCategoriesStore } from "@/store/categories";
import { useCurrenciesStore } from "@/store/currencies";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

interface GlobalDataWrapperProps extends PropsWithChildren {
  bookId: string;
}

export const GlobalDataWrapper: FC<GlobalDataWrapperProps> = ({
  children,
  bookId,
}) => {
  const { loadCurrencies } = useCurrenciesStore();
  const { loadAccounts } = useAccountsStore();
  const { loadCategories } = useCategoriesStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      await runMigrations();
      await seedCurrencies();
      await Promise.all([
        loadCurrencies(),
        loadAccounts(bookId),
        loadCategories(bookId),
      ]);
      setIsReady(true);
    })();
  }, [loadCurrencies, loadAccounts, loadCategories, bookId]);

  if (!isReady) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return <>{children}</>;
};
