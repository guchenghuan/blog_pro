"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(saved ?? preferred);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  if (!mounted) {
    return (
      <html lang="zh-CN" data-theme="light" suppressHydrationWarning>
        <body className="bg-gradient-warm min-h-screen antialiased" style={{ visibility: "hidden" }}>
          {children}
        </body>
      </html>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <html lang="zh-CN" data-theme={theme} suppressHydrationWarning>
        <body className="bg-gradient-warm min-h-screen antialiased">
          {children}
        </body>
      </html>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
