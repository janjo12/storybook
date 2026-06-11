import * as React from "react";
import { render, RenderOptions } from "@testing-library/react-native";

import { ThemeProvider } from "@/context/theme-context";

export function renderWithTheme(ui: React.ReactElement, options?: RenderOptions) {
  return render(<ThemeProvider>{ui}</ThemeProvider>, options);
}
