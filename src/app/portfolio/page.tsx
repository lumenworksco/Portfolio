"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import Aurora from "@/components/ui/Aurora";
import GradientText from "@/components/ui/GradientText";
import FadeContent from "@/components/ui/FadeContent";

// ─── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      variants={fadeUp}
      className="text-xs font-mono tracking-[0.25em] uppercase mb-6"
      style={{ color: "#8b5cf6" }}
    >
      {children}
    </motion.h2>
  );
}

// ─── Skill pill ───────────────────────────────────────────────────────────────
function SkillPill({ label }: { label: string }) {
  return (
    <motion.span
      variants={itemVariant}
      className="inline-block text-xs px-3 py-1.5 rounded-full"
      style={{
        background: "rgba(139, 92, 246, 0.1)",
        border: "1px solid rgba(139, 92, 246, 0.25)",
        color: "rgba(255,255,255,0.75)",
      }}
    >
      {label}
    </motion.span>
  );
}

// ─── Language bar ─────────────────────────────────────────────────────────────
function LangBar({ lang, level, bars }: { lang: string; level: string; bars: number }) {
  return (
    <motion.div variants={itemVariant} className="flex items-center gap-3">
      <span className="text-sm w-20 shrink-0" style={{ color: "rgba(255,255,255,0.75)" }}>
        {lang}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-2 rounded-sm"
            style={{ background: i < bars ? "rgba(139, 92, 246, 0.85)" : "rgba(255,255,255,0.08)" }}
          />
        ))}
      </div>
      <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{level}</span>
    </motion.div>
  );
}

// ─── Timeline entry ───────────────────────────────────────────────────────────
function TimelineItem({
  title,
  org,
  period,
  children,
}: {
  title: string;
  org: string;
  period: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      variants={itemVariant}
      className="relative pl-5"
      style={{ borderLeft: "2px solid rgba(139, 92, 246, 0.25)" }}
    >
      <div
        className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full"
        style={{ background: "#8b5cf6" }}
      />
      <p className="text-sm font-semibold text-white leading-snug">{title}</p>
      <p className="text-xs mt-0.5" style={{ color: "#8b5cf6", opacity: 0.85 }}>{org}</p>
      <p className="text-[11px] mt-0.5 font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>{period}</p>
      {children && (
        <div className="mt-2 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          {children}
        </div>
      )}
    </motion.div>
  );
}

// ─── Badge card ───────────────────────────────────────────────────────────────
function BadgeCard({ label, sub }: { label: string; sub?: string }) {
  return (
    <motion.div
      variants={itemVariant}
      className="rounded-xl p-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <p className="text-sm text-white leading-snug">{label}</p>
      {sub && <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{sub}</p>}
    </motion.div>
  );
}

// ─── Publication card ─────────────────────────────────────────────────────────
function PubCard({ title, year }: { title: string; year: string }) {
  return (
    <motion.div
      variants={itemVariant}
      className="rounded-xl p-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <p className="text-sm text-white leading-snug">{title}</p>
      <p className="text-xs mt-1 font-mono" style={{ color: "rgba(139,92,246,0.6)" }}>{year} · Independent Research Paper</p>
    </motion.div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ title, period, tag, children }: { title: string; period: string; tag?: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={itemVariant}
      className="rounded-xl p-4"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-sm font-semibold text-white leading-snug">{title}</p>
        <span className="text-[10px] font-mono shrink-0" style={{ color: "rgba(255,255,255,0.25)" }}>{period}</span>
      </div>
      {tag && (
        <span
          className="inline-block text-[10px] px-2 py-0.5 rounded-full mb-2"
          style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)", color: "rgba(139,92,246,0.9)" }}
        >
          {tag}
        </span>
      )}
      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{children}</p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: "#060608" }}>
      {/* Aurora */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora colorStops={["#6d28d9", "#7c3aed", "#4f46e5"]} speed={0.5} amplitude={0.9} />
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(6,6,8,0.65) 100%)" }}
      />

      {/* Back button */}
      <Link
        href="/"
        className="fixed top-5 left-5 z-20 flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-opacity hover:opacity-100"
        style={{ color: "rgba(255,255,255,0.35)", opacity: 0.6 }}
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <main className="relative z-10 max-w-3xl mx-auto px-5 pt-20 pb-24">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <FadeContent blur duration={600} initialOpacity={0} className="mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              <GradientText
                colors={["#c4b5fd", "#8b5cf6", "#a78bfa", "#8b5cf6", "#c4b5fd"]}
                animationSpeed={5}
              >
                Florian Braun
              </GradientText>
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-4 max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
              Exploring the Intersection of AI &amp; Entrepreneurship
              <br />
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9em" }}>
                Aspiring Researcher in LLMs and NLP
              </span>
            </p>
            <div className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
              <MapPin size={13} />
              <span className="text-xs font-mono">Leuven, Belgium</span>
            </div>
          </div>
        </FadeContent>

        {/* ── Experience ────────────────────────────────────────────────────── */}
        <Section className="mb-14">
          <SectionHeading>Experience</SectionHeading>
          <div className="flex flex-col gap-7">
            <TimelineItem title="IT" org="NEXT Leuven" period="May 2026 – Present" />
            <TimelineItem title="Mystery Shopper" org="i-Force" period="Apr 2026 – Present" />
            <TimelineItem title="Co-Founder & CTO" org="CalmCampus" period="Jan 2026 – Present">
              Co-founded a privacy-first student wellbeing platform through the KU Leuven KICK
              Challenge, in collaboration with KU Leuven STUVO. Identifies burnout risk through
              passive behavioural signals and on-device AI — without individual surveillance. Lead
              technical development: data strategy, AI/ML approach, privacy-by-design architecture,
              and GDPR-conscious data handling.
            </TimelineItem>
            <TimelineItem title="Co-Founder & Lead Engineer" org="Lumen Studio" period="Oct 2023 – Present">
              Product-focused tech studio building own apps — full stack from idea to production.
              Engineering lead across the full product build cycle: ideation, technical planning,
              development, testing, release, and iteration. End-to-end across the stack: back-end
              services and APIs, front-end experiences, infrastructure, deployments, and
              performance optimisation.
            </TimelineItem>
            <TimelineItem title="Head of Events" org="Insignia — UCLL International Student Association" period="Jul 2025 – Dec 2025">
              Led event planning and coordination for UCLL's international student association.
            </TimelineItem>
            <TimelineItem title="Social Media Manager" org="Insignia — UCLL International Student Association" period="Sep 2024 – Jun 2025">
              Managed online presence, content creation, and community engagement.
            </TimelineItem>
            <TimelineItem title="Head of IT Department" org="Pupils' Committee — European School of Luxembourg 1" period="Sep 2022 – Jun 2023">
              Led all IT operations, specialising in website development and ensuring smooth
              digital functionality across the organisation.
            </TimelineItem>
          </div>
        </Section>

        {/* ── Projects ──────────────────────────────────────────────────────── */}
        <Section className="mb-14">
          <SectionHeading>Projects & Hackathons</SectionHeading>
          <div className="flex flex-col gap-4">
            <ProjectCard title="NeuroMedix Hackathon" period="Mar 2026" tag="Finalist">
              Decoded EEG brain signals using machine learning and translated them into tangible,
              interpretable outputs. Reached the finals with a team of 3–4 on a sponsor-defined
              case at the intersection of neuroscience and AI.
            </ProjectCard>
            <ProjectCard title="Next Level Challenge" period="Mar 2026">
              24-hour hackathon organised by NEXT Leuven on a real-world case by InvestSuite.
              Built an AI-powered investment app using the Claude API that dynamically adapts its
              interface and recommendations to the individual user. Scored 80/100 overall (40/50
              technical, 40/50 business) — jury feedback highlighted great design and strong
              product thinking.
            </ProjectCard>
            <ProjectCard title="European Synbio Hackathon" period="Nov 2024">
              EU-wide online hackathon focused on innovation in synthetic biology. Competed in the
              Agrifood &amp; Nutrition track, developing a nutrition app leveraging biotechnology
              to advance sustainable food and agriculture. Pitched to a jury of academics, industry
              leaders, and investors.
            </ProjectCard>
          </div>
        </Section>

        {/* ── Education ─────────────────────────────────────────────────────── */}
        <Section className="mb-14">
          <SectionHeading>Education</SectionHeading>
          <div className="flex flex-col gap-7">
            <TimelineItem title="BASc Applied Computer Science" org="UCLL University of Applied Sciences" period="2024 – 2027">
              Main degree — software engineering, AI, data engineering.
            </TimelineItem>
            <TimelineItem title="Japanese Language Program" org="KU Leuven" period="Feb 2026 – Dec 2026" />
            <TimelineItem title="Finance (Non-Degree Program)" org="Yale University" period="Jan 2026 – Jun 2026" />
            <TimelineItem title="CS50: Introduction to Computer Science" org="Harvard University" period="Sep 2024 – Dec 2024" />
            <TimelineItem title="BSc Computer Science" org="KU Leuven" period="2023 – 2024" />
            <TimelineItem title="European Baccalaureate" org="European School of Luxembourg 1" period="2012 – 2023" />
            <TimelineItem title="Certificate in Guitar & Music Theory" org="Conservatoire de la Ville de Luxembourg" period="2014 – 2021" />
          </div>
        </Section>

        {/* ── Skills + Languages ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          <Section>
            <SectionHeading>Skills</SectionHeading>
            <motion.div variants={staggerContainer} className="flex flex-wrap gap-2">
              {[
                "Python", "TypeScript", "Rust",
                "PyTorch", "Hugging Face", "LangChain", "Claude API",
                "NLP / LLMs", "Sentiment Analysis", "scikit-learn",
                "Data Engineering", "pandas", "NumPy", "SQL",
                "React / Next.js", "Flutter",
                "Cybersecurity", "Network Security",
                "Docker", "PostgreSQL", "Git",
                "Product Strategy", "Project Management",
              ].map((s) => (
                <SkillPill key={s} label={s} />
              ))}
            </motion.div>
          </Section>

          <Section>
            <SectionHeading>Languages</SectionHeading>
            <div className="flex flex-col gap-3">
              <LangBar lang="Dutch"    level="Native"           bars={5} />
              <LangBar lang="French"   level="Native"           bars={5} />
              <LangBar lang="English"  level="Full Professional" bars={4} />
              <LangBar lang="German"   level="Elementary"       bars={2} />
              <LangBar lang="Japanese" level="Elementary"       bars={2} />
              <LangBar lang="Spanish"  level="Elementary"       bars={1} />
            </div>
          </Section>
        </div>

        {/* ── Certifications + Awards ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          <Section>
            <SectionHeading>Certifications</SectionHeading>
            <div className="flex flex-col gap-3">
              <BadgeCard label="Bloomberg Market Concepts" sub="Bloomberg" />
              <BadgeCard label="Developing LLM Applications with LangChain" sub="DataCamp" />
              <BadgeCard label="Intermediate Deep Learning with PyTorch" sub="DataCamp" />
              <BadgeCard label="AI Fundamentals" sub="DataCamp" />
              <BadgeCard label="GitHub Foundations" sub="DataCamp" />
              <BadgeCard label="Pre Security Certificate" sub="TryHackMe" />
              <BadgeCard label="Advent of Cyber 2025" sub="TryHackMe" />
              <BadgeCard label="IPv6 Sage Certification" sub="Hurricane Electric" />
            </div>
          </Section>

          <Section>
            <SectionHeading>Awards</SectionHeading>
            <div className="flex flex-col gap-3">
              <BadgeCard
                label="Finalist · Top 50"
                sub="Future of IT Leaders: Data & AI Challenge 2025 — Editx"
              />
              <BadgeCard
                label="Selected Participant"
                sub="KU Leuven KICK Challenge 2026"
              />
            </div>
          </Section>
        </div>

        {/* ── Publications ──────────────────────────────────────────────────── */}
        <Section className="mb-14">
          <SectionHeading>Publications</SectionHeading>
          <div className="flex flex-col gap-4">
            <PubCard
              title="Interpretable Cross-Lingual Alignment in Small Language Models: Probing Cultural and Pragmatic Reasoning in Japanese-English Bilingual LLMs"
              year="2026"
            />
            <PubCard
              title="The Foundational Role of Data Structures and Algorithms in Artificial Intelligence Systems"
              year="Oct 2025"
            />
          </div>
        </Section>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <motion.footer
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center pt-8"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.2)",
            fontSize: "11px",
            fontFamily: "var(--font-pixel), monospace",
            letterSpacing: "0.1em",
          }}
        >
          braunf.com · {new Date().getFullYear()}
        </motion.footer>
      </main>
    </div>
  );
}
