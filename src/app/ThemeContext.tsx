"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: (explicitTheme?: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // State for the theme and loading 
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [initialized, setInitialized] = useState(false);

  // Read the theme from localStorage or use the system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark" || storedTheme === "light") {
        setTheme(storedTheme);
      } else {
        // Default to light mode if no theme is set in localStorage
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
      }
      setInitialized(true); 
    }
  }, []);

  // Apply theme to the document root after theme is set
  useEffect(() => {
    if (initialized && typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, initialized]);

  // Function to toggle theme
  const toggleTheme = (explicitTheme?: "light" | "dark") => {
    const newTheme = explicitTheme ?? (theme === "light" ? "dark" : "light");
    setTheme(newTheme);
  };

  // Only render the children after theme has been initialized
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {initialized ? children : null}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
