import { Pressable, Text, View } from "react-native";

import type { AppTheme, ThemeId } from "@/context/theme-context";

type ThemeOptionCardProps = {
  active: boolean;
  onSelect: (themeId: ThemeId) => void;
  theme: AppTheme;
};

export function ThemeOptionCard({ active, onSelect, theme }: ThemeOptionCardProps) {
  const colors = theme.colors;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Use ${theme.name} theme`}
      onPress={() => onSelect(theme.id)}
      style={({ pressed }) => ({
        backgroundColor: colors.surface,
        borderColor: active ? colors.primary : colors.border,
        borderRadius: 8,
        borderWidth: active ? 2 : 1,
        gap: 14,
        opacity: pressed ? 0.78 : 1,
        padding: 16,
      })}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: "800" }}>
            {theme.name}
          </Text>
          <Text style={{ color: colors.muted, fontSize: 14 }}>
            {theme.isDark ? "Dark theme" : "Light theme"}
          </Text>
        </View>
        <Text
          style={{
            color: active ? colors.primary : colors.muted,
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          {active ? "Active" : ""}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        {[
          colors.background,
          colors.surface,
          colors.primary,
          colors.text,
          colors.accent,
        ].map((swatch) => (
          <View
            key={swatch}
            style={{
              backgroundColor: swatch,
              borderColor: colors.border,
              borderRadius: 8,
              borderWidth: 1,
              flex: 1,
              height: 34,
            }}
          />
        ))}
      </View>
    </Pressable>
  );
}
