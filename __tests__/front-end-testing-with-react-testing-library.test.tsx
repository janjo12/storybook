import { screen, userEvent } from "@testing-library/react-native";

import StoryScreen from "@/app/story";
import SettingsScreen from "@/app/settings";
import { PrimaryButton } from "@/components/primary-button";
import { StoryChoices } from "@/components/story-choices";
import { fetchStorySegment } from "@/api/storybook";
import { renderWithTheme } from "../test-utils";

jest.mock("@/api/storybook", () => ({
  fetchStorySegment: jest.fn(),
  resolveSceneUrl: (sceneId: string) => `https://example.test/api/scenes/${sceneId}`,
}));

const mockFetchStorySegment = fetchStorySegment as jest.Mock;

describe("React Native Testing Library assignment tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("PrimaryButton calls onPress", async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();

    await renderWithTheme(<PrimaryButton onPress={onPress}>Submit</PrimaryButton>);

    await user.press(screen.getByRole("button", { name: "Submit" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test("StoryChoices shows choices and selects one", async () => {
    const user = userEvent.setup();
    const onSelectChoice = jest.fn();
    const choice = { id: "woods", target: "woods", text: "Enter the woods" };

    await renderWithTheme(
      <StoryChoices choices={[choice]} onSelectChoice={onSelectChoice} />
    );

    expect(screen.getByText("Enter the woods")).toBeTruthy();

    await user.press(screen.getByLabelText("Choose Enter the woods"));

    expect(onSelectChoice).toHaveBeenCalledWith(choice);
  });

  test("SettingsScreen changes active theme", async () => {
    const user = userEvent.setup();

    await renderWithTheme(<SettingsScreen />);

    expect(screen.getByText("Paper Trail")).toBeTruthy();
    expect(screen.queryByText("Galaxy")).toBeNull();

    await user.press(screen.getByLabelText("Use Midnight theme"));

    expect(screen.getAllByText("Active")).toHaveLength(1);
  });

  test("StoryScreen fetches and displays async story data", async () => {
    mockFetchStorySegment.mockResolvedValueOnce({
      title: "The Nest",
      text: "You wake up in a warm pile of straw.",
      choices: [{ id: "a", target: "tunnel-a", text: "Enter the tunnel" }],
    });

    await renderWithTheme(<StoryScreen />);

    expect(await screen.findByText("The Nest")).toBeTruthy();
    expect(screen.getByText("You wake up in a warm pile of straw.")).toBeTruthy();
  });

  test("StoryScreen loads the next segment after choosing an option", async () => {
    const user = userEvent.setup();

    mockFetchStorySegment
      .mockResolvedValueOnce({
        title: "The Nest",
        text: "You wake up.",
        choices: [{ id: "a", target: "tunnel-a", text: "Enter the tunnel" }],
      })
      .mockResolvedValueOnce({
        title: "Tunnel A",
        text: "The tunnel is dark and narrow.",
        choices: [],
      });

    await renderWithTheme(<StoryScreen />);

    await screen.findByText("Enter the tunnel");

    await user.press(screen.getByLabelText("Choose Enter the tunnel"));

    expect(await screen.findByText("Tunnel A")).toBeTruthy();
    expect(screen.getByText("The tunnel is dark and narrow.")).toBeTruthy();
  });

  test("StoryScreen retries after an async error", async () => {
    const user = userEvent.setup();

    mockFetchStorySegment
      .mockRejectedValueOnce(new Error("Server is asleep."))
      .mockResolvedValueOnce({
        title: "The Nest",
        text: "The story is awake again.",
        choices: [],
      });

    await renderWithTheme(<StoryScreen />);

    expect(await screen.findByText("Story unavailable")).toBeTruthy();
    expect(screen.getByText("Server is asleep.")).toBeTruthy();

    await user.press(screen.getByLabelText("Retry"));

    expect(await screen.findByText("The story is awake again.")).toBeTruthy();
  });
});
