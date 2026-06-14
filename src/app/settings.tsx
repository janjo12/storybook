import * as React from "react";

import { ScreenShell } from "@/components/screen-shell";
import { ThemeOptionCard } from "@/components/theme-option-card";
import { ThemeContext, themes } from "@/context/theme-context";

export default function SettingsScreen() {
  const { setTheme, theme } = React.use(ThemeContext);

  return (
    <ScreenShell contentContainerStyle={{ gap: 16, padding: 20, paddingBottom: 36 }}>
      {themes.map((item) => (
        <ThemeOptionCard
          key={item.id}
          active={item.id === theme.id}
          onSelect={setTheme}
          theme={item}
        />
      ))}
    </ScreenShell>
  );
}
