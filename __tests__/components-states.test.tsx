import { fireEvent, screen } from "@testing-library/react-native";

import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { SkeletonStory } from "@/components/skeleton-story";
import { renderWithTheme } from "../test-utils";

describe("state components", () => {
  it("renders an empty state and calls its action", async () => {
    const onAction = jest.fn();

    await renderWithTheme(
      <EmptyState
        title="No story found"
        message="Nothing came back."
        actionLabel="Try again"
        onAction={onAction}
      />,
    );

    expect(screen.getByText("No story found")).toBeTruthy();
    expect(screen.getByText("Nothing came back.")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("Try again"));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders an error state and calls retry", async () => {
    const onRetry = jest.fn();

    await renderWithTheme(<ErrorState message="Network error" onRetry={onRetry} />);

    expect(screen.getByText("Story unavailable")).toBeTruthy();
    expect(screen.getByText("Network error")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("Retry"));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders a skeleton while loading", async () => {
    const { toJSON } = await renderWithTheme(<SkeletonStory />);

    expect(toJSON()).toBeTruthy();
  });
});
