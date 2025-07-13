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
import React, { useEffect, useState } from "react";
import { Platform, useColorScheme } from "react-native";
import { adaptNavigationTheme, PaperProvider } from "react-native-paper";

import { Locales, Setting, Themes } from "@/lib";

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
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();
  console.log({ colorScheme });
  const [settings, setSettings] = useState<Setting>({
    theme: "auto",
    color: "default",
    language: "auto",
  });

  useEffect(() => {
    if (Platform.OS !== "web") {
      SecureStore.getItemAsync("settings").then((result) => {
        if (result === null) {
          SecureStore.setItemAsync("settings", JSON.stringify(settings)).then(
            (res) => console.log(res)
          );
        }

        setSettings(JSON.parse(result ?? JSON.stringify(settings)));
      });
    } else {
      setSettings({ ...settings, theme: colorScheme ?? "light" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (settings.language === "auto") {
      Locales.locale = Localization.getLocales()[0].languageCode ?? "en";
    } else {
      Locales.locale = settings.language;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme =
    Themes[settings.theme === "auto" ? colorScheme ?? "dark" : settings.theme][
      settings.color
    ];

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: NavDarkTheme,
    reactNavigationLight: NavLightTheme,
    materialDark: Themes.dark[settings.color],
    materialLight: Themes.light[settings.color],
  });

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
        {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="drawer" options={{ headerShown: false }} />
          <Stack.Screen
            name="search"
            options={{ title: Locales.t("search") }}
          />
          <Stack.Screen
            name="modal"
            options={{ title: Locales.t("titleModal"), presentation: "modal" }}
          />
        </Stack> */}
      </PaperProvider>
    </ThemeProvider>
  );
};
