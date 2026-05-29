"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code2, Brain } from "lucide-react";
import Link from "next/link";
import Aurora from "@/components/ui/Aurora";
import SpotlightCard from "@/components/ui/SpotlightCard";
import GradientText from "@/components/ui/GradientText";
import FadeContent from "@/components/ui/FadeContent";

type CardId = "lumen" | "portfolio" | "calm";

const POKEDEX_RED = "#CC0000";

interface Card {
  id: CardId;
  title: string;
  subtitle: string;
  pokemonType: string;
  typeColor: string;
  description: string;
  href: string | null;
  available: boolean;
  accentColor: string;
  spotlightColor: `rgba(${number}, ${number}, ${number}, ${number})`;
  gradientColors: string[];
}

const cards: Card[] = [
  {
    id: "lumen",
    title: "Lumen Studio",
    subtitle: "Tech Studio",
    pokemonType: "FIRE",
    typeColor: "#EE8130",
    description:
      "A product-focused tech studio building our own apps — full stack, end to end, from idea to production. I lead engineering and the full product build cycle alongside a co-founder who handles business and design.",
    href: "https://lumen.braunf.com",
    available: true,
    accentColor: "#f59e0b",
    spotlightColor: "rgba(245, 158, 11, 0.4)",
    gradientColors: ["#fde68a", "#f59e0b", "#fbbf24", "#f59e0b", "#fde68a"],
  },
  {
    id: "portfolio",
    title: "Portfolio",
    subtitle: "Personal Space",
    pokemonType: "PSYCHIC",
    typeColor: "#F95587",
    description:
      "A personal portfolio showcasing projects, experience, and the journey of a developer.",
    href: "/portfolio",
    available: true,
    accentColor: "#10b981",
    spotlightColor: "rgba(16, 185, 129, 0.2)",
    gradientColors: ["#6ee7b7", "#10b981", "#34d399", "#10b981", "#6ee7b7"],
  },
  {
    id: "calm",
    title: "CalmCampus",
    subtitle: "Student Wellbeing",
    pokemonType: "GRASS",
    typeColor: "#7AC74C",
    description:
      "A privacy-first student wellbeing platform using passive behavioural signals and on-device AI to help universities support students before stress becomes a crisis — without surveillance.",
    href: "https://calm.braunf.com",
    available: true,
    accentColor: "#84cc16",
    spotlightColor: "rgba(132, 204, 22, 0.3)",
    gradientColors: ["#d9f99d", "#84cc16", "#bef264", "#84cc16", "#d9f99d"],
  },
];

const cardIcons: Record<CardId, React.ReactElement> = {
  lumen: <Sparkles size={30} />,
  portfolio: <Code2 size={30} />,
  calm: <Brain size={30} />,
};

// ─── Pokémon Type Badge ────────────────────────────────────────────────────────
function TypeBadge({ type, color }: { type: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px 2px",
        borderRadius: "4px",
        background: color,
        color: "#fff",
        fontSize: "8px",
        fontFamily: "var(--font-pixel), monospace",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        lineHeight: "1.8",
        boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.25)",
      }}
    >
      {type}
    </span>
  );
}

// ─── Professor Dialog Box ──────────────────────────────────────────────────────
function DialogBox({
  children,
  showCursor = false,
}: {
  children: React.ReactNode;
  showCursor?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        background: "rgba(8, 8, 12, 0.92)",
        border: "3px solid rgba(255,255,255,0.85)",
        borderRadius: "8px",
        padding: "14px 20px",
        boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.08), 0 4px 32px rgba(0,0,0,0.6)",
      }}
    >
      {children}
      {showCursor && (
        <span
          className="dialog-cursor"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "16px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "10px",
            fontFamily: "var(--font-pixel), monospace",
          }}
        >
          ▼
        </span>
      )}
    </div>
  );
}

// ─── Card entrance variants ────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: 0.35 + i * 0.14, ease: "easeOut" as const },
  }),
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SelectPage() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<CardId | null>(null);
  const [selectedId, setSelectedId] = useState<CardId | null>(null);
  const [navigatingToPokedex, setNavigatingToPokedex] = useState(false);

  // Backtick easter egg → terminal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        router.push("/terminal");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  const selectedCard = cards.find((c) => c.id === selectedId) ?? null;

  const handleSelect = useCallback(
    (card: Card) => {
      if (!card.available || selectedId !== null || navigatingToPokedex) return;
      setSelectedId(card.id);
      if (card.href) {
        const isInternal = card.href.startsWith("/");
        setTimeout(() => {
          if (isInternal) {
            router.push(card.href!);
          } else {
            window.location.href = card.href!;
          }
        }, 700);
      }
    },
    [selectedId, navigatingToPokedex, router]
  );

  const handlePokedex = useCallback(() => {
    if (selectedId !== null || navigatingToPokedex) return;
    setNavigatingToPokedex(true);
    setTimeout(() => router.push("/pokedex"), 700);
  }, [selectedId, navigatingToPokedex, router]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "#060608" }}>
      {/* Aurora WebGL background */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#b45309", "#7c3aed", "#059669"]}
          speed={0.6}
          amplitude={1.1}
        />
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(6,6,8,0.55) 100%)",
        }}
      />

      {/* Card selection flash — white */}
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            key="flash"
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ background: "#fff" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.7, times: [0, 0.2, 1], ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Pokédex navigation flash — red */}
      <AnimatePresence>
        {navigatingToPokedex && (
          <motion.div
            key="pokedex-flash"
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ background: POKEDEX_RED }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.82, 0] }}
            transition={{ duration: 0.7, times: [0, 0.2, 1], ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 md:py-16 gap-5 md:gap-8">
        {/* Professor dialog header */}
        <FadeContent blur duration={650} initialOpacity={0} className="w-full max-w-4xl">
          <DialogBox showCursor>
            <p
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 600,
                color: "rgba(255,255,255,0.38)",
                marginBottom: "8px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Prof. Braun
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.85)",
                lineHeight: "1.6",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                whiteSpace: undefined,
              }}
            >
              These three are no ordinary Pokémon — each one rare in its own right.{" "}
              <span style={{ color: "#fff", fontWeight: 600 }}>Which will you choose?</span>
            </p>
          </DialogBox>
        </FadeContent>

        {/* Card grid */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full max-w-4xl">
          {cards.map((card, i) => {
            const isSelected = selectedId === card.id;
            const isOther = (selectedId !== null && !isSelected) || navigatingToPokedex;
            const isHovered = hoveredId === card.id && selectedId === null && !navigatingToPokedex;

            return (
              <motion.div
                key={card.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="flex-1"
                style={{ position: "relative" }}
              >
                <motion.div
                  onHoverStart={() => card.available && setHoveredId(card.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => handleSelect(card)}
                  animate={{
                    scale: isSelected ? 1.04 : isOther ? 0.93 : isHovered ? 1.025 : 1,
                    opacity: isOther ? 0.2 : 1,
                    y: isHovered ? -10 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    cursor: card.available ? "pointer" : "not-allowed",
                    height: "100%",
                  }}
                >
                  <SpotlightCard
                    spotlightColor={card.available ? card.spotlightColor : "rgba(80, 80, 80, 0.08)"}
                    className="flex flex-col h-full"
                    style={{
                      minHeight: "clamp(260px, 40vw, 370px)",
                      border: `1px solid ${
                        isSelected
                          ? card.accentColor
                          : isHovered
                          ? card.accentColor + "80"
                          : "#1e1e24"
                      }`,
                      boxShadow: isSelected
                        ? `0 0 50px ${card.accentColor}50, 0 0 120px ${card.accentColor}20`
                        : isHovered
                        ? `0 0 28px ${card.accentColor}30`
                        : "none",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                      background: card.available
                        ? "rgba(10,10,14,0.88)"
                        : "rgba(10,10,14,0.6)",
                    }}
                  >
                    {/* Corner glow */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-30px",
                        left: "-30px",
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                        background: card.accentColor,
                        opacity: isHovered || isSelected ? 0.07 : 0.025,
                        filter: "blur(40px)",
                        transition: "opacity 0.4s ease",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Icon */}
                    <motion.div
                      animate={
                        isSelected
                          ? { scale: [1, 1.3, 0.9, 1.1, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      style={{
                        color: card.available ? card.accentColor : "#555",
                        marginBottom: "24px",
                        filter: isHovered
                          ? `drop-shadow(0 0 10px ${card.accentColor}90)`
                          : "none",
                        transition: "filter 0.3s ease",
                        display: "inline-block",
                      }}
                    >
                      {cardIcons[card.id]}
                    </motion.div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold mb-1">
                      <GradientText
                        colors={
                          card.available
                            ? card.gradientColors
                            : ["#4a4a55", "#3a3a44", "#4a4a55"]
                        }
                        animationSpeed={5}
                      >
                        {card.title}
                      </GradientText>
                    </h2>

                    {/* Subtitle + type badge */}
                    <div className="flex items-center gap-2 mb-5" style={{ flexWrap: "wrap" }}>
                      <p
                        className="text-[10px] font-mono tracking-[0.2em] uppercase"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {card.subtitle}
                      </p>
                      <TypeBadge
                        type={card.pokemonType}
                        color={card.available ? card.typeColor : "#3f3f46"}
                      />
                    </div>

                    {/* Accent line */}
                    <div
                      style={{
                        width: isHovered || isSelected ? "48px" : "24px",
                        height: "1px",
                        background: card.available ? card.accentColor : "#333",
                        marginBottom: "18px",
                        transition: "width 0.4s ease",
                        opacity: card.available ? 1 : 0.4,
                      }}
                    />

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{
                        color: card.available
                          ? "rgba(255,255,255,0.55)"
                          : "rgba(255,255,255,0.22)",
                      }}
                    >
                      {card.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-7">
                      {card.available ? (
                        <span
                          style={{
                            fontSize: "11px",
                            fontFamily: "var(--font-pixel), monospace",
                            color: card.accentColor,
                            opacity: isHovered ? 1 : 0.65,
                            transition: "opacity 0.3s ease",
                            letterSpacing: "0.04em",
                          }}
                        >
                          ▶ CHOOSE
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: "8px",
                            fontFamily: "var(--font-pixel), monospace",
                            color: "rgba(255,255,255,0.2)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            padding: "4px 10px 3px",
                            borderRadius: "4px",
                            letterSpacing: "0.04em",
                          }}
                        >
                          COMING SOON
                        </span>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Side projects */}
        <FadeContent blur duration={600} delay={1100} initialOpacity={0} className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 px-1">
            <button
              onClick={handlePokedex}
              style={{
                fontSize: "8px",
                fontFamily: "var(--font-pixel), monospace",
                color: POKEDEX_RED,
                letterSpacing: "0.06em",
                background: "rgba(204,0,0,0.08)",
                border: "1px solid rgba(204,0,0,0.2)",
                borderRadius: "5px",
                padding: "5px 12px 4px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                flexShrink: 0,
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(204,0,0,0.16)";
                el.style.borderColor = "rgba(204,0,0,0.38)";
                el.style.boxShadow = "0 0 14px rgba(204,0,0,0.22)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(204,0,0,0.08)";
                el.style.borderColor = "rgba(204,0,0,0.2)";
                el.style.boxShadow = "none";
              }}
            >
              ▶ POKÉDEX
            </button>
            <div className="hidden md:block" style={{ height: "1px", background: "rgba(255,255,255,0.07)", flex: 1 }} />
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px" }}>
              {/* Contact */}
              <Link
                href="/contact"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "7px 12px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.14)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 500, margin: 0 }}>
                  Contact
                </p>
              </Link>
              {/* Uses */}
              <Link
                href="/uses"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "7px 12px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.14)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 500, margin: 0 }}>
                  Uses
                </p>
              </Link>
              {/* Research */}
              <Link
                href="/research"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "9px 18px",
                  borderRadius: "6px",
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.35)",
                  textDecoration: "none",
                  boxShadow: "0 0 16px rgba(16,185,129,0.12)",
                  transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(16,185,129,0.18)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(16,185,129,0.6)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 24px rgba(16,185,129,0.28)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(16,185,129,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(16,185,129,0.35)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 16px rgba(16,185,129,0.12)";
                }}
              >
                <p style={{ fontSize: "12px", color: "rgba(52,211,153,0.95)", fontWeight: 600, margin: 0, letterSpacing: "0.01em" }}>
                  Research
                </p>
              </Link>
              {/* IoT */}
              <a
                href="https://iot.braunf.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "7px 12px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.14)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 500, margin: 0 }}>
                  IoT Lab ↗
                </p>
              </a>
              {/* Nihongo */}
              <a
                href="https://nihongo.braunf.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "7px 14px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.14)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <span style={{ fontSize: "13px", lineHeight: 1 }}>日本語</span>
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 500, margin: 0 }}>
                    Nihongo · N5
                  </p>
                  <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-pixel), monospace", letterSpacing: "0.04em", margin: 0 }}>
                    nihongo.braunf.com ↗
                  </p>
                </div>
              </a>
            </div>
          </div>
        </FadeContent>

        {/* Bottom dialog */}
        <FadeContent blur duration={600} delay={950} initialOpacity={0} className="w-full max-w-4xl">
          <DialogBox showCursor={selectedId === null && !navigatingToPokedex}>
            <AnimatePresence mode="wait">
              {selectedId === null && !navigatingToPokedex ? (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-pixel), monospace",
                    color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.05em",
                    lineHeight: "1.8",
                  }}
                >
                  Choose a Pokémon!
                </motion.p>
              ) : navigatingToPokedex ? (
                <motion.p
                  key="pokedex"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-pixel), monospace",
                    letterSpacing: "0.05em",
                    lineHeight: "1.8",
                    color: POKEDEX_RED,
                  }}
                >
                  Opening POKÉDEX...
                </motion.p>
              ) : (
                <motion.p
                  key="chosen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-pixel), monospace",
                    letterSpacing: "0.05em",
                    lineHeight: "1.8",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>So, you want </span>
                  <span style={{ color: selectedCard?.accentColor ?? "#fff" }}>
                    {selectedCard?.title}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>{"? "}This choice is yours!</span>
                </motion.p>
              )}
            </AnimatePresence>
          </DialogBox>
        </FadeContent>
      </main>
    </div>
  );
}
