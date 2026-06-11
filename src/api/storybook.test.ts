import { fetch } from "expo/fetch";

import { fetchStorySegment, resolveSceneUrl } from "@/api/storybook";

jest.mock("expo/fetch", () => ({
  fetch: jest.fn(),
}));

const mockFetch = fetch as jest.Mock;

function mockJsonResponse(payload: unknown, ok = true, status = 200) {
  mockFetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(payload),
    ok,
    status,
  });
}

describe("fetchStorySegment", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("starts the game from the opening scene endpoint", async () => {
    mockJsonResponse({ text: "Once upon a time.", choices: [] });

    await fetchStorySegment();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://two026-summer-repo.onrender.com/api/scenes/the-nest",
      {
        headers: { Accept: "application/json" },
      },
    );
  });

  it("normalizes text, title, and choices", async () => {
    mockJsonResponse({
      title: "The Gate",
      text: "A gate opens.",
      choices: [
        { id: "left", text: "Go left", target: "left" },
        { label: "Go right", href: "https://example.com/right" },
      ],
    });

    await expect(fetchStorySegment()).resolves.toEqual({
      title: "The Gate",
      text: "A gate opens.",
      choices: [
        {
          id: "left",
          target: "left",
          text: "Go left",
        },
        {
          id: "1-https://example.com/right",
          target: "https://example.com/right",
          text: "Go right",
        },
      ],
    });
  });

  it("accepts nested segment payloads with options", async () => {
    mockJsonResponse({
      segment: {
        content: "The path narrows.",
        options: [{ choice: "Duck", next: "duck" }],
      },
    });

    await expect(fetchStorySegment()).resolves.toMatchObject({
      text: "The path narrows.",
      choices: [{ target: "duck", text: "Duck" }],
    });
  });

  it("treats an empty array response as an empty state", async () => {
    mockJsonResponse([]);

    await expect(fetchStorySegment()).resolves.toEqual({ choices: [], text: "" });
  });

  it("throws a meaningful error for non-OK responses", async () => {
    mockJsonResponse({ message: "Nope" }, false, 503);

    await expect(fetchStorySegment()).rejects.toThrow("Story request failed with status 503.");
  });

  it("resolves scene IDs through the scene endpoint", () => {
    expect(resolveSceneUrl("woods")).toBe(
      "https://two026-summer-repo.onrender.com/api/scenes/woods",
    );
  });
});
