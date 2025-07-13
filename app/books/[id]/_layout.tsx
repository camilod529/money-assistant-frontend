import { useBooksStore } from "@/store/books";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function BooksTabsLayout() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { getBookById } = useBooksStore();
  const book = getBookById(id as string);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: book ? book.name : "Books",
    });
  }, [navigation, book]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accounts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
