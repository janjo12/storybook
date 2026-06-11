import * as React from "react";
import { Pressable, Text, View } from "react-native";

import { ThemeContext } from "@/context/theme-context";

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const { theme } = React.use(ThemeContext);
  const colors = theme.colors;

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: 8,
        borderWidth: 1,
        gap: 14,
        padding: 18,
      }}
    >
      <Text selectable style={{ color: colors.text, fontSize: 21, fontWeight: "800" }}>
        Story unavailable
      </Text>
      <Text selectable style={{ color: colors.muted, fontSize: 16, lineHeight: 23 }}>
        {message}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Retry"
        onPress={onRetry}
        style={({ pressed }) => ({
          alignItems: "center",
          backgroundColor: colors.primary,
          borderRadius: 8,
          opacity: pressed ? 0.82 : 1,
          padding: 14,
        })}
      >
        <Text style={{ color: colors.onPrimary, fontSize: 16, fontWeight: "700" }}>
          Retry
        </Text>
      </Pressable>
    </View>
  );
}
