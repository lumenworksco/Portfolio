import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://braunf.com"),
  title: {
    default: "Florian Braun",
    template: "%s · Florian Braun",
  },
  description:
    "Co-Founder, Engineer & Researcher. Building at the intersection of AI and entrepreneurship — Leuven, Belgium.",
  keywords: [
    "Florian Braun",
    "software engineer",
    "AI researcher",
    "entrepreneur",
    "Lumen Studio",
    "CalmCampus",
    "NLP",
    "machine learning",
    "Leuven",
  ],
  authors: [{ name: "Florian Braun", url: "https://braunf.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://braunf.com",
    siteName: "Florian Braun",
    title: "Florian Braun",
    description:
      "Co-Founder, Engineer & Researcher. Building at the intersection of AI and entrepreneurship.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Florian Braun" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Florian Braun",
    description:
      "Co-Founder, Engineer & Researcher. Building at the intersection of AI and entrepreneurship.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart2P.variable} antialiased`}>{children}</body>
    </html>
  );
}
