import { Locales } from "@/lib";
import { useBooksStore } from "@/store/books";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

export default function BooksScreen() {
  const { addBook, books, loadBooks } = useBooksStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            style={{ margin: 8 }}
            // onPress={() => router.push(`/books/${item.id}`)}
          >
            <Card.Title title={item.name} />
            <Card.Content>
              <Text variant="bodySmall">{item.description}</Text>
            </Card.Content>
          </Card>
        )}
      />
      <TextInput
        label={Locales.t("books.name")}
        value={name}
        onChangeText={setName}
        style={{ marginVertical: 8 }}
      />
      <TextInput
        label={Locales.t("books.description")}
        value={description}
        onChangeText={setDescription}
        style={{ marginBottom: 16 }}
      />
      <Button
        mode="contained"
        onPress={() => {
          if (!name.trim()) return;
          addBook({ name, description });
          setName("");
          setDescription("");
        }}
      >
        {Locales.t("books.add")}
      </Button>
    </View>
  );
}
