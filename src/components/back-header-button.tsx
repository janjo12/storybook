import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import * as React from "react";
import { Pressable } from "react-native";

import { ThemeContext } from "@/context/theme-context";

export function BackHeaderButton() {
  const router = useRouter();
  const { theme } = React.use(ThemeContext);
  const colors = theme.colors;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Go back"
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
          return;
        }

        router.replace("/");
      }}
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
        name={{ ios: "chevron.left", android: "arrow_back", web: "arrow_back" }}
        tintColor={colors.primary}
        size={25}
      />
    </Pressable>
  );
}
