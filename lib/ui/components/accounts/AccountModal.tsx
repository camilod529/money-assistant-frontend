import { Account } from "@/db/schema";
import { accountTypeValues } from "@/db/utils/constants";
import { Locales } from "@/lib";
import { useAccountsStore } from "@/store/accounts";
import { useCurrenciesStore } from "@/store/currencies";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  HelperText,
  Menu,
  Modal,
  Portal,
  Surface,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  AccountFormValues,
  accountValidationSchema,
  initialAccountValues,
} from "../../../utils/accounts/form";

interface AccountModalProps {
  visible: boolean;
  onDismiss: () => void;
  id: string;
  accountToEdit: Account | null;
}

export function AccountModal({
  visible,
  onDismiss,
  id,
  accountToEdit,
}: AccountModalProps) {
  const { addAccount, updateAccount } = useAccountsStore();
  const { currencies } = useCurrenciesStore();

  const [typeMenuVisible, setTypeMenuVisible] = useState(false);
  const [currencyMenuVisible, setCurrencyMenuVisible] = useState(false);

  const openMenu = () => setTypeMenuVisible(true);
  const closeMenu = () => setTypeMenuVisible(false);
  const theme = useTheme();

  const handleDismiss = () => {
    form.resetForm();
    onDismiss();
    closeMenu();
  };

  const form = useFormik<AccountFormValues>({
    initialValues: accountToEdit ?? initialAccountValues,
    validationSchema: accountValidationSchema,
    onSubmit: (values) => {
      if (typeof id !== "string") return;

      if (accountToEdit) {
        updateAccount({
          ...values,
          id: accountToEdit.id,
          bookId: id,
        });
        handleDismiss();
        return;
      }
      addAccount({
        ...values,
        bookId: id,
        balance: 0,
      });

      handleDismiss();
    },
  });

  return (
    <Portal>
      <Modal visible={visible} onDismiss={handleDismiss}>
        <Surface
          style={{
            margin: 20,
            padding: 20,
            backgroundColor: theme.colors.background,
            borderRadius: theme.roundness,
            elevation: 4,
          }}
        >
          <TextInput
            label={Locales.t("accounts.name")}
            value={form.values.name}
            onChangeText={form.handleChange("name")}
            onBlur={form.handleBlur("name")}
            error={form.touched.name && !!form.errors.name}
            style={{ marginBottom: 8 }}
          />
          {!!form.errors.name && form.touched.name && (
            <HelperText type="error">{form.errors.name}</HelperText>
          )}
          <TextInput
            label={Locales.t("accounts.balance")}
            value={form.values.balance.toString()}
            onChangeText={form.handleChange("balance")}
            onBlur={form.handleBlur("balance")}
            error={form.touched.balance && !!form.errors.balance}
            keyboardType="numeric"
            style={{ marginBottom: 8 }}
          />
          {!!form.errors.balance && form.touched.balance && (
            <HelperText type="error">{form.errors.balance}</HelperText>
          )}
          <Menu
            visible={typeMenuVisible}
            onDismiss={closeMenu}
            anchor={
              <Button
                onPress={openMenu}
                mode="outlined"
                style={{ marginBottom: 8 }}
              >
                {Locales.t(`accounts.types.${form.values.type}`)}
              </Button>
            }
          >
            {accountTypeValues.map((option) => (
              <Menu.Item
                key={option}
                onPress={() => {
                  form.setFieldValue("type", option);
                  setTypeMenuVisible(false);
                }}
                title={Locales.t(`accounts.types.${option}`)}
              />
            ))}
          </Menu>
          {!!form.errors.type && form.touched.type && (
            <HelperText type="error">{form.errors.type}</HelperText>
          )}
          <Menu
            visible={currencyMenuVisible}
            onDismiss={() => setCurrencyMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setCurrencyMenuVisible(true)}
                style={{ marginBottom: 8 }}
              >
                {currencies.find((c) => c.code === form.values.currencyCode)
                  ?.symbol ?? form.values.currencyCode}
              </Button>
            }
          >
            {currencies.map((c) => (
              <Menu.Item
                key={c.code}
                onPress={() => {
                  form.setFieldValue("currencyCode", c.code);
                  setCurrencyMenuVisible(false);
                }}
                title={`${c.symbol} — ${c.code}`}
              />
            ))}
          </Menu>
          {form.touched.currencyCode && form.errors.currencyCode && (
            <HelperText type="error">
              {form.errors.currencyCode as string}
            </HelperText>
          )}
          <Button
            mode="contained"
            onPress={() => form.handleSubmit()}
            style={{ marginTop: 16 }}
          >
            {accountToEdit
              ? Locales.t("accounts.edit")
              : Locales.t("accounts.add")}
          </Button>
        </Surface>
      </Modal>
    </Portal>
  );
}
