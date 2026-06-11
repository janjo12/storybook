import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import * as React from "react";
import { Pressable } from "react-native";

import { ThemeContext } from "@/context/theme-context";

export function SettingsHeaderButton() {
  const router = useRouter();
  const { theme } = React.use(ThemeContext);
  const colors = theme.colors;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open settings"
      onPress={() => router.push("/settings")}
      style={({ pressed }) => ({
        alignItems: "center",
        borderRadius: 8,
        height: 42,
        justifyContent: "center",
        opacity: pressed ? 0.65 : 1,
        width: 42,
      })}
    >
      <SymbolView
        name={{ ios: "gearshape", android: "settings", web: "settings" }}
        tintColor={colors.primary}
        size={25}
      />
    </Pressable>
  );
}
