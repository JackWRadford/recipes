import React, { createContext, useEffect, useState } from "react";
import { themes } from "../themes";

export interface IThemeContext {
  isDark: boolean;
  toggleDark: () => void;
}

/**
 * Includes the current theme state `isDark` and `toggleDark` to update the theme.
 */
const ThemeContext = createContext<IThemeContext>({
  isDark: false,
  toggleDark: () => {},
});

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

/**
 * Theme provider to wrap the given `children`.
 */
const ThemeProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const setCSSVariables = () => {
      const theme = themes[isDark ? "dark" : "light"];
      for (const value in theme) {
        document.documentElement.style.setProperty(
          `--${value}`,
          theme[value as keyof typeof theme]
        );
      }
    };
    setCSSVariables();
  }, [isDark]);

  /**
   * Toggle the current theme
   */
  const toggleDark = () => {
    setIsDark((oldTheme) => !oldTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDark: isDark, toggleDark: toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
