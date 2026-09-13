import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { themes, type ThemeName, type Theme } from '@/themes';

interface ThemeContextValue {
  currentTheme: Theme;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('midnight');

  const currentTheme = themes.find((t) => t.name === themeName)!;

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(currentTheme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    if (themeName === 'pure') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, [themeName, currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
