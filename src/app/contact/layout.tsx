import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Florian Braun — open to research collaborations, engineering opportunities, and interesting conversations.",
  openGraph: {
    title: "Contact · Florian Braun",
    description: "Get in touch — open to research collaborations and engineering opportunities.",
    url: "https://braunf.com/contact",
  },
  twitter: {
    title: "Contact · Florian Braun",
    description: "Get in touch — open to research collaborations and engineering opportunities.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
