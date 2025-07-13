import { Account } from "@/db/schema";
import { Locales } from "@/lib";
import { defaultSearchParamsProps } from "@/lib/types/common.types";
import { AccountList } from "@/lib/ui/components/accounts/AccountList";
import { AlertDialog } from "@/lib/ui/components/AlertDialog";
import { useAccountsStore } from "@/store/accounts";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FAB, Text } from "react-native-paper";
import { AccountModal } from "../../../../lib/ui/components/accounts/AccountModal";
import { groupAccountsByType } from "../../../../lib/utils/accounts/functions";

export default function AccountsScreen() {
  const { id } = useLocalSearchParams<defaultSearchParamsProps>();
  const { accounts, loadAccounts, deleteAccount } = useAccountsStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  useEffect(() => {
    loadAccounts(id);
  }, [id, loadAccounts]);

  const groupedAccountSections = groupAccountsByType(accounts);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {groupedAccountSections.length > 0 ? (
        <AccountList
          groupedAccountSections={groupedAccountSections}
          editButtonPressHandler={(account) => () => {
            setEditingAccount(account);
            setModalVisible(true);
          }}
          deleteButtonPressHandler={(account) => () => {
            setAccountToDelete(account);
            setDeleteDialogVisible(true);
          }}
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
