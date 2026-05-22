import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Florian Braun — open to opportunities, collaborations, and conversations about technology.",
};

export default function ContactPage() {
  return <ContactContent />;
}
