"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initializing theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    // This runs only on the client during mount :3
    if (typeof window === "undefined") return "dark";

    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) return storedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  };

  // Appling theme on mount and whenever theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return {
      theme: "dark" as Theme,
      toggleTheme: () => {},
    };
  }
  return context;
}



