import * as React from "react";
import { View } from "react-native";

import { ThemeContext } from "@/context/theme-context";

export function SkeletonStory() {
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
      <SkeletonLine width="48%" />
      <SkeletonLine width="100%" />
      <SkeletonLine width="92%" />
      <SkeletonLine width="74%" />
      <View style={{ height: 10 }} />
      <SkeletonLine width="100%" height={50} />
      <SkeletonLine width="100%" height={50} />
    </View>
  );
}

function SkeletonLine({ height = 18, width }: { height?: number; width: `${number}%` }) {
  const { theme } = React.use(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: theme.colors.border,
        borderRadius: 8,
        height,
        opacity: 0.55,
        width,
      }}
    />
  );
}
