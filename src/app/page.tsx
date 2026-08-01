"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code2, Brain, Mail, Wrench, FlaskConical, BarChart3, Cpu } from "lucide-react";
import Link from "next/link";
import Aurora from "@/components/ui/Aurora";
import SpotlightCard from "@/components/ui/SpotlightCard";
import GradientText from "@/components/ui/GradientText";
import FadeContent from "@/components/ui/FadeContent";
import ChiptuneMusic from "@/components/ui/ChiptuneMusic";

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
        borderRadius: "4px",
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

// ─── System panel icon chip ────────────────────────────────────────────────────
function IconChip({
  href,
  icon,
  label,
  external = false,
  accentColor = "rgba(255,255,255,0.7)",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
  accentColor?: string;
}) {
  const [hovered, setHovered] = useState(false);

  const style: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    borderRadius: "8px",
    background: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${hovered ? accentColor + "70" : "rgba(255,255,255,0.09)"}`,
    textDecoration: "none",
    transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    flexShrink: 0,
  };

  const inner = (
    <>
      <span
        style={{
          position: "absolute",
          bottom: "calc(100% + 7px)",
          left: "50%",
          transform: `translateX(-50%) translateY(${hovered ? "0" : "4px"})`,
          opacity: hovered ? 1 : 0,
          pointerEvents: "none",
          fontSize: "8px",
          fontFamily: "var(--font-pixel), monospace",
          letterSpacing: "0.04em",
          color: "#fff",
          background: "rgba(8,8,12,0.96)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "4px",
          padding: "4px 7px 3px",
          whiteSpace: "nowrap",
          transition: "opacity 0.18s ease, transform 0.18s ease",
          zIndex: 10,
        }}
      >
        {label}
        {external ? " ↗" : ""}
      </span>
      <div style={{ color: hovered ? accentColor : "rgba(255,255,255,0.55)", transition: "color 0.2s ease", lineHeight: 0 }}>
        {icon}
      </div>
    </>
  );

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...handlers}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} style={style} {...handlers}>
      {inner}
    </Link>
  );
}

// ─── Poké Ball icon: idle float / hover wobble / shake-and-open reveal ─────────
function PokeBall({
  size = 36,
  hovered = false,
  opening = false,
}: {
  size?: number;
  hovered?: boolean;
  opening?: boolean;
}) {
  return (
    <motion.div
      style={{ width: size, height: size, position: "relative" }}
      animate={
        opening
          ? { rotate: [0, -18, 16, -12, 8, -4, 0] }
          : hovered
          ? { rotate: [0, -7, 7, -5, 5, 0] }
          : { rotate: 0, y: [0, -3, 0] }
      }
      transition={
        opening
          ? { duration: 0.5, ease: "easeInOut" }
          : hovered
          ? { duration: 0.55, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.35 }
          : { duration: 2.4, ease: "easeInOut", repeat: Infinity }
      }
    >
      <motion.svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        animate={opening ? { scale: [1, 1.22, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
        transition={opening ? { duration: 0.3, delay: 0.55, ease: "easeIn" } : { duration: 0 }}
      >
        <path
          d="M50 6 A44 44 0 0 1 93.5 46 L6.5 46 A44 44 0 0 1 50 6 Z"
          fill="#EE1515"
          stroke="#161616"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 54 L93.5 54 A44 44 0 0 1 50 94 A44 44 0 0 1 6.5 54 Z"
          fill="#F5F5F7"
          stroke="#161616"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <rect x="4" y="46" width="92" height="8" fill="#161616" />
        <circle cx="50" cy="50" r="13" fill="#F5F5F7" stroke="#161616" strokeWidth="4.5" />
        <circle cx="50" cy="50" r="5.5" fill="#F5F5F7" stroke="#161616" strokeWidth="3" />
      </motion.svg>

      {opening && (
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 1, 0], scale: [0.2, 2.6, 2.6] }}
          transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />
      )}
    </motion.div>
  );
}

// ─── GBA-style selection cursor brackets ───────────────────────────────────────
function CornerBrackets({ color, visible }: { color: string; visible: boolean }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: "14px",
    height: "14px",
    borderColor: color,
    opacity: visible ? 1 : 0,
    transition: "opacity 0.25s ease",
    pointerEvents: "none",
  };
  return (
    <>
      <span style={{ ...base, top: "-6px", left: "-6px", borderTop: "2px solid", borderLeft: "2px solid" }} />
      <span style={{ ...base, top: "-6px", right: "-6px", borderTop: "2px solid", borderRight: "2px solid" }} />
      <span style={{ ...base, bottom: "-6px", left: "-6px", borderBottom: "2px solid", borderLeft: "2px solid" }} />
      <span style={{ ...base, bottom: "-6px", right: "-6px", borderBottom: "2px solid", borderRight: "2px solid" }} />
    </>
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
        }, 1050);
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
      <ChiptuneMusic />

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
            transition={{ duration: 0.6, delay: 0.45, times: [0, 0.35, 1], ease: "easeOut" }}
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
                    position: "relative",
                  }}
                >
                  <CornerBrackets color={card.accentColor} visible={(isHovered || isSelected) && card.available} />
                  <SpotlightCard
                    spotlightColor={card.available ? card.spotlightColor : "rgba(80, 80, 80, 0.08)"}
                    className="flex flex-col h-full"
                    style={{
                      minHeight: "clamp(260px, 40vw, 370px)",
                      borderRadius: "10px",
                      border: `2px solid ${
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

                    {/* Icon: Poké Ball → shake → open → reveal */}
                    <div style={{ position: "relative", width: "36px", height: "36px", marginBottom: "24px" }}>
                      {card.available && <PokeBall size={36} hovered={isHovered} opening={isSelected} />}
                      <motion.div
                        initial={false}
                        animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0.4 }}
                        transition={{ duration: 0.3, delay: isSelected ? 0.85 : 0, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: card.accentColor,
                          filter: isHovered
                            ? `drop-shadow(0 0 10px ${card.accentColor}90)`
                            : "none",
                        }}
                      >
                        {cardIcons[card.id]}
                      </motion.div>
                      {!card.available && (
                        <div style={{ color: "#555", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
                          {cardIcons[card.id]}
                        </div>
                      )}
                    </div>

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

        {/* System panel — secondary navigation, Pokédex-console styled */}
        <FadeContent blur duration={600} delay={1100} initialOpacity={0} className="w-full max-w-4xl">
          <div
            style={{
              position: "relative",
              background: "rgba(10,10,14,0.68)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "14px 18px 16px",
              overflow: "hidden",
            }}
          >
            {/* Bezel accent stripe */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: `linear-gradient(90deg, ${POKEDEX_RED} 0%, ${POKEDEX_RED}55 35%, transparent 70%)`,
              }}
            />

            {/* Panel label */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="pulse-dot"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: POKEDEX_RED,
                  boxShadow: `0 0 8px ${POKEDEX_RED}`,
                }}
              />
              <p
                style={{
                  fontSize: "9px",
                  fontFamily: "var(--font-pixel), monospace",
                  color: "rgba(255,255,255,0.32)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                System
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Primary: Pokédex */}
              <button
                onClick={handlePokedex}
                style={{
                  fontSize: "9px",
                  fontFamily: "var(--font-pixel), monospace",
                  color: POKEDEX_RED,
                  letterSpacing: "0.06em",
                  background: "rgba(204,0,0,0.1)",
                  border: "1px solid rgba(204,0,0,0.28)",
                  borderRadius: "6px",
                  padding: "9px 16px 7px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "rgba(204,0,0,0.18)";
                  el.style.borderColor = "rgba(204,0,0,0.45)";
                  el.style.boxShadow = "0 0 16px rgba(204,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "rgba(204,0,0,0.1)";
                  el.style.borderColor = "rgba(204,0,0,0.28)";
                  el.style.boxShadow = "none";
                }}
              >
                ▶ POKÉDEX
              </button>

              <div
                className="hidden md:block"
                style={{ width: "1px", alignSelf: "stretch", background: "rgba(255,255,255,0.08)" }}
              />

              {/* Secondary: uniform icon chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <IconChip href="/contact" icon={<Mail size={16} />} label="Contact" />
                <IconChip href="/uses" icon={<Wrench size={16} />} label="Uses" />
                <IconChip
                  href="/research"
                  icon={<FlaskConical size={16} />}
                  label="Research"
                  accentColor="#34d399"
                />
                <IconChip
                  href="https://data.braunf.com"
                  icon={<BarChart3 size={16} />}
                  label="DataCamp"
                  external
                  accentColor="#f59e0b"
                />
                <IconChip
                  href="https://iot.braunf.com"
                  icon={<Cpu size={16} />}
                  label="IoT Lab"
                  external
                  accentColor="#60a5fa"
                />
                <IconChip
                  href="https://nihongo.braunf.com"
                  icon={<span style={{ fontSize: "13px", lineHeight: 1 }}>日</span>}
                  label="Nihongo · N5"
                  external
                  accentColor="#f472b6"
                />
              </div>
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
