// app/index.tsx
import { Locales } from "@/lib";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";

export default function HomeScreen() {
  const sqliteDatabase = useSQLiteContext();
  useDrizzleStudio(sqliteDatabase);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={Locales.t("home.title")} />
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Title title={Locales.t("home.welcome")} />
        <Card.Content>
          <Text>{Locales.t("home.description")}</Text>
        </Card.Content>
        <Card.Actions>
          <Button icon="camera" mode="contained" onPress={() => {}}>
            {Locales.t("home.button")}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { margin: 16 },
});
