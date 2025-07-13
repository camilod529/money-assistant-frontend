import { Transaction } from "@/db/schema";
import { Locales } from "@/lib/locales";
import { useAccountsStore } from "@/store/accounts";
import { useTransactionsStore } from "@/store/transactions";
import React, { FC, useMemo } from "react";
import { FlatList } from "react-native";
import {
  FAB,
  List,
  Modal,
  Portal,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  selectedDate: string;
  bookId: string;
  onSelectTransaction?: (transaction: Transaction) => void;
  onCreate?: () => void;
}

export const TransactionsByDateModal: FC<Props> = ({
  visible,
  onDismiss,
  selectedDate,
  bookId,
  onSelectTransaction,
  onCreate,
}) => {
  const theme = useTheme();
  const allTransactions = useTransactionsStore((state) => state.transactions);

  const accounts = useAccountsStore((state) => state.accounts);
  const [year, month, day] = selectedDate.split("-").map(Number);
  const dateForDisplay = new Date(year, month - 1, day);

  const transactions = useMemo(() => {
    const [year, month, day] = selectedDate.split("-").map(Number);

    const accountIdsForBook = accounts
      .filter((a) => a.bookId === bookId)
      .map((a) => a.id);

    const startOfDayUTC = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const endOfDayUTC = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));

    return allTransactions
      .filter((t) => accountIdsForBook.includes(t.accountId))
      .filter(
        (t) =>
          new Date(t.transactionAt) >= startOfDayUTC &&
          new Date(t.transactionAt) <= endOfDayUTC
      );
  }, [allTransactions, accounts, bookId, selectedDate]);

  console.log("Transactions for date:", { selectedDate, transactions });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{ padding: 0 }}
      >
        <Surface
          style={{
            marginHorizontal: 20,
            marginVertical: 40,
            padding: 24,
            borderRadius: theme.roundness * 2,
            backgroundColor: theme.colors.background,
            maxHeight: "80%",
          }}
        >
          <Text
            variant="titleMedium"
            style={{
              marginBottom: 16,
              color: theme.colors.onBackground,
            }}
          >
            {Locales.t("transactions.transactionsFor", {
              date: dateForDisplay.toLocaleDateString(),
            })}
          </Text>

          {transactions.length === 0 ? (
            <Text
              style={{
                color: theme.colors.onBackground,
                marginBottom: 24,
              }}
            >
              {Locales.t("transactions.noTransactions")}
            </Text>
          ) : (
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const account = accounts.find((a) => a.id === item.accountId);
                const currency = account?.currencyCode ?? "";
                return (
                  <List.Item
                    title={
                      item.description ||
                      Locales.t("transactions.noDescription")
                    }
                    description={`${currency} ${item.amount} • ${new Date(
                      item.transactionAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                    onPress={() => onSelectTransaction?.(item)}
                    left={(props) => (
                      <List.Icon {...props} icon="chevron-right" />
                    )}
                  />
                );
              }}
              style={{ marginBottom: 64 }}
            />
          )}

          <FAB
            icon="plus"
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
            onPress={onCreate}
          />
        </Surface>
      </Modal>
    </Portal>
  );
};
