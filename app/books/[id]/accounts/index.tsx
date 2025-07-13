import { Locales } from "@/lib";
import { useAccountsStore } from "@/store/accounts";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AccountsScreen() {
  const { id } = useLocalSearchParams();
  const { accounts, loadAccounts, addAccount } = useAccountsStore();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    if (typeof id === "string") {
      loadAccounts(id);
    }
  }, [id, loadAccounts]);

  return (
    <View style={{ padding: 16, marginTop: top + 5 }}>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 8 }}>
            <Card.Title
              title={item.name}
              subtitle={`${Locales.t("accounts.type")}: ${item.type}`}
            />
            <Card.Content>
              <Text variant="bodyLarge">
                {Locales.t("accounts.balance")}: {item.balance}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
      <TextInput
        label={Locales.t("accounts.name")}
        value={name}
        onChangeText={setName}
        style={{ marginVertical: 8 }}
      />
      <TextInput
        label={Locales.t("accounts.accountType")}
        value={type}
        onChangeText={setType}
        style={{ marginBottom: 16 }}
      />
      <Button
        mode="contained"
        onPress={() => {
          if (!name.trim() || !type.trim() || typeof id !== "string") return;
          addAccount({
            name,
            type,
            bookId: id,
            currencyCode: "USD",
            balance: 0,
          });
          setName("");
          setType("");
        }}
      >
        {Locales.t("accounts.add")}
      </Button>
    </View>
  );
}
