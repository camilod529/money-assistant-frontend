// constants/PaperTheme.ts
import {
  MD3DarkTheme as DefaultDarkTheme,
  MD3LightTheme as DefaultLightTheme,
  type MD3Theme,
} from "react-native-paper";
import type { MD3Typescale } from "react-native-paper/lib/typescript/types";

const spaceMono = "SpaceMono-Regular";

const fonts: MD3Typescale = {
  ...DefaultLightTheme.fonts,
  displayLarge: {
    ...DefaultLightTheme.fonts.displayLarge,
    fontFamily: spaceMono,
  },
  displayMedium: {
    ...DefaultLightTheme.fonts.displayMedium,
    fontFamily: spaceMono,
  },
  displaySmall: {
    ...DefaultLightTheme.fonts.displaySmall,
    fontFamily: spaceMono,
  },
  headlineLarge: {
    ...DefaultLightTheme.fonts.headlineLarge,
    fontFamily: spaceMono,
  },
  headlineMedium: {
    ...DefaultLightTheme.fonts.headlineMedium,
    fontFamily: spaceMono,
  },
  headlineSmall: {
    ...DefaultLightTheme.fonts.headlineSmall,
    fontFamily: spaceMono,
  },
  titleLarge: { ...DefaultLightTheme.fonts.titleLarge, fontFamily: spaceMono },
  titleMedium: {
    ...DefaultLightTheme.fonts.titleMedium,
    fontFamily: spaceMono,
  },
  titleSmall: { ...DefaultLightTheme.fonts.titleSmall, fontFamily: spaceMono },
  bodyLarge: { ...DefaultLightTheme.fonts.bodyLarge, fontFamily: spaceMono },
  bodyMedium: { ...DefaultLightTheme.fonts.bodyMedium, fontFamily: spaceMono },
  bodySmall: { ...DefaultLightTheme.fonts.bodySmall, fontFamily: spaceMono },
  labelLarge: { ...DefaultLightTheme.fonts.labelLarge, fontFamily: spaceMono },
  labelMedium: {
    ...DefaultLightTheme.fonts.labelMedium,
    fontFamily: spaceMono,
  },
  labelSmall: { ...DefaultLightTheme.fonts.labelSmall, fontFamily: spaceMono },
};

// Light Theme
export const LightTheme: MD3Theme = {
  ...DefaultLightTheme,
  fonts,
  colors: {
    ...DefaultLightTheme.colors,
    primary: "#4361ee",
    onPrimary: "#ffffff",
    primaryContainer: "#dde1ff",
    onPrimaryContainer: "#001159",
    secondary: "#585a71",
    onSecondary: "#ffffff",
    secondaryContainer: "#dee0f9",
    onSecondaryContainer: "#15172d",
    tertiary: "#75546e",
    onTertiary: "#ffffff",
    tertiaryContainer: "#ffd6f6",
    onTertiaryContainer: "#2c1229",
    background: "#fefbff",
    onBackground: "#1b1b1f",
    surface: "#fefbff",
    onSurface: "#1b1b1f",
    surfaceVariant: "#e3e1ec",
    onSurfaceVariant: "#46464f",
    outline: "#767680",
    error: "#ba1a1a",
    onError: "#ffffff",
    errorContainer: "#ffdad6",
    onErrorContainer: "#410002",
    elevation: {
      level0: "transparent",
      level1: "rgba(246, 243, 255, 0.8)",
      level2: "rgba(241, 238, 255, 0.92)",
      level3: "rgba(236, 233, 255, 0.96)",
      level4: "rgba(234, 232, 255, 0.98)",
      level5: "rgba(231, 228, 255, 0.99)",
    },
  },
  roundness: 12,
};

// Dark Theme
export const DarkTheme: MD3Theme = {
  ...DefaultDarkTheme,
  fonts,
  colors: {
    ...DefaultDarkTheme.colors,
    primary: "#b9c3ff",
    onPrimary: "#00218c",
    primaryContainer: "#0030c0",
    onPrimaryContainer: "#dde1ff",
    secondary: "#c1c4dd",
    onSecondary: "#2a2d42",
    secondaryContainer: "#414359",
    onSecondaryContainer: "#dee0f9",
    tertiary: "#e3b9da",
    onTertiary: "#432740",
    tertiaryContainer: "#5b3d57",
    onTertiaryContainer: "#ffd6f6",
    background: "#1b1b1f",
    onBackground: "#e5e1e6",
    surface: "#1b1b1f",
    onSurface: "#e5e1e6",
    surfaceVariant: "#46464f",
    onSurfaceVariant: "#c6c5d0",
    outline: "#90909a",
    error: "#ffb4ab",
    onError: "#690005",
    errorContainer: "#93000a",
    onErrorContainer: "#ffdad6",
    elevation: {
      level0: "transparent",
      level1: "rgba(33, 33, 38, 0.8)",
      level2: "rgba(38, 38, 44, 0.92)",
      level3: "rgba(43, 43, 50, 0.96)",
      level4: "rgba(44, 44, 52, 0.98)",
      level5: "rgba(47, 47, 56, 0.99)",
    },
  },
  roundness: 16,
};

export type AppTheme = typeof LightTheme;
