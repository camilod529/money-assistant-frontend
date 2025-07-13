import { Locales } from "@/lib/locales";
import {
  initialTransactionValues,
  transactionValidationSchema,
} from "@/lib/utils/transactions/form";
import { useAccountsStore } from "@/store/accounts";
import { useCategoriesStore } from "@/store/categories";
import { useTransactionsStore } from "@/store/transactions";
import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  HelperText,
  Menu,
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { DatePickerInput, TimePickerModal } from "react-native-paper-dates";

interface TransactionModalProps {
  visible: boolean;
  onDismiss: () => void;
  selectedDate: string;
}

export const TransactionModal: FC<TransactionModalProps> = ({
  visible,
  onDismiss,
  selectedDate,
}) => {
  const theme = useTheme();
  const { accounts } = useAccountsStore();
  const { categories } = useCategoriesStore();
  const { addTransaction } = useTransactionsStore();

  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [timeVisible, setTimeVisible] = useState(false);
  const now = new Date();
  const [year, month, day] = selectedDate.split("-").map(Number);
  const transactionDate = new Date(
    year,
    month - 1,
    day,
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );

  const form = useFormik({
    initialValues: {
      ...initialTransactionValues,
      transactionAt: transactionDate,
    },
    validationSchema: transactionValidationSchema,
    onSubmit: async (values) => {
      await addTransaction({
        ...values,
        description: values.description ?? "",
      });
      handleDismiss();
    },
  });

  const handleDismiss = () => {
    form.resetForm();
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleDismiss}
        contentContainerStyle={{ padding: 0 }}
      >
        <Surface
          style={{
            marginHorizontal: 20,
            padding: 24,
            backgroundColor: theme.colors.background,
            borderRadius: theme.roundness * 2,
            elevation: 4,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              variant="titleMedium"
              style={{
                marginBottom: 24, // Increased from 16
                color: theme.colors.onBackground,
              }}
            >
              {Locales.t("transactions.add")}
            </Text>

            {/* Account Selector */}
            <Menu
              visible={accountMenuVisible}
              onDismiss={() => setAccountMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setAccountMenuVisible(true)}
                  style={{ marginBottom: 8 }} // Increased from 4
                >
                  {accounts.find((a) => a.id === form.values.accountId)?.name ??
                    Locales.t("transactions.selectAccount")}
                </Button>
              }
            >
              {accounts.map((acc) => (
                <Menu.Item
                  key={acc.id}
                  onPress={() => {
                    form.setFieldValue("accountId", acc.id);
                    setAccountMenuVisible(false);
                  }}
                  title={acc.name}
                />
              ))}
            </Menu>
            {form.touched.accountId && form.errors.accountId && (
              <HelperText type="error" style={{ marginBottom: 8 }}>
                {form.errors.accountId}
              </HelperText>
            )}

            {/* Category Selector */}
            <View style={{ marginTop: 16 }}>
              <Menu
                visible={categoryMenuVisible}
                onDismiss={() => setCategoryMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setCategoryMenuVisible(true)}
                    style={{ marginBottom: 8 }} // Increased from 4
                  >
                    {categories.find((c) => c.id === form.values.categoryId)
                      ?.name ?? Locales.t("transactions.selectCategory")}
                  </Button>
                }
              >
                {categories.map((cat) => (
                  <Menu.Item
                    key={cat.id}
                    onPress={() => {
                      form.setFieldValue("categoryId", cat.id);
                      setCategoryMenuVisible(false);
                    }}
                    title={cat.name}
                  />
                ))}
              </Menu>
              {form.touched.categoryId && form.errors.categoryId && (
                <HelperText type="error" style={{ marginBottom: 8 }}>
                  {form.errors.categoryId}
                </HelperText>
              )}
            </View>

            {/* Amount */}
            <View style={{ marginTop: 16 }}>
              <TextInput
                label={Locales.t("transactions.amount")}
                keyboardType="numeric"
                value={form.values.amount?.toString()}
                onChangeText={(value) =>
                  form.setFieldValue("amount", parseFloat(value) || 0)
                }
                onBlur={form.handleBlur("amount")}
                error={form.touched.amount && !!form.errors.amount}
                style={{ marginBottom: 8 }} // Increased from 4
              />
              {!!form.errors.amount && form.touched.amount && (
                <HelperText type="error" style={{ marginBottom: 8 }}>
                  {form.errors.amount}
                </HelperText>
              )}
            </View>

            {/* Date & Time */}
            <View style={{ marginTop: 16 }}>
              <DatePickerInput
                locale="en"
                label={Locales.t("transactions.date")}
                value={form.values.transactionAt}
                onChange={(date) => form.setFieldValue("transactionAt", date)}
                inputMode="start"
                style={{ marginBottom: 16 }} // Added margin
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Button
                mode="outlined"
                onPress={() => setTimeVisible(true)}
                style={{ justifyContent: "center", height: 56 }}
              >
                {form.values.transactionAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Button>
            </View>

            <TimePickerModal
              visible={timeVisible}
              onDismiss={() => setTimeVisible(false)}
              onConfirm={({ hours, minutes }) => {
                const date = new Date(form.values.transactionAt);
                date.setHours(hours);
                date.setMinutes(minutes);
                form.setFieldValue("transactionAt", date);
                setTimeVisible(false);
              }}
              hours={form.values.transactionAt.getHours()}
              minutes={form.values.transactionAt.getMinutes()}
            />

            {/* Description */}
            <View style={{ marginTop: 16 }}>
              <TextInput
                label={Locales.t("transactions.description")}
                value={form.values.description}
                onChangeText={form.handleChange("description")}
                onBlur={form.handleBlur("description")}
                style={{ marginBottom: 24 }} // Increased from 16
              />
            </View>

            <Button
              mode="contained"
              onPress={() => form.handleSubmit()}
              style={{ paddingVertical: 8, marginTop: 8 }} // Added margin
            >
              {Locales.t("transactions.add")}
            </Button>
          </ScrollView>
        </Surface>
      </Modal>
    </Portal>
  );
};
