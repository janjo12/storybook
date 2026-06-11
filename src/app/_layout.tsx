import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";

import { BackHeaderButton } from "@/components/back-header-button";
import { SettingsHeaderButton } from "@/components/settings-header-button";
import { ThemeContext, ThemeProvider } from "@/context/theme-context";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}

function ThemedStack() {
  const { theme } = React.use(ThemeContext);

  return (
    <>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: theme.colors.background },
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.primary,
          headerTitleStyle: { color: theme.colors.text },
          headerBackVisible: false,
          headerLeft: () => <SettingsHeaderButton />,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Storybook" }} />
        <Stack.Screen name="story" options={{ title: "Story" }} />
        <Stack.Screen
          name="settings"
          options={{ headerLeft: () => <BackHeaderButton />, title: "Color Themes" }}
        />
      </Stack>
    </>
  );
}
