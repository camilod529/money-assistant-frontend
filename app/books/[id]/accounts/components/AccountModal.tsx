import { accountTypeValues } from "@/db/utils/constants";
import { Locales } from "@/lib";
import { useAccountsStore } from "@/store/accounts";
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
} from "../utils/form";

interface AccountModalProps {
  visible: boolean;
  onDismiss: () => void;
  id: string;
}

export function AccountModal({ visible, onDismiss, id }: AccountModalProps) {
  const { addAccount } = useAccountsStore();
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const theme = useTheme();

  const form = useFormik<AccountFormValues>({
    initialValues: initialAccountValues,
    validationSchema: accountValidationSchema,
    onSubmit: (values) => {
      if (typeof id !== "string") return;
      addAccount({
        ...values,
        bookId: id,
        currencyCode: "USD",
        balance: 0,
      });
      form.resetForm();
      onDismiss();
      closeMenu();
    },
  });
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
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
            visible={menuVisible}
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
                  setMenuVisible(false);
                }}
                title={Locales.t(`accounts.types.${option}`)}
              />
            ))}
          </Menu>
          {!!form.errors.type && form.touched.type && (
            <HelperText type="error">{form.errors.type}</HelperText>
          )}
          <Button
            mode="contained"
            onPress={() => form.handleSubmit()}
            style={{ marginTop: 16 }}
          >
            {Locales.t("accounts.add")}
          </Button>
        </Surface>
      </Modal>
    </Portal>
  );
}
