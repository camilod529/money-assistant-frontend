import { Locales } from "@/lib";
import { defaultSearchParamsProps } from "@/lib/types/common.types";
import { useAccountsStore } from "@/store/accounts";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SectionList, View } from "react-native";
import { Card, FAB, Text, useTheme } from "react-native-paper";
import { AccountModal } from "./components/AccountModal";
import { groupAccountsByType } from "./utils/functions";

export default function AccountsScreen() {
  const { id } = useLocalSearchParams<defaultSearchParamsProps>();
  const { accounts, loadAccounts } = useAccountsStore();
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    loadAccounts(id);
  }, [id, loadAccounts]);

  const groupedAccountSections = groupAccountsByType(accounts);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {groupedAccountSections.length > 0 ? (
        <SectionList
          sections={groupedAccountSections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <Card
              style={{
                marginVertical: 6,
                backgroundColor: theme.colors.elevation.level1,
              }}
              mode="elevated"
            >
              <Card.Title title={item.name} />
              <Card.Content>
                <Text variant="bodyMedium">
                  {`${Locales.t("accounts.balance")}: ${item.balance}`}
                </Text>
              </Card.Content>
            </Card>
          )}
          renderSectionHeader={({ section }) => (
            <Text
              variant="titleMedium"
              style={{
                marginTop: 16,
                marginBottom: 8,
                color: theme.colors.onBackground,
              }}
            >
              {section.title}
            </Text>
          )}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 32 }}>
          {Locales.t("accounts.empty")}
        </Text>
      )}

      <FAB
        icon="plus"
        onPress={() => setModalVisible(true)}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      />
      <AccountModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        id={id}
      />
    </View>
  );
}
