import * as React from "react";

import { fetchStorySegment, resolveSceneUrl, StoryChoice, StorySegment } from "@/api/storybook";

export function useStory() {
  const [currentUrl, setCurrentUrl] = React.useState<string | undefined>();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [story, setStory] = React.useState<StorySegment | null>(null);

  const loadStory = React.useCallback(async (url?: string) => {
    setError(null);
    setLoading(true);

    try {
      const nextStory = await fetchStorySegment(url);
      setCurrentUrl(url);
      setStory(nextStory);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "The story could not be loaded.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      void loadStory();
    }, 0);

    return () => clearTimeout(timeout);
  }, [loadStory]);

  const selectChoice = React.useCallback(
    (choice: StoryChoice) => {
      if (!choice.target) {
        setStory({ choices: [], text: "" });
        return;
      }

      void loadStory(resolveSceneUrl(choice.target));
    },
    [loadStory],
  );

  return {
    choices: story?.choices ?? [],
    empty: !story?.text && (story?.choices.length ?? 0) === 0,
    error,
    loading,
    retry: () => loadStory(currentUrl),
    selectChoice,
    story,
  };
}
