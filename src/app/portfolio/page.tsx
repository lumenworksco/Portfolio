"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { GitHubActivity } from "@/components/GitHubActivity";
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
      style={{ color: "#10b981" }}
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
        background: "rgba(16, 185, 129, 0.1)",
        border: "1px solid rgba(16, 185, 129, 0.25)",
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
            style={{ background: i < bars ? "rgba(16, 185, 129, 0.85)" : "rgba(255,255,255,0.08)" }}
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
      style={{ borderLeft: "2px solid rgba(16, 185, 129, 0.25)" }}
    >
      <div
        className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full"
        style={{ background: "#10b981" }}
      />
      <p className="text-sm font-semibold text-white leading-snug">{title}</p>
      <p className="text-xs mt-0.5" style={{ color: "#10b981", opacity: 0.85 }}>{org}</p>
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

// ─── Research card ─────────────────────────────────────────────────────────────
function ResearchCard({
  title, year, abstract, tags,
}: {
  title: string; year: string; abstract: string; tags: string[];
}) {
  return (
    <motion.div
      variants={itemVariant}
      className="rounded-xl p-5"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <p className="text-sm font-semibold text-white leading-snug">{title}</p>
        <span
          className="text-[10px] font-mono shrink-0 mt-0.5"
          style={{ color: "rgba(16,185,129,0.65)" }}
        >
          {year}
        </span>
      </div>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.42)" }}>
        {abstract}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.22)",
              color: "rgba(16,185,129,0.85)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
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
          style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.25)", color: "rgba(16,185,129,0.9)" }}
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
        <Aurora colorStops={["#064e3b", "#059669", "#047857"]} speed={0.5} amplitude={0.9} />
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
                colors={["#6ee7b7", "#10b981", "#34d399", "#10b981", "#6ee7b7"]}
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
            <div className="flex items-center gap-1.5 mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              <MapPin size={13} />
              <span className="text-xs font-mono">Leuven, Belgium</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { flag: "🇳🇱", lang: "Dutch",    note: "Native" },
                { flag: "🇫🇷", lang: "French",   note: "Native" },
                { flag: "🇬🇧", lang: "English",  note: "C1"     },
                { flag: "🇩🇪", lang: "German",   note: "A2"     },
                { flag: "🇯🇵", lang: "Japanese", note: "N5"     },
                { flag: "🇪🇸", lang: "Spanish",  note: "A1"     },
              ].map(({ flag, lang, note }) => (
                <span
                  key={lang}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 10px",
                    borderRadius: "99px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span style={{ fontSize: "13px", lineHeight: 1 }}>{flag}</span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>{lang}</span>
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", fontFamily: "monospace" }}>{note}</span>
                </span>
              ))}
            </div>
            <div
              className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4"
              style={{
                padding: "7px 13px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.1)",
              }}
            >
              <span
                style={{
                  fontSize: "9px",
                  fontFamily: "monospace",
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                OFF DUTY
              </span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
                📷 Film photography
              </span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
                ⌚ Collecting mechanical watches
              </span>
            </div>
          </div>
        </FadeContent>

        {/* ── Experience ────────────────────────────────────────────────────── */}
        <Section className="mb-14">
          <SectionHeading>Experience</SectionHeading>
          <div className="flex flex-col gap-7">
            <TimelineItem title="Information Technology" org="NEXT Leuven" period="May 2026 – Present">
              Part of the IT team at NEXT Leuven, one of Belgium&apos;s largest student
              entrepreneurship organisations — connecting students with startups, scale-ups,
              and industry through flagship events like the Next Level Challenge and MedTech
              Convention. Manages and maintains the technical infrastructure and internal
              tooling powering operations across large-scale student initiatives.
            </TimelineItem>
            <TimelineItem title="Security Consultant" org="i-Force" period="Apr 2026 – Jun 2026">
              Conducted covert security assessments at Brussels Airport Zaventem, testing the
              effectiveness of security protocols and staff vigilance across checkpoints and
              restricted zones. Evaluated compliance with security procedures, identified
              potential vulnerabilities, and submitted detailed reports to support continuous
              improvement of airport security operations.
            </TimelineItem>
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
            <TimelineItem title="Founder" org="Studio Grain" period="Ongoing">
              Runs a photography business balancing creative vision with business execution —
              one of two ventures pursued alongside technical and academic work.
            </TimelineItem>
            <TimelineItem title="Founder" org="Pulse Watch Co." period="Ongoing">
              Runs a luxury watch business, building practical experience in creative and
              commercial execution outside of pure software.
            </TimelineItem>
          </div>
        </Section>

        {/* ── Organisations & Volunteering ─────────────────────────────────────── */}
        <Section className="mb-14">
          <SectionHeading>Organisations &amp; Volunteering</SectionHeading>
          <div className="flex flex-col gap-7">
            <TimelineItem title="Head of Events" org="Insignia — UCLL International Student Association" period="Jul 2025 – Dec 2025">
              Led event planning and coordination for UCLL&apos;s international student association.
            </TimelineItem>
            <TimelineItem title="Social Media Manager" org="Insignia — UCLL International Student Association" period="Sep 2024 – Jun 2025">
              Managed online presence, content creation, and community engagement.
            </TimelineItem>
            <TimelineItem title="Head of Logistics" org="Insignia's Culture Fest" period="Oct 2025 – Present">
              Leads logistics and coordination for Insignia&apos;s flagship cultural festival.
            </TimelineItem>
            <TimelineItem title="Head of IT Department" org="Pupils' Committee — European School of Luxembourg 1" period="Sep 2022 – Jun 2023">
              Led all IT operations, specialising in website development and ensuring smooth
              digital functionality across the organisation.
            </TimelineItem>
            <TimelineItem title="Front-End Developer" org="Pupils' Committee Sports — European School of Luxembourg 1" period="Nov 2022 – Jun 2023">
              Built and maintained the front-end of the Pupils&apos; Committee Sports website.
            </TimelineItem>
            <TimelineItem title="Founder & President" org="ESL1 IT Club" period="Feb 2022 – Feb 2023">
              Founded and led the IT Club at European School of Luxembourg 1, organising
              workshops, coordinating projects, and mentoring peers in IT skills.
            </TimelineItem>
            <TimelineItem title="Student Representative" org="Digital Teaching &amp; Learning Working Group" period="Jan 2023 – Jun 2023">
              Represented students in integrating digitalisation into courses and the broader
              education system at European School of Luxembourg 1.
            </TimelineItem>
            <TimelineItem title="Guitarist" org="Guitar Orchestra — Conservatoire de la Ville de Luxembourg" period="Sep 2017 – Jun 2020">
              Performed in regular rehearsals and concerts alongside formal guitar and music
              theory study.
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
            <TimelineItem title="BSc Computer Science" org="KU Leuven" period="Sep 2023 – Sep 2024" />
            <TimelineItem title="Linear Algebra — International Summer Program" org="Korea University" period="Jun 2026 – Jul 2026" />
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
                "React / Next.js", "Flutter", "HTML / CSS / JavaScript",
                "Cybersecurity", "Network Security",
                "Docker", "PostgreSQL", "Git",
                "Linear Algebra", "Least Squares Methods", "Eigenvalue Analysis",
                "Rapid Prototyping",
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
              <BadgeCard label="Data Engineer" sub="DataCamp" />
              <BadgeCard label="Python Data Associate" sub="DataCamp" />
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

        {/* ── GitHub Activity ───────────────────────────────────────────────── */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14"
        >
          <motion.h2
            variants={fadeUp}
            className="text-xs font-mono tracking-[0.25em] uppercase mb-6"
            style={{ color: "#10b981" }}
          >
            GitHub Activity
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="rounded-xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <GitHubActivity />
          </motion.div>
        </motion.section>

        {/* ── Research ──────────────────────────────────────────────────────── */}
        <Section className="mb-14">
          <SectionHeading>Research</SectionHeading>

          {/* Interests */}
          <motion.div variants={itemVariant} className="flex flex-wrap gap-2 mb-8">
            {[
              "Cross-lingual NLP",
              "LLM Interpretability",
              "Multilingual Alignment",
              "On-device AI",
              "Behavioural Signal Processing",
            ].map((interest) => (
              <span
                key={interest}
                style={{
                  display: "inline-block",
                  padding: "4px 11px",
                  borderRadius: "99px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {interest}
              </span>
            ))}
          </motion.div>

          {/* Papers */}
          <div className="flex flex-col gap-4">
            <ResearchCard
              title="Interpretable Cross-Lingual Alignment in Small Language Models: Probing Cultural and Pragmatic Reasoning in Japanese-English Bilingual LLMs"
              year="April 2026"
              abstract="Introduces J-PragEval-v0, a minimal-pair benchmark for four core Japanese pragmatic phenomena, and probes how TinySwallow-1.5B encodes honorifics, zero anaphora, in-group reference, and indirect refusal. Proposes Pragmatic Representation Steering (PRS), a parameter-free inference-time steering method via residual-stream activation editing."
              tags={["NLP", "Japanese", "Pragmatics", "Probing", "Representation Steering"]}
            />
            <ResearchCard
              title="The Foundational Role of Data Structures and Algorithms in Artificial Intelligence Systems"
              year="October 2025"
              abstract="Through theoretical analysis and practical case studies, demonstrates that data structure and algorithm selection directly impacts AI performance across search, optimisation, and machine learning — tracing the algorithmic lineage from symbolic AI to modern transformer architectures."
              tags={["Algorithms", "Data Structures", "AI Systems", "ML Infrastructure", "Thesis"]}
            />
          </div>

          {/* Link to full research page */}
          <motion.div variants={itemVariant} className="mt-5">
            <Link
              href="/research"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                color: "rgba(16,185,129,0.6)",
                textDecoration: "none",
                transition: "color 0.15s ease",
                fontFamily: "monospace",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(16,185,129,1)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(16,185,129,0.6)")}
            >
              View all research →
            </Link>
          </motion.div>
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
          }}
        >
          <a
            href="/contact"
            style={{
              display: "inline-block",
              marginBottom: "20px",
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
