"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Aurora from "@/components/ui/Aurora";
import GradientText from "@/components/ui/GradientText";
import FadeContent from "@/components/ui/FadeContent";

interface UsesItem {
  name: string;
  desc: string;
}

interface UsesSection {
  label: string;
  items: UsesItem[];
}

const SECTIONS: UsesSection[] = [
  {
    label: "Hardware",
    items: [
      { name: "MacBook",         desc: "Primary machine — macOS Sequoia" },
    ],
  },
  {
    label: "Editor & CLI",
    items: [
      { name: "VS Code",         desc: "Daily driver across all projects" },
      { name: "Claude Code",     desc: "AI coding assistant — CLI + IDE" },
      { name: "zsh",             desc: "Shell of choice" },
    ],
  },
  {
    label: "Languages",
    items: [
      { name: "Python",          desc: "AI/ML, trading systems, backend APIs" },
      { name: "TypeScript",      desc: "Web frontends and React Native" },
      { name: "Rust",            desc: "Performance-critical systems" },
      { name: "Dart",            desc: "Flutter mobile apps" },
      { name: "Kotlin",          desc: "Native Android development" },
    ],
  },
  {
    label: "Frameworks",
    items: [
      { name: "React / Next.js", desc: "Web frontends" },
      { name: "FastAPI",         desc: "Python REST APIs" },
      { name: "Flutter",         desc: "Cross-platform mobile" },
      { name: "React Native",    desc: "Cross-platform mobile with Expo" },
      { name: "Jetpack Compose", desc: "Native Android UI" },
    ],
  },
  {
    label: "AI & ML",
    items: [
      { name: "PyTorch",         desc: "Deep learning and NLP research" },
      { name: "Hugging Face",    desc: "Pretrained models and fine-tuning" },
      { name: "LangChain",       desc: "LLM application development" },
      { name: "Claude API",      desc: "AI features and research tooling" },
      { name: "scikit-learn",    desc: "Classical ML" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { name: "Docker",          desc: "Containerisation" },
      { name: "PostgreSQL",      desc: "Primary database" },
      { name: "GitHub Actions",  desc: "CI / CD" },
      { name: "PlatformIO",      desc: "Embedded firmware — ESP32" },
    ],
  },
];

export default function UsesPage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: "#060608" }}
    >
      {/* Aurora */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#6d28d9", "#7c3aed", "#4f46e5"]}
          speed={0.45}
          amplitude={0.85}
        />
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(6,6,8,0.72) 100%)",
        }}
      />

      {/* Back */}
      <Link
        href="/"
        className="fixed top-5 left-5 z-20 flex items-center gap-2 text-xs font-mono tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.15s ease" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)")}
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <main className="relative z-10 max-w-xl mx-auto px-5 pt-24 pb-24">

        {/* Header */}
        <FadeContent blur duration={600} initialOpacity={0} className="mb-12">
          <p
            style={{
              fontSize: "8px",
              fontFamily: "var(--font-pixel), monospace",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            /uses
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <GradientText
              colors={["#c4b5fd", "#8b5cf6", "#a78bfa", "#8b5cf6", "#c4b5fd"]}
              animationSpeed={5}
            >
              My Setup
            </GradientText>
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: "1.7" }}>
            Tools, languages, and infrastructure I reach for every day.
          </p>
        </FadeContent>

        {/* Sections */}
        <div className="flex flex-col gap-4">
          {SECTIONS.map((section, si) => (
            <FadeContent
              key={section.label}
              blur
              duration={600}
              delay={150 + si * 80}
              initialOpacity={0}
            >
              <div
                style={{
                  background: "rgba(10,10,14,0.88)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "22px 24px",
                }}
              >
                <p
                  style={{
                    fontSize: "9px",
                    fontFamily: "var(--font-pixel), monospace",
                    color: "rgba(255,255,255,0.22)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  {section.label}
                </p>
                <div className="flex flex-col gap-3">
                  {section.items.map((item, ii) => (
                    <div
                      key={item.name}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "12px",
                        paddingBottom: ii < section.items.length - 1 ? "12px" : 0,
                        borderBottom:
                          ii < section.items.length - 1
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "none",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.88)",
                          fontWeight: 500,
                          minWidth: "140px",
                          flexShrink: 0,
                        }}
                      >
                        {item.name}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.35)",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeContent>
          ))}
        </div>

      </main>
    </div>
  );
}
