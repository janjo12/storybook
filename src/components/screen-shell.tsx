import * as React from "react";
import { ScrollView, type ScrollViewProps } from "react-native";

import { ThemeContext } from "@/context/theme-context";

type ScreenShellProps = {
  children: React.ReactNode;
  contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
};

export function ScreenShell({ children, contentContainerStyle }: ScreenShellProps) {
  const { theme } = React.use(ThemeContext);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </ScrollView>
  );
}
