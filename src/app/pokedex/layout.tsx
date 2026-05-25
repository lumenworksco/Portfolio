import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokédex",
  description:
    "23 achievements captured — hackathons, awards, education, certifications, and research by Florian Braun.",
  openGraph: {
    title: "Pokédex · Florian Braun",
    description: "23 achievements captured — hackathons, awards, certifications, and research.",
    url: "https://braunf.com/pokedex",
  },
  twitter: {
    title: "Pokédex · Florian Braun",
    description: "23 achievements captured — hackathons, awards, certifications, and research.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
