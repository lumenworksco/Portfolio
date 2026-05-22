import type { Metadata } from "next";
import ProjectsContent from "@/components/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects built by Florian Braun — from collaborative study platforms to AI-powered code review bots.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
