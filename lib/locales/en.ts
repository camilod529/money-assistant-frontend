/**
 * English Translations
 */

const English = {
  home: {
    title: "Home",
    welcome: "Welcome!",
    description: "This screen is powered by React Native Paper.",
    button: "Press me",
  },
  common: {
    save: "Save",
    cancel: "Cancel",
  },
  books: {
    add: "Add Book",
    create: "Create a new book",
    description: "Description",
    name: "Name",
    title: "Books",
  },
  accounts: {
    accountType: "Account Type",
    add: "Add Account",
    edit: "Edit Account",
    balance: "Balance",
    create: "Create a new account",
    currency: "Currency Code",
    name: "Account Name",
    title: "Accounts",
    type: "Type",
    empty: "No accounts found.",
    types: {
      CASH: "Cash",
      BANK: "Bank Account",
      CREDIT_CARD: "Credit Card",
      INVESTMENT: "Investment",
      OTHER: "Other",
    },
    deleteDialog: {
      title: "Delete Account",
      message: 'Are you sure you want to delete "%{name}"?',
      confirmText: "Delete",
      cancelText: "Cancel",
    },
  },
  transactions: {
    title: "Transactions",
    add: "Add Transaction",
    selectAccount: "Select Account",
    selectCategory: "Select Category",
    amount: "Amount",
    date: "Date",
    description: "Description",
    errors: {
      required: "%{field} is required",
      positive: "Amount must be positive",
    },
  },
  errors: {
    required: "This field is required",
    positive: "Value must be positive",
  },
};

export default English;
