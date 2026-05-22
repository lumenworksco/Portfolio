import type { Metadata } from "next";
import ExperienceContent from "@/components/ExperienceContent";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Florian Braun's professional experience — software engineering internships and academic positions.",
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
