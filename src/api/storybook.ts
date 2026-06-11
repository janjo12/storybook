import { fetch } from "expo/fetch";

export type StoryChoice = {
  id: string;
  target: string | null;
  text: string;
};

export type StorySegment = {
  choices: StoryChoice[];
  text: string;
  title?: string;
};

const API_BASE_URL =
  process.env.EXPO_PUBLIC_STORYBOOK_API_URL ??
  "https://two026-summer-repo.onrender.com";

const START_SCENE_PATH =
  process.env.EXPO_PUBLIC_STORYBOOK_START_PATH ?? "/api/scenes/the-nest";

export async function fetchStorySegment(url = resolveApiUrl(START_SCENE_PATH)) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Story request failed with status ${response.status}.`);
  }

  const payload = await response.json();
  return normalizeStorySegment(payload);
}

function normalizeStorySegment(payload: unknown): StorySegment {
  const record = toRecord(Array.isArray(payload) ? payload[0] : payload);

  if (!record) {
    return { choices: [], text: "" };
  }

  const nested = toRecord(record.story) ?? toRecord(record.segment) ?? record;
  const rawChoices =
    readArray(nested.choices) ??
    readArray(nested.options) ??
    readArray(nested.actions) ??
    [];

  const title = readString(nested.title);

  return {
    choices: rawChoices.map(normalizeChoice).filter((choice) => choice.text),
    text:
      readString(nested.text) ??
      readString(nested.content) ??
      readString(nested.storyText) ??
      "",
    ...(title ? { title } : {}),
  };
}

function normalizeChoice(choice: unknown, index: number): StoryChoice {
  const record = toRecord(choice);

  if (!record) {
    return {
      id: String(index),
      target: null,
      text: readString(choice) ?? `Choice ${index + 1}`,
    };
  }

  const target =
    readString(record.target) ??
    readString(record.nextUrl) ??
    readString(record.url) ??
    readString(record.href) ??
    readString(record.next) ??
    readString(record.nextId);
  const text =
    readString(record.text) ??
    readString(record.label) ??
    readString(record.choice) ??
    `Choice ${index + 1}`;

  return {
    id: readString(record.id) ?? readString(record.key) ?? `${index}-${target ?? text}`,
    target,
    text,
  };
}

export function resolveSceneUrl(sceneId: string) {
  return resolveApiUrl(`/api/scenes/${sceneId}`);
}

function resolveApiUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http")) {
    return pathOrUrl;
  }

  const base = API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`;
  return new URL(pathOrUrl.replace(/^\//, ""), base).toString();
}

function toRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return null;
}

function readArray(value: unknown) {
  return Array.isArray(value) ? value : null;
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}
