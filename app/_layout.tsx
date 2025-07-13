import { ThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View } from "react-native";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ThemeProvider>
      <PaperProviderWrapper />
    </ThemeProvider>
  );
}

function PaperProviderWrapper() {
  const { theme } = useAppTheme();
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Money Assistant" }} />
      </Stack>
    </PaperProvider>
  );
}
