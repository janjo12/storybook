import { fireEvent, screen } from "@testing-library/react-native";

import HomeScreen from "@/app";
import SettingsScreen from "@/app/settings";
import StoryScreen from "@/app/story";
import { useStory } from "@/hooks/use-story";
import { renderWithTheme } from "../test-utils";

const { __mockRouter: mockRouter } = jest.requireMock("expo-router");

jest.mock("@/hooks/use-story", () => ({
  useStory: jest.fn(),
}));

const mockUseStory = useStory as jest.Mock;

describe("screens", () => {
  beforeEach(() => {
    mockUseStory.mockReset();
    mockRouter.replace.mockReset();
  });

  it("renders the home actions", async () => {
    await renderWithTheme(<HomeScreen />);

    expect(screen.getByText("Rat Adventure")).toBeTruthy();
    expect(screen.getByLabelText("Start story")).toBeTruthy();
    expect(screen.queryByLabelText("Change theme")).toBeNull();
  });

  it("renders settings theme previews and switches active theme", async () => {
    await renderWithTheme(<SettingsScreen />);

    expect(screen.getByText("Paper Trail")).toBeTruthy();
    expect(screen.getByText("Midnight")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("Use Midnight theme"));
    expect(screen.getAllByText("Active")).toHaveLength(1);
  });

  it("renders story loading state", async () => {
    mockUseStory.mockReturnValue({
      choices: [],
      empty: false,
      error: null,
      loading: true,
      retry: jest.fn(),
      selectChoice: jest.fn(),
      story: null,
    });

    const { toJSON } = await renderWithTheme(<StoryScreen />);

    expect(toJSON()).toBeTruthy();
  });

  it("renders story content and sends choices to the hook", async () => {
    const selectChoice = jest.fn();
    const choice = { id: "one", target: "woods", text: "Enter the woods" };
    mockUseStory.mockReturnValue({
      choices: [choice],
      empty: false,
      error: null,
      loading: false,
      retry: jest.fn(),
      selectChoice,
      story: { title: "Start", text: "A trail waits.", choices: [choice] },
    });

    await renderWithTheme(<StoryScreen />);

    expect(screen.getByText("A trail waits.")).toBeTruthy();
    fireEvent.press(screen.getByLabelText("Choose Enter the woods"));
    expect(selectChoice).toHaveBeenCalledWith(choice);
  });

  it("returns to the start screen when the story has ended", async () => {
    mockUseStory.mockReturnValue({
      choices: [],
      empty: false,
      error: null,
      loading: false,
      retry: jest.fn(),
      selectChoice: jest.fn(),
      story: { text: "The final page.", choices: [] },
    });

    await renderWithTheme(<StoryScreen />);

    fireEvent.press(screen.getByLabelText("Back to start"));
    expect(mockRouter.replace).toHaveBeenCalledWith("/");
  });

  it("renders story errors with retry", async () => {
    const retry = jest.fn();
    mockUseStory.mockReturnValue({
      choices: [],
      empty: false,
      error: "Server is asleep.",
      loading: false,
      retry,
      selectChoice: jest.fn(),
      story: null,
    });

    await renderWithTheme(<StoryScreen />);

    fireEvent.press(screen.getByLabelText("Retry"));
    expect(retry).toHaveBeenCalledTimes(1);
  });
});
