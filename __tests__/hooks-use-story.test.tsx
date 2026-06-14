import { act, renderHook, waitFor } from "@testing-library/react-native";

import { fetchStorySegment } from "@/api/storybook";
import { useStory } from "@/hooks/use-story";

jest.mock("@/api/storybook", () => ({
  fetchStorySegment: jest.fn(),
  resolveSceneUrl: (sceneId: string) => `https://example.test/api/scenes/${sceneId}`,
}));

const mockFetchStorySegment = fetchStorySegment as jest.Mock;

describe("useStory", () => {
  beforeEach(() => {
    mockFetchStorySegment.mockReset();
  });

  it("loads the opening story segment", async () => {
    mockFetchStorySegment.mockResolvedValueOnce({
      text: "Hello",
      choices: [{ id: "a", target: "go", text: "Go" }],
    });

    const { result } = await renderHook(() => useStory());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.story?.text).toBe("Hello");
    expect(result.current.choices).toHaveLength(1);
  });

  it("loads the next segment when a choice has a target", async () => {
    mockFetchStorySegment
      .mockResolvedValueOnce({
        text: "Start",
        choices: [{ id: "a", target: "go", text: "Go" }],
      })
      .mockResolvedValueOnce({ text: "Next", choices: [] });

    const { result } = await renderHook(() => useStory());

    await waitFor(() => expect(result.current.story?.text).toBe("Start"));

    await act(async () => {
      result.current.selectChoice({ id: "a", target: "go", text: "Go" });
    });

    await waitFor(() => expect(result.current.story?.text).toBe("Next"));
    expect(mockFetchStorySegment).toHaveBeenLastCalledWith("https://example.test/api/scenes/go");
  });

  it("exposes errors from failed requests", async () => {
    mockFetchStorySegment.mockRejectedValueOnce(new Error("Boom"));

    const { result } = await renderHook(() => useStory());

    await waitFor(() => expect(result.current.error).toBe("Boom"));
    expect(result.current.loading).toBe(false);
  });
});
