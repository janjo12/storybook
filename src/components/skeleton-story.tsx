import * as React from "react";
import { Animated, View } from "react-native";

import { ThemeContext } from "@/context/theme-context";

export function SkeletonStory() {
  const { theme } = React.use(ThemeContext);
  const colors = theme.colors;
  const pulse = React.useMemo(() => new Animated.Value(0.45), []);

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          duration: 850,
          toValue: 0.85,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          duration: 850,
          toValue: 0.45,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [pulse]);

  return (
    <View accessibilityLabel="Loading story" accessibilityRole="progressbar" style={{ gap: 18 }}>
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
        <SkeletonLine opacity={pulse} width="38%" height={15} />
        <View style={{ gap: 10 }}>
          <SkeletonLine opacity={pulse} width="100%" height={21} />
          <SkeletonLine opacity={pulse} width="96%" height={21} />
          <SkeletonLine opacity={pulse} width="88%" height={21} />
          <SkeletonLine opacity={pulse} width="72%" height={21} />
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <SkeletonLine opacity={pulse} width="100%" height={54} tone="primary" />
        <SkeletonLine opacity={pulse} width="100%" height={54} tone="primary" />
      </View>
    </View>
  );
}

function SkeletonLine({
  height = 18,
  opacity,
  tone = "muted",
  width,
}: {
  height?: number;
  opacity: Animated.Value;
  tone?: "muted" | "primary";
  width: `${number}%`;
}) {
  const { theme } = React.use(ThemeContext);

  return (
    <Animated.View
      style={{
        backgroundColor: tone === "primary" ? theme.colors.primary : theme.colors.border,
        borderRadius: 8,
        height,
        opacity,
        width,
      }}
    />
  );
}
