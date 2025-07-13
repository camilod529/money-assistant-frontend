import { Locales } from "@/lib";
import { GlobalDataWrapper } from "@/lib/context/GlobalDataWrapper/GlobalDataWrapper";
import { defaultSearchParamsProps } from "@/lib/types/common.types";
import { useBooksStore } from "@/store/books";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function BooksTabsLayout() {
  const { id } = useLocalSearchParams<defaultSearchParamsProps>();
  const navigation = useNavigation();
  const { getBookById } = useBooksStore();
  const book = getBookById(id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: book ? book.name : "Books",
    });
  }, [navigation, book]);

  return (
    <GlobalDataWrapper bookId={id}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="transactions/index"
          initialParams={{ id }}
          options={{
            title: Locales.t("transactions.title"),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="accounts/index"
          initialParams={{ id }}
          options={{
            title: Locales.t("accounts.title"),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="wallet-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </GlobalDataWrapper>
  );
}
