import { Locales } from "@/lib/locales";
import * as Yup from "yup";

export interface TransactionFormValues {
  accountId: string;
  categoryId: string;
  amount: number;
  transactionAt: Date;
  description?: string;
}

export const initialTransactionValues: TransactionFormValues = {
  accountId: "",
  categoryId: "",
  amount: 0,
  description: "",
  transactionAt: new Date(),
};

export const transactionValidationSchema = Yup.object({
  accountId: Yup.string().required(
    Locales.t("transactions.errors.required", { field: "Account" })
  ),
  categoryId: Yup.string().required(
    Locales.t("transactions.errors.required", { field: "Category" })
  ),
  amount: Yup.number()
    .min(0.01, Locales.t("transactions.errors.positive"))
    .required(Locales.t("transactions.errors.required", { field: "Amount" })),
  transactionAt: Yup.date().required(
    Locales.t("transactions.errors.required", { field: "Transaction Date" })
  ),
});
