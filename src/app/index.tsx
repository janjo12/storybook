import { Link } from "expo-router";
import { View } from "react-native";

import { PrimaryButton } from "@/components/primary-button";
import { ScreenHeading } from "@/components/screen-heading";
import { ScreenShell } from "@/components/screen-shell";

export default function Index() {
  return (
    <ScreenShell contentContainerStyle={{ flexGrow: 1, gap: 18, padding: 24 }}>
      <View style={{ flex: 1, justifyContent: "center", gap: 22 }}>
        <ScreenHeading
          title="Rat Adventure"
          body="Read the story and choose your path to determine the ending."
        />

        <View style={{ gap: 12 }}>
          <Link href="/story" asChild>
            <PrimaryButton>Start story</PrimaryButton>
          </Link>
        </View>
      </View>
    </ScreenShell>
  );
}
