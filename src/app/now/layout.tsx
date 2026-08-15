import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Florian Braun is currently focused on, plus live GitHub activity.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
