"use client";

import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Aurora from "@/components/ui/Aurora";
import GradientText from "@/components/ui/GradientText";
import FadeContent from "@/components/ui/FadeContent";

// ─── Animation ─────────────────────────────────────────────────────────────────
const itemVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Data ──────────────────────────────────────────────────────────────────────
interface Paper {
  title: string;
  year: string;
  abstract: string;
  contributions: string[];
  tags: string[];
  link?: string;
  status: "Published" | "In progress" | "Under review";
}

const PAPERS: Paper[] = [
  {
    title: "Interpretable Cross-Lingual Alignment in Small Language Models: Probing Cultural and Pragmatic Reasoning in Japanese-English Bilingual LLMs",
    year: "2026",
    abstract:
      "Investigates how small language models encode cross-lingual alignment, focusing on cultural and pragmatic reasoning in Japanese-English bilingual settings. Probes internal representations to assess whether models capture language-specific pragmatic cues or converge on a language-neutral representation.",
    contributions: [
      "Probing suite for cultural and pragmatic cues in bilingual small language models",
      "Comparative analysis of language-neutral vs. language-specific internal representations",
      "Evaluation across small-scale models on Japanese-English pragmatic reasoning benchmarks",
    ],
    tags: ["NLP", "Cross-lingual", "LLMs", "Interpretability", "Japanese-English"],
    status: "In progress",
  },
  {
    title: "The Foundational Role of Data Structures and Algorithms in Artificial Intelligence Systems",
    year: "Oct 2025",
    abstract:
      "Examines how classical computer science fundamentals — sorting, searching, graph algorithms, and dynamic programming — underpin modern AI infrastructure and ML systems at scale. Argues that algorithmic literacy remains essential for building efficient, production-grade AI systems.",
    contributions: [
      "Systematic mapping of classical algorithms to modern ML training and inference pipelines",
      "Analysis of algorithmic complexity bottlenecks in large-scale AI workloads",
      "Framework for evaluating algorithmic efficiency in production AI systems",
    ],
    tags: ["Algorithms", "Data Structures", "AI Systems", "ML Infrastructure"],
    status: "Published",
  },
];

const INTERESTS = [
  {
    label: "Cross-lingual NLP",
    detail: "How models transfer knowledge across languages and what internal representations make this possible",
  },
  {
    label: "LLM Interpretability",
    detail: "Probing internal model representations to understand what language models actually learn — and what they don't",
  },
  {
    label: "Multilingual Alignment",
    detail: "Aligning semantic spaces across typologically diverse languages without losing cultural and pragmatic nuance",
  },
  {
    label: "On-device AI",
    detail: "Efficient model compression, quantisation, and deployment strategies for real-world edge constraints",
  },
  {
    label: "Behavioural Signal Processing",
    detail: "Using passive sensing and physiological data to model human wellbeing and detect behavioural patterns",
  },
];

const STATUS_COLORS: Record<Paper["status"], { bg: string; border: string; text: string }> = {
  Published:      { bg: "rgba(74,222,128,0.08)",  border: "rgba(74,222,128,0.22)",  text: "rgba(74,222,128,0.9)"  },
  "In progress":  { bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.22)",  text: "rgba(251,191,36,0.9)"  },
  "Under review": { bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.22)",  text: "rgba(139,92,246,0.9)"  },
};

// ─── Paper card ────────────────────────────────────────────────────────────────
function PaperCard({ paper }: { paper: Paper }) {
  const sc = STATUS_COLORS[paper.status];
  return (
    <motion.div
      variants={itemVariant}
      style={{
        background: "rgba(10,10,14,0.88)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        padding: "28px 28px 24px",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", lineHeight: 1.45, flex: 1 }}>
          {paper.title}
        </p>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(139,92,246,0.65)", whiteSpace: "nowrap" }}>
            {paper.year}
          </span>
          <span
            style={{
              fontSize: "9px",
              fontFamily: "var(--font-pixel), monospace",
              letterSpacing: "0.1em",
              padding: "3px 8px",
              borderRadius: "99px",
              background: sc.bg,
              border: `1px solid ${sc.border}`,
              color: sc.text,
              whiteSpace: "nowrap",
            }}
          >
            {paper.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Abstract */}
      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "20px" }}>
        {paper.abstract}
      </p>

      {/* Contributions */}
      <div style={{ marginBottom: "20px" }}>
        <p
          style={{
            fontSize: "9px",
            fontFamily: "var(--font-pixel), monospace",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          Key Contributions
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
          {paper.contributions.map((c) => (
            <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <span style={{ color: "rgba(139,92,246,0.6)", marginTop: "2px", flexShrink: 0, fontSize: "10px" }}>▸</span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.42)", lineHeight: 1.6 }}>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer: tags + link */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {paper.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "10px",
                padding: "3px 9px",
                borderRadius: "99px",
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.22)",
                color: "rgba(139,92,246,0.85)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {paper.link && (
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              padding: "5px 12px",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "color 0.15s ease, border-color 0.15s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <ExternalLink size={11} />
            Read
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ResearchPage() {
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

      <main className="relative z-10 max-w-2xl mx-auto px-5 pt-24 pb-24">

        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <FadeContent blur duration={600} initialOpacity={0} className="mb-14">
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
            /research
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            <GradientText
              colors={["#c4b5fd", "#8b5cf6", "#a78bfa", "#8b5cf6", "#c4b5fd"]}
              animationSpeed={5}
            >
              Research
            </GradientText>
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: "1.8", maxWidth: "480px" }}>
            My academic work sits at the intersection of{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>natural language processing</span>,{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>multilingual alignment</span>, and{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>model interpretability</span>.
            I am particularly interested in understanding what small language models learn about language structure
            across typologically different languages — and whether that learning is genuinely cross-lingual
            or a surface-level statistical artefact.
          </p>
        </FadeContent>

        {/* ── Research Interests ───────────────────────────────────────────────── */}
        <FadeContent blur duration={600} delay={100} initialOpacity={0} className="mb-14">
          <p
            style={{
              fontSize: "9px",
              fontFamily: "var(--font-pixel), monospace",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            Interests
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-3"
          >
            {INTERESTS.map((interest) => (
              <motion.div
                key={interest.label}
                variants={itemVariant}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  background: "rgba(10,10,14,0.7)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "rgba(139,92,246,0.7)",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                >
                  ◆
                </span>
                <div>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.82)", fontWeight: 500, marginBottom: "3px" }}>
                    {interest.label}
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.32)", lineHeight: 1.65 }}>
                    {interest.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </FadeContent>

        {/* ── Papers ───────────────────────────────────────────────────────────── */}
        <FadeContent blur duration={600} delay={200} initialOpacity={0}>
          <p
            style={{
              fontSize: "9px",
              fontFamily: "var(--font-pixel), monospace",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "18px",
            }}
          >
            Papers
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-5"
          >
            {PAPERS.map((paper) => (
              <PaperCard key={paper.title} paper={paper} />
            ))}
          </motion.div>
        </FadeContent>

      </main>
    </div>
  );
}
