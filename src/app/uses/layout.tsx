import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools, languages, and setup Florian Braun uses daily.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
