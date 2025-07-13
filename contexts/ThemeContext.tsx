import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { AppTheme, DarkTheme, LightTheme } from "../constants/PaperTheme";

type ThemeContextType = {
  theme: AppTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");

  useEffect(() => {
    setIsDark(systemScheme === "dark");
  }, [systemScheme]);

  const toggleTheme = () => setIsDark(!isDark);
  const setTheme = (dark: boolean) => setIsDark(dark);

  const theme = isDark ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return context;
};
