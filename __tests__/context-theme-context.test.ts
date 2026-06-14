import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import * as React from "react";

import { ThemeContext, ThemeProvider, themes } from "@/context/theme-context";

const storage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe("themes", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
  });

  it("defines at least six themes", () => {
    expect(themes).toHaveLength(6);
  });

  it("includes at least two light and two dark themes", () => {
    expect(themes.filter((theme) => !theme.isDark)).toHaveLength(3);
    expect(themes.filter((theme) => theme.isDark)).toHaveLength(3);
  });

  it("defines every required color role for every theme", () => {
    for (const theme of themes) {
      expect(theme.colors).toEqual(
        expect.objectContaining({
          accent: expect.any(String),
          background: expect.any(String),
          primary: expect.any(String),
          surface: expect.any(String),
          text: expect.any(String),
        }),
      );
    }
  });

  it("keeps palettes visually distinct beyond background", () => {
    const signatures = themes.map((theme) =>
      [theme.colors.surface, theme.colors.primary, theme.colors.text, theme.colors.accent].join(
        "|",
      ),
    );

    expect(new Set(signatures).size).toBe(themes.length);
  });

  it("persists the selected theme on the device", async () => {
    const { result } = await renderHook(() => React.use(ThemeContext), {
      wrapper: ThemeProvider,
    });

    await act(async () => {
      result.current.setTheme("midnight");
    });

    expect(result.current.theme.id).toBe("midnight");
    expect(storage.setItem).toHaveBeenCalledWith("storybook.theme", "midnight");
  });

  it("hydrates a saved theme when the app opens", async () => {
    await AsyncStorage.setItem("storybook.theme", "lagoon");

    const { result } = await renderHook(() => React.use(ThemeContext), {
      wrapper: ThemeProvider,
    });

    await waitFor(() => expect(result.current.theme.id).toBe("lagoon"));
  });
});
