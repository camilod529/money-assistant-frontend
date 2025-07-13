import { Account } from "@/db/schema";
import { Locales } from "@/lib";
import { defaultSearchParamsProps } from "@/lib/types/common.types";
import { AlertDialog } from "@/lib/ui/components/AlertDialog";
import { useAccountsStore } from "@/store/accounts";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SectionList, View } from "react-native";
import { Card, FAB, IconButton, Text, useTheme } from "react-native-paper";
import { AccountModal } from "../../../../lib/ui/components/accounts/AccountModal";
import { groupAccountsByType } from "../../../../lib/utils/accounts/functions";

export default function AccountsScreen() {
  const { id } = useLocalSearchParams<defaultSearchParamsProps>();
  const { accounts, loadAccounts, deleteAccount } = useAccountsStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
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
            <Card style={{ marginVertical: 8 }}>
              <Card.Title
                title={item.name}
                subtitle={`Balance: ${item.balance}`}
              />
              <Card.Actions>
                <IconButton
                  icon="pencil"
                  onPress={() => {
                    setEditingAccount(item);
                    setModalVisible(true);
                  }}
                />
                <IconButton
                  icon="trash-can"
                  onPress={() => {
                    setAccountToDelete(item);
                    setDeleteDialogVisible(true);
                  }}
                />
              </Card.Actions>
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
        key={editingAccount ? editingAccount.id : "create"}
        visible={modalVisible}
        onDismiss={() => {
          setEditingAccount(null);
          setModalVisible(false);
        }}
        id={id}
        accountToEdit={editingAccount}
      />
      <AlertDialog
        visible={deleteDialogVisible}
        title={Locales.t("accounts.deleteDialog.title")}
        message={Locales.t("accounts.deleteDialog.message", {
          name: accountToDelete?.name,
        })}
        onCancel={() => {
          setAccountToDelete(null);
          setDeleteDialogVisible(false);
        }}
        onConfirm={() => {
          if (accountToDelete) deleteAccount(accountToDelete.id);
          setAccountToDelete(null);
          setDeleteDialogVisible(false);
        }}
        confirmText={Locales.t("accounts.deleteDialog.confirmText")}
        cancelText={Locales.t("accounts.deleteDialog.cancelText")}
      />
    </View>
  );
}
