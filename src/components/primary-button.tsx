import * as React from "react";
import { Pressable, Text } from "react-native";

import { ThemeContext } from "@/context/theme-context";

type PrimaryButtonProps = {
  accessibilityLabel?: string;
  children: string;
  onPress?: () => void;
};

export const PrimaryButton = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  PrimaryButtonProps
>(({ accessibilityLabel, children, onPress }, ref) => {
  const { theme } = React.use(ThemeContext);
  const colors = theme.colors;

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? children}
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: "center",
        backgroundColor: colors.primary,
        borderRadius: 8,
        opacity: pressed ? 0.82 : 1,
        padding: 16,
      })}
    >
      <Text
        style={{
          color: colors.onPrimary,
          fontSize: 16,
          fontWeight: "700",
          lineHeight: 22,
          textAlign: "center",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
});

PrimaryButton.displayName = "PrimaryButton";
