import {
  AccountType,
  accountTypes,
  accountTypeValues,
} from "@/db/utils/constants";
import { Locales } from "@/lib";
import { useCurrenciesStore } from "@/store/currencies";
import * as Yup from "yup";

const { currencies } = useCurrenciesStore.getState();
const currencyCodes = currencies.map((c) => c.code);

export interface AccountFormValues {
  name: string;
  type: AccountType;
  balance: number;
  currencyCode: (typeof currencyCodes)[number];
}

export const initialAccountValues: AccountFormValues = {
  name: "",
  type: accountTypes.CASH,
  balance: 0,
  currencyCode: currencyCodes[0],
};

export const accountValidationSchema = Yup.object({
  name: Yup.string().required(Locales.t("errors.required")),
  type: Yup.mixed<AccountType>()
    .oneOf(accountTypeValues)
    .required(Locales.t("errors.required")),
  balance: Yup.number()
    .min(0, Locales.t("errors.positive"))
    .required(Locales.t("errors.required")),
  currencyCode: Yup.mixed<(typeof currencyCodes)[number]>()
    .oneOf(currencyCodes)
    .required(Locales.t("errors.required")),
});
