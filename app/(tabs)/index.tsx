// app/index.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Title title="Welcome!" />
        <Card.Content>
          <Text>This screen is powered by React Native Paper.</Text>
        </Card.Content>
        <Card.Actions>
          <Button icon="camera" mode="contained" onPress={() => {}}>
            Press me
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
