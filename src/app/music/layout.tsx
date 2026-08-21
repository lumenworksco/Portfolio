import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beats",
  description: "Loops made on a Teenage Engineering PO-33 K.O.!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
