import { View } from "react-native";

import { PrimaryButton } from "@/components/primary-button";
import type { StoryChoice } from "@/api/storybook";

type StoryChoicesProps = {
  choices: StoryChoice[];
  onSelectChoice: (choice: StoryChoice) => void;
};

export function StoryChoices({ choices, onSelectChoice }: StoryChoicesProps) {
  return (
    <View style={{ gap: 12 }}>
      {choices.map((choice) => (
        <PrimaryButton
          key={choice.id}
          accessibilityLabel={`Choose ${choice.text}`}
          onPress={() => onSelectChoice(choice)}
        >
          {choice.text}
        </PrimaryButton>
      ))}
    </View>
  );
}
