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
  title: "Florian Braun",
  description: "Select your experience — Florian Braun's creative hub.",
  openGraph: {
    title: "Florian Braun",
    description: "Exploring the Intersection of AI & Entrepreneurship",
    url: "https://braunf.com",
    siteName: "Florian Braun",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Florian Braun" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Florian Braun",
    description: "Exploring the Intersection of AI & Entrepreneurship",
    images: ["/og.png"],
  },
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
