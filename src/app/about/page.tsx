import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Florian Braun — a Computer Science student at TU Munich passionate about building modern web applications.",
};

export default function AboutPage() {
  return <AboutContent />;
}
