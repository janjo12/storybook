import * as React from "react";
import { Text, View } from "react-native";

import { ThemeContext } from "@/context/theme-context";

export function ScreenHeading({ body, title }: { body: string; title: string }) {
  const { theme } = React.use(ThemeContext);
  const colors = theme.colors;

  return (
    <View style={{ gap: 8 }}>
      <Text selectable style={{ color: colors.text, fontSize: 34, fontWeight: "800" }}>
        {title}
      </Text>
      <Text selectable style={{ color: colors.muted, fontSize: 17, lineHeight: 25 }}>
        {body}
      </Text>
    </View>
  );
}
