import { fireEvent, screen } from "@testing-library/react-native";

import { BackHeaderButton } from "@/components/back-header-button";
import { SettingsHeaderButton } from "@/components/settings-header-button";
import { renderWithTheme } from "../test-utils";

const { __mockRouter } = jest.requireMock("expo-router") as {
  __mockRouter: {
    back: jest.Mock;
    canGoBack: jest.Mock;
    push: jest.Mock;
    replace: jest.Mock;
  };
};

describe("SettingsHeaderButton", () => {
  beforeEach(() => {
    __mockRouter.back.mockClear();
    __mockRouter.canGoBack.mockReset();
    __mockRouter.canGoBack.mockReturnValue(true);
    __mockRouter.push.mockClear();
    __mockRouter.replace.mockClear();
  });

  it("pushes settings onto the navigation stack when pressed", async () => {
    await renderWithTheme(<SettingsHeaderButton />);

    fireEvent.press(screen.getByLabelText("Open settings"));

    expect(__mockRouter.push).toHaveBeenCalledWith("/settings");
  });

  it("returns to the previous screen from settings", async () => {
    await renderWithTheme(<BackHeaderButton />);

    fireEvent.press(screen.getByLabelText("Go back"));

    expect(__mockRouter.back).toHaveBeenCalledTimes(1);
    expect(__mockRouter.replace).not.toHaveBeenCalled();
  });

  it("falls back to the start screen when there is no previous route", async () => {
    __mockRouter.canGoBack.mockReturnValue(false);

    await renderWithTheme(<BackHeaderButton />);

    fireEvent.press(screen.getByLabelText("Go back"));

    expect(__mockRouter.back).not.toHaveBeenCalled();
    expect(__mockRouter.replace).toHaveBeenCalledWith("/");
  });
});
