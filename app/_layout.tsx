import { Locales, Setting, Themes } from "@/lib";
import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono";
import { NotoSans_400Regular } from "@expo-google-fonts/noto-sans";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Localization from "expo-localization";
import { SplashScreen, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import React, { useEffect, useMemo, useState } from "react";
import { Platform, useColorScheme } from "react-native";
import { adaptNavigationTheme, PaperProvider } from "react-native-paper";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = { initialRouteName: "(tabs)" };

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    JetBrainsMono_400Regular,
    ...MaterialCommunityIcons.font,
  });

  useEffect(() => {
    if (error) throw error;
    if (loaded) SplashScreen.hideAsync();
  }, [error, loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();
  const [settings, setSettings] = useState<Setting>({
    theme: "auto",
    color: "default",
    language: "auto",
  });

  useEffect(() => {
    const initializeSettings = async () => {
      if (Platform.OS !== "web") {
        const result = await SecureStore.getItemAsync("settings");
        if (result === null) {
          await SecureStore.setItemAsync("settings", JSON.stringify(settings));
        }
        const finalSettings = JSON.parse(result ?? JSON.stringify(settings));
        setSettings(finalSettings);

        Locales.locale =
          finalSettings.language === "auto"
            ? Localization.getLocales()[0].languageCode ?? "en"
            : finalSettings.language;
      } else {
        const webSettings = { ...settings, theme: colorScheme ?? "light" };
        setSettings(webSettings);
        Locales.locale = Localization.getLocales()[0].languageCode ?? "en";
      }
    };

    initializeSettings();
  }, [colorScheme, settings]);

  const theme = useMemo(() => {
    return Themes[
      settings.theme === "auto" ? colorScheme ?? "dark" : settings.theme
    ][settings.color];
  }, [settings, colorScheme]);

  const { DarkTheme, LightTheme } = useMemo(
    () =>
      adaptNavigationTheme({
        reactNavigationDark: NavDarkTheme,
        reactNavigationLight: NavLightTheme,
        materialDark: Themes.dark[settings.color],
        materialLight: Themes.light[settings.color],
      }),
    [settings.color]
  );

  SystemUI.setBackgroundColorAsync(theme.colors.background);

  return (
    <ThemeProvider
      value={
        colorScheme === "light"
          ? { ...LightTheme, fonts: NavLightTheme.fonts }
          : { ...DarkTheme, fonts: NavDarkTheme.fonts }
      }
    >
      <PaperProvider theme={theme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
};
