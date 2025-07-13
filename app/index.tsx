// app/index.tsx
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useAppTheme } from "../contexts/ThemeContext";

export default function HomeScreen() {
  const theme = useTheme();
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <View>
      <Text>Text example</Text>
    </View>
  );
}
