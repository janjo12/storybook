import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

export type ThemeId =
  | "paper-trail"
  | "garden"
  | "midnight"
  | "ember"
  | "lagoon"
  | "plum";

export type AppTheme = {
  id: ThemeId;
  name: string;
  isDark: boolean;
  colors: {
    accent: string;
    background: string;
    border: string;
    muted: string;
    onPrimary: string;
    primary: string;
    surface: string;
    text: string;
  };
};

type ThemeContextValue = {
  setTheme: (themeId: ThemeId) => void;
  theme: AppTheme;
};

export const themes: AppTheme[] = [
  {
    id: "paper-trail",
    name: "Paper Trail",
    isDark: false,
    colors: {
      accent: "#9D5C0D",
      background: "#F8F4EC",
      border: "#D8CCB8",
      muted: "#625A4D",
      onPrimary: "#FFFFFF",
      primary: "#315C48",
      surface: "#FFFDF7",
      text: "#201B15",
    },
  },
  {
    id: "garden",
    name: "Garden",
    isDark: false,
    colors: {
      accent: "#B34D65",
      background: "#EFF7F0",
      border: "#B9D4C0",
      muted: "#53665A",
      onPrimary: "#FFFFFF",
      primary: "#236C5E",
      surface: "#FFFFFF",
      text: "#17251E",
    },
  },
  {
    id: "lagoon",
    name: "Lagoon",
    isDark: false,
    colors: {
      accent: "#C45B39",
      background: "#EAF7FA",
      border: "#A7CED6",
      muted: "#496870",
      onPrimary: "#FFFFFF",
      primary: "#146C8C",
      surface: "#F8FEFF",
      text: "#10242B",
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    isDark: true,
    colors: {
      accent: "#E8C468",
      background: "#11131C",
      border: "#30364B",
      muted: "#A8B0C3",
      onPrimary: "#0B1020",
      primary: "#9BB7FF",
      surface: "#1B2030",
      text: "#F2F5FF",
    },
  },
  {
    id: "ember",
    name: "Ember",
    isDark: true,
    colors: {
      accent: "#F7B267",
      background: "#1D1210",
      border: "#5A352D",
      muted: "#D8B9AE",
      onPrimary: "#23100B",
      primary: "#FF8A65",
      surface: "#2C1B18",
      text: "#FFF4EF",
    },
  },
  {
    id: "plum",
    name: "Plum",
    isDark: true,
    colors: {
      accent: "#7DD3C7",
      background: "#18111F",
      border: "#4A365A",
      muted: "#C7B8D8",
      onPrimary: "#190E22",
      primary: "#D7A6FF",
      surface: "#261A31",
      text: "#FBF6FF",
    },
  },
];

export const ThemeContext = React.createContext<ThemeContextValue>({
  setTheme: () => undefined,
  theme: themes[0],
});

const THEME_STORAGE_KEY = "storybook.theme";

function isThemeId(value: string | null): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = React.useState<ThemeId>("paper-trail");
  const theme = themes.find((item) => item.id === themeId) ?? themes[0];
  const setTheme = React.useCallback((nextThemeId: ThemeId) => {
    setThemeId(nextThemeId);
    AsyncStorage.setItem(THEME_STORAGE_KEY, nextThemeId).catch(() => undefined);
  }, []);

  React.useEffect(() => {
    let mounted = true;

    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((storedThemeId) => {
        if (mounted && isThemeId(storedThemeId)) {
          setThemeId(storedThemeId);
        }
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
