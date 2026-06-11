import { useRouter } from "expo-router";

import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { ScreenShell } from "@/components/screen-shell";
import { SkeletonStory } from "@/components/skeleton-story";
import { StoryChoices } from "@/components/story-choices";
import { StorySegmentCard } from "@/components/story-segment-card";
import { useStory } from "@/hooks/use-story";

export default function StoryScreen() {
  const router = useRouter();
  const { choices, empty, error, loading, retry, selectChoice, story } = useStory();

  return (
    <ScreenShell contentContainerStyle={{ gap: 18, padding: 20, paddingBottom: 36 }}>
      {loading ? <SkeletonStory /> : null}

      {!loading && error ? <ErrorState message={error} onRetry={retry} /> : null}

      {!loading && !error && empty ? (
        <EmptyState
          title="No story found"
          message="The API responded, but there was not any story text or choices to show."
          actionLabel="Try again"
          onAction={retry}
        />
      ) : null}

      {!loading && !error && !empty ? (
        <>
          <StorySegmentCard title={story?.title} text={story?.text} />

          {choices.length > 0 ? (
            <StoryChoices choices={choices} onSelectChoice={selectChoice} />
          ) : (
            <EmptyState
              title="The End"
              message="Head back to the start to read the story again or try a different path."
              actionLabel="Back to start"
              onAction={() => router.replace("/")}
            />
          )}
        </>
      ) : null}
    </ScreenShell>
  );
}
