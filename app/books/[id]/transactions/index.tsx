import { defaultSearchParamsProps } from "@/lib/types/common.types";
import { TransactionModal } from "@/lib/ui/components/transactions/TransactionModal";
import { useTransactionsStore } from "@/store/transactions";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { FAB, useTheme } from "react-native-paper";

export default function TransactionsScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<defaultSearchParamsProps>();
  const { transactions, loadTransactionsByBook } = useTransactionsStore();

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  console.log(selectedDate);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      loadTransactionsByBook(id);
    }
  }, [id, loadTransactionsByBook]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: theme.colors.background,
          calendarBackground: theme.colors.background,
          textSectionTitleColor: theme.colors.onBackground,
          selectedDayBackgroundColor: theme.colors.primary,
          selectedDayTextColor: theme.colors.onPrimary,
          todayTextColor: theme.colors.primary,
          dayTextColor: theme.colors.onBackground,
          textDisabledColor: theme.colors.onBackground + "50",
          arrowColor: theme.colors.primary,
          monthTextColor: theme.colors.onBackground,
          indicatorColor: theme.colors.primary,
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: theme.colors.primary,
          },
        }}
        onDayPress={(day: DateData) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          setSelectedDate(new Date().toISOString().split("T")[0]);
          setModalVisible(true);
        }}
      />
      <TransactionModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        selectedDate={selectedDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  calendar: {
    width: "100%",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
