import {
  AccountType,
  accountTypes,
  accountTypeValues,
} from "@/db/utils/constants";
import { Locales } from "@/lib";
import * as Yup from "yup";

export interface AccountFormValues {
  name: string;
  type: AccountType;
  balance: number;
}

export const initialAccountValues: AccountFormValues = {
  name: "",
  type: accountTypes.CASH,
  balance: 0,
};

export const accountValidationSchema = Yup.object({
  name: Yup.string().required(Locales.t("errors.required")),
  type: Yup.mixed<AccountType>()
    .oneOf(accountTypeValues)
    .required(Locales.t("errors.required")),
  balance: Yup.number()
    .min(0, Locales.t("errors.positive"))
    .required(Locales.t("errors.required")),
});
