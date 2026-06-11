import { themes } from "@/context/theme-context";

describe("themes", () => {
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
});
