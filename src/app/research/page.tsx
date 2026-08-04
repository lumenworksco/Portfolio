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
    year: "April 2026",
    abstract:
      "Investigates how small Japanese language models represent and handle pragmatic meaning, focusing on areas where general-purpose LLMs often fail Japanese users. Addresses two major gaps: the lack of fine-grained evaluation methods for Japanese small language models beyond broad benchmarks such as JGLUE, and the limited understanding of culturally and pragmatically sensitive phenomena — honorifics, in-group vs. out-group reference, zero anaphora, and indirect refusal. Introduces J-PragEval-v0, a minimal-pair benchmark isolating four core pragmatic phenomena from surface fluency. Using linear probing and teacher-forced log-probability analysis, the study examines how these distinctions are encoded inside TinySwallow-1.5B. Proposes Pragmatic Representation Steering (PRS), a parameter-free inference-time method for steering model behaviour by editing residual-stream activations.",
    contributions: [
      "J-PragEval-v0 — minimal-pair benchmark for four core Japanese pragmatic phenomena",
      "Probing study of TinySwallow-1.5B: honorific register strongly encoded in residual stream; in-group/out-group and zero anaphora resolved dynamically at generation time",
      "Pragmatic Representation Steering (PRS) — parameter-free inference-time steering via residual-stream activation editing",
    ],
    tags: ["NLP", "Japanese", "Pragmatics", "Probing", "Representation Steering", "LLMs"],
    link: "https://doi.org/10.13140/RG.2.2.22007.18088",
    status: "Published",
  },
  {
    title: "The Foundational Role of Data Structures and Algorithms in Artificial Intelligence Systems",
    year: "October 2025",
    abstract:
      "Artificial Intelligence has transformed from a theoretical discipline to a cornerstone of modern technology, powering applications from autonomous vehicles to personalised medicine. At the heart of every AI system lies a carefully orchestrated interplay between data structures and algorithms that determines efficiency, scalability, and capability. Through theoretical analysis and practical case studies, this thesis demonstrates that the selection of appropriate data structures and algorithmic approaches directly impacts AI performance across search, optimisation, machine learning, and knowledge representation. Traces the historical evolution from early symbolic AI relying on tree structures and graph search to modern deep learning architectures utilising tensors and backpropagation — and argues that continued innovation in algorithms remains essential for addressing current AI challenges.",
    contributions: [
      "Systematic mapping of classical algorithms (A*, dynamic programming, graph search) to modern ML training and inference",
      "Historical analysis tracing symbolic AI through to transformer architectures via algorithmic lineage",
      "Concrete examples of how data structure choices affect memory consumption, processing speed, and scalability in real-world AI systems",
    ],
    tags: ["Algorithms", "Data Structures", "AI Systems", "ML Infrastructure", "Thesis"],
    link: "https://doi.org/10.13140/RG.2.2.13838.42566",
    status: "Published",
  },
];

const TOOLKIT = [
  "Python", "PyTorch", "Hugging Face Transformers", "scikit-learn",
  "LangChain", "Claude API", "Linear Algebra", "Linear Probing",
  "Activation Steering", "LaTeX",
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
  Published:      { bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.28)",  text: "rgba(16,185,129,0.9)"  },
  "In progress":  { bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.22)",  text: "rgba(251,191,36,0.9)"  },
  "Under review": { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.22)",  text: "rgba(59,130,246,0.9)"  },
};

// ─── Social link — brand-coloured pill button ─────────────────────────────────
function SocialLink({
  href,
  color,
  label,
  path,
}: {
  href: string;
  color: string;
  label: string;
  path: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "7px 14px",
        borderRadius: "7px",
        background: `${color}12`,
        border: `1px solid ${color}38`,
        textDecoration: "none",
        transition: "background 0.15s ease, border-color 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = `${color}24`;
        (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}6b`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = `${color}12`;
        (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}38`;
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
        <path d={path} />
      </svg>
      <span style={{ fontSize: "11px", color, fontWeight: 500, letterSpacing: "0.02em" }}>
        {label}
      </span>
    </a>
  );
}

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
          <span style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(16,185,129,0.65)", whiteSpace: "nowrap" }}>
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
              <span style={{ color: "rgba(16,185,129,0.6)", marginTop: "2px", flexShrink: 0, fontSize: "10px" }}>▸</span>
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
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.22)",
                color: "rgba(16,185,129,0.85)",
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
          colorStops={["#064e3b", "#059669", "#047857"]}
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
              colors={["#6ee7b7", "#10b981", "#34d399", "#10b981", "#6ee7b7"]}
              animationSpeed={5}
            >
              Research
            </GradientText>
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: "1.8", maxWidth: "480px", marginBottom: "20px" }}>
            My academic work sits at the intersection of{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>natural language processing</span>,{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>multilingual alignment</span>, and{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>model interpretability</span>.
            I am particularly interested in understanding what small language models learn about language structure
            across typologically different languages — and whether that learning is genuinely cross-lingual
            or a surface-level statistical artefact.
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            <SocialLink
              href="https://www.researchgate.net/profile/Florian-Braun-14"
              color="#00CC88"
              label="ResearchGate ↗"
              path="M19.586 0H4.414A4.414 4.414 0 0 0 0 4.414v15.172A4.414 4.414 0 0 0 4.414 24h15.172A4.414 4.414 0 0 0 24 19.586V4.414A4.414 4.414 0 0 0 19.586 0zM9.5 7.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm4.75 9.25H9.75v-7h4.5v7z"
            />
            <SocialLink
              href="https://github.com/ipwnds"
              color="#e5e5e5"
              label="GitHub ↗"
              path="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
            />
            <SocialLink
              href="https://www.linkedin.com/in/braunflorian25/"
              color="#0A66C2"
              label="LinkedIn ↗"
              path="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </div>
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
                    color: "rgba(16,185,129,0.7)",
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

        {/* ── Toolkit ───────────────────────────────────────────────────────────── */}
        <FadeContent blur duration={600} delay={150} initialOpacity={0} className="mb-14">
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
            Toolkit
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-wrap gap-2"
          >
            {TOOLKIT.map((tool) => (
              <motion.span
                key={tool}
                variants={itemVariant}
                style={{
                  fontSize: "11px",
                  padding: "5px 12px",
                  borderRadius: "99px",
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.18)",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </FadeContent>

        {/* ── Papers ───────────────────────────────────────────────────────────── */}
        <FadeContent blur duration={600} delay={200} initialOpacity={0} className="mb-14">
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

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <motion.footer
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center pt-8 mt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-center gap-3 flex-wrap mb-5">
            <a
              href="/contact"
              style={{
                display: "inline-block",
                padding: "9px 22px 8px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                fontSize: "9px",
                fontFamily: "var(--font-pixel), monospace",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textDecoration: "none",
                transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.16)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.09)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
              }}
            >
              ✉ GET IN TOUCH
            </a>
            <Link
              href="/portfolio"
              style={{
                display: "inline-block",
                padding: "9px 22px 8px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                fontSize: "9px",
                fontFamily: "var(--font-pixel), monospace",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textDecoration: "none",
                transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.16)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.09)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)";
              }}
            >
              VIEW PORTFOLIO
            </Link>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "11px",
              fontFamily: "var(--font-pixel), monospace",
              letterSpacing: "0.1em",
            }}
          >
            braunf.com · {new Date().getFullYear()}
          </p>
        </motion.footer>

      </main>
    </div>
  );
}
