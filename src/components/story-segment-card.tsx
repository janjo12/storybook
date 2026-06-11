import { ThemeContext } from "@/context/theme-context";
import * as React from "react";
import { Text, View } from "react-native";

type StorySegmentCardProps = {
  text?: string;
  title?: string;
};

export function StorySegmentCard({ text, title }: StorySegmentCardProps) {
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
      {title ? (
        <Text selectable style={{ color: colors.accent, fontSize: 15, fontWeight: "700" }}>
          {title}
        </Text>
      ) : null}
      <Text selectable style={{ color: colors.text, fontSize: 20, lineHeight: 31 }}>
        {text}
      </Text>
    </View>
  );
}

/*
export function SurfaceCard({ children }: { children: React.ReactNode }) {
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
      {children}
    </View>
  );
}
*/