import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal",
  description: "Interactive terminal for braunf.com.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
