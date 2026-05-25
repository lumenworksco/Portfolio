import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description: "Florian Braun's academic research in NLP, cross-lingual alignment, and LLM interpretability.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
