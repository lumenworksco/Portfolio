"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Wrench, FlaskConical, BarChart3, Cpu, Flame, Brain, Leaf, BookOpen } from "lucide-react";
import Link from "next/link";
import Aurora from "@/components/ui/Aurora";
import SpotlightCard from "@/components/ui/SpotlightCard";
import GradientText from "@/components/ui/GradientText";
import FadeContent from "@/components/ui/FadeContent";
import ChiptuneMusic from "@/components/ui/ChiptuneMusic";

type CardId = "lumen" | "portfolio" | "calm";

const POKEDEX_RED = "#CC0000";
const EMERALD_CREAM = "#F7F4E3";
const EMERALD_CREAM_DEEP = "#EAE5C8";
const EMERALD_INK = "#1C1C1C";
const EMERALD_BLUE = "#2E86AB";
const EMERALD_BOX_BG = `linear-gradient(180deg, ${EMERALD_CREAM} 0%, ${EMERALD_CREAM_DEEP} 100%)`;
const EMERALD_BOX_BORDER = `3px solid ${EMERALD_INK}`;
const EMERALD_BOX_INSET = `inset 0 0 0 2px ${EMERALD_BLUE}30`;

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
    gradientColors: ["#f59e0b", "#d97706", "#fbbf24", "#d97706", "#f59e0b"],
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
    gradientColors: ["#059669", "#10b981", "#34d399", "#10b981", "#059669"],
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
    accentColor: "#65a30d",
    spotlightColor: "rgba(101, 163, 13, 0.3)",
    gradientColors: ["#65a30d", "#4d7c0f", "#84cc16", "#4d7c0f", "#65a30d"],
  },
];

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
        background: EMERALD_BOX_BG,
        border: EMERALD_BOX_BORDER,
        borderRadius: "8px",
        padding: "14px 20px",
        boxShadow: `${EMERALD_BOX_INSET}, 0 6px 28px rgba(0,0,0,0.45)`,
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
            color: EMERALD_INK,
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

// ─── Start-menu row — GBA pause-menu list item ─────────────────────────────────
function StartMenuRow({
  href,
  onClick,
  external = false,
  icon,
  label,
  color,
  badge,
}: {
  href?: string;
  onClick?: () => void;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  color: string;
  badge?: string;
}) {
  const [hovered, setHovered] = useState(false);

  const style: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "9px 14px 9px 26px",
    borderRadius: "6px",
    border: "none",
    background: hovered ? color : "transparent",
    color: hovered ? "#fff" : EMERALD_INK,
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.15s ease, color 0.15s ease",
    fontFamily: "var(--font-pixel), monospace",
    fontSize: "10px",
    letterSpacing: "0.04em",
    textAlign: "left",
  };

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  const inner = (
    <>
      <span
        style={{
          position: "absolute",
          left: "9px",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.15s ease",
          fontSize: "9px",
          lineHeight: 1,
        }}
      >
        ▶
      </span>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "16px",
          lineHeight: 0,
          color: hovered ? "#fff" : color,
          transition: "color 0.15s ease",
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1, display: "inline-block", lineHeight: 1, transform: "translateY(1px)" }}>
        {label}
      </span>
      {badge && (
        <span
          style={{
            fontSize: "7px",
            background: hovered ? "rgba(255,255,255,0.28)" : color,
            color: "#fff",
            padding: "3px 6px 2px",
            borderRadius: "4px",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {badge}
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} style={style} {...handlers}>
        {inner}
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...handlers}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href!} style={style} {...handlers}>
      {inner}
    </Link>
  );
}

// ─── Type emblem — CSS gradient + lucide icon, no freehand illustration ───────
type PokeType = "fire" | "psychic" | "grass";

const TYPE_ICONS: Record<PokeType, typeof Flame> = {
  fire: Flame,
  psychic: Brain,
  grass: Leaf,
};

function TypeEmblem({
  variant,
  size = 76,
  hovered = false,
  selected = false,
  color,
}: {
  variant: PokeType;
  size?: number;
  hovered?: boolean;
  selected?: boolean;
  color: string;
}) {
  const Icon = TYPE_ICONS[variant];

  return (
    <motion.div
      style={{ width: size, height: size, position: "relative" }}
      animate={
        selected
          ? { scale: [1, 1.16, 0.94, 1.05, 1], rotate: [0, -6, 6, -3, 0] }
          : hovered
          ? { y: [0, -5, 0] }
          : { y: 0 }
      }
      transition={
        selected
          ? { duration: 0.55, ease: "easeOut" }
          : { duration: 0.8, ease: "easeInOut", repeat: hovered ? Infinity : 0 }
      }
    >
      {/* ground shadow */}
      <div
        style={{
          position: "absolute",
          bottom: "-9px",
          left: "50%",
          transform: "translateX(-50%)",
          width: `${size * 0.55}px`,
          height: `${size * 0.1}px`,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.4)",
          filter: "blur(3px)",
        }}
      />

      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `radial-gradient(circle at 34% 30%, ${color}ee, ${color} 65%, ${color}bb 100%)`,
          border: "3px solid #161616",
          boxShadow:
            hovered || selected
              ? `0 0 0 4px ${color}30, 0 10px 24px ${color}55`
              : `0 0 0 3px ${color}20, 0 6px 14px rgba(0,0,0,0.35)`,
          transition: "box-shadow 0.25s ease",
        }}
      >
        <Icon size={size * 0.46} color="#161616" strokeWidth={2.2} />
      </div>

      {/* selection flash */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1.9, 2.1] }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}bb 0%, transparent 70%)`,
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

// ─── Overworld strip — pixel-tile terrain + town entry banner ─────────────────
function OverworldStrip() {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowBanner(false), 2600);
    return () => clearTimeout(t);
  }, []);

  const trees = [8, 90];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "60px",
        borderRadius: "8px",
        overflow: "hidden",
        border: `3px solid ${EMERALD_INK}`,
        boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* grass tiles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(90deg, #4d9c3f 0px, #4d9c3f 15px, #57ab49 15px, #57ab49 30px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 15px, transparent 15px, transparent 30px)",
        }}
      />

      {/* dirt path */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: "20px",
          transform: "translateY(-50%)",
          background:
            "repeating-linear-gradient(90deg, #c9a36a 0px, #c9a36a 15px, #bd9660 15px, #bd9660 30px)",
          borderTop: "2px solid rgba(0,0,0,0.15)",
          borderBottom: "2px solid rgba(0,0,0,0.15)",
        }}
      />

      {/* trees */}
      {trees.map((leftPct, i) => (
        <div key={i} style={{ position: "absolute", left: `${leftPct}%`, bottom: 0, transform: "translateX(-50%)" }}>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "6px",
              height: "8px",
              background: "#6b4423",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#2f6b2f",
              border: "2px solid #1f4d1f",
            }}
          />
        </div>
      ))}

      {/* entering-location banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              background: "rgba(8,8,8,0.92)",
              padding: "7px 18px 6px",
              fontFamily: "var(--font-pixel), monospace",
              fontSize: "11px",
              color: "#fff",
              letterSpacing: "0.1em",
              boxShadow: "0 2px 14px rgba(0,0,0,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            PROF. BRAUN&apos;S LAB
          </motion.div>
        )}
      </AnimatePresence>
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
        }, 850);
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

      {/* Aurora WebGL background — Hoenn-leaning tropical palette */}
      <div className="fixed inset-0 z-0">
        <Aurora
          colorStops={["#2f6b2f", "#0e7490", "#c9a36a"]}
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
            transition={{ duration: 0.5, delay: 0.25, times: [0, 0.35, 1], ease: "easeOut" }}
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
        {/* Overworld strip */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          <OverworldStrip />
        </motion.div>

        {/* Professor dialog header */}
        <FadeContent blur duration={650} initialOpacity={0} className="w-full max-w-4xl">
          <DialogBox showCursor>
            <p
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 600,
                color: "rgba(28,28,28,0.5)",
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
                color: "rgba(28,28,28,0.88)",
                lineHeight: "1.6",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                whiteSpace: undefined,
              }}
            >
              These three are no ordinary Pokémon — each one rare in its own right.{" "}
              <span style={{ color: EMERALD_INK, fontWeight: 600 }}>Which will you choose?</span>
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
                      minHeight: "clamp(300px, 40vw, 400px)",
                      borderRadius: "10px",
                      border: `2px solid ${
                        isSelected
                          ? card.accentColor
                          : isHovered
                          ? card.accentColor + "80"
                          : EMERALD_INK
                      }`,
                      boxShadow: isSelected
                        ? `${EMERALD_BOX_INSET}, 0 0 50px ${card.accentColor}50, 0 0 90px ${card.accentColor}20`
                        : isHovered
                        ? `${EMERALD_BOX_INSET}, 0 0 28px ${card.accentColor}30`
                        : EMERALD_BOX_INSET,
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                      background: card.available
                        ? EMERALD_BOX_BG
                        : "rgba(120,116,96,0.35)",
                    }}
                  >
                    {/* Top accent bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: card.available ? card.accentColor : "#333",
                        opacity: isHovered || isSelected ? 1 : 0.6,
                        transition: "opacity 0.3s ease",
                      }}
                    />

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

                    {/* Type emblem */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "6px",
                        marginBottom: "24px",
                        filter: card.available ? "none" : "grayscale(1)",
                        opacity: card.available ? 1 : 0.4,
                      }}
                    >
                      <TypeEmblem
                        variant={card.pokemonType.toLowerCase() as PokeType}
                        size={76}
                        hovered={isHovered}
                        selected={isSelected}
                        color={card.available ? card.accentColor : "#666"}
                      />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-bold mb-1">
                      <GradientText
                        colors={
                          card.available
                            ? card.gradientColors
                            : ["#8a8a80", "#6f6f66", "#8a8a80"]
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
                        style={{ color: "rgba(28,28,28,0.55)" }}
                      >
                        {card.subtitle}
                      </p>
                      <TypeBadge
                        type={card.pokemonType}
                        color={card.available ? card.typeColor : "#8a8a80"}
                      />
                    </div>

                    {/* Accent line */}
                    <div
                      style={{
                        width: isHovered || isSelected ? "48px" : "24px",
                        height: "2px",
                        background: card.available ? card.accentColor : "#999",
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
                          ? "rgba(28,28,28,0.72)"
                          : "rgba(28,28,28,0.3)",
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
                            opacity: isHovered ? 1 : 0.8,
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
                            color: "rgba(28,28,28,0.35)",
                            background: "rgba(28,28,28,0.05)",
                            border: "1px solid rgba(28,28,28,0.15)",
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

        {/* Start menu — every other destination, GBA pause-menu style */}
        <FadeContent blur duration={600} delay={1100} initialOpacity={0} className="w-full max-w-4xl">
          <div
            style={{
              position: "relative",
              background: EMERALD_BOX_BG,
              border: EMERALD_BOX_BORDER,
              borderRadius: "8px",
              padding: "10px 10px 12px",
              boxShadow: EMERALD_BOX_INSET,
            }}
          >
            {/* Panel label */}
            <div className="flex items-center gap-2 px-3 pt-2 pb-2">
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
                  color: "rgba(28,28,28,0.5)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                Menu
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <StartMenuRow onClick={handlePokedex} icon={<BookOpen size={14} />} label="POKEDEX" color={POKEDEX_RED} />
              <StartMenuRow href="/research" icon={<FlaskConical size={14} />} label="RESEARCH" color="#34d399" />
              <StartMenuRow
                href="https://nihongo.braunf.com"
                external
                icon={<span style={{ fontSize: "13px" }}>日</span>}
                label="NIHONGO"
                color="#f472b6"
                badge="WK LV.3"
              />

              <div style={{ height: "1px", background: "rgba(28,28,28,0.15)", margin: "5px 12px" }} />

              <StartMenuRow href="/contact" icon={<Mail size={14} />} label="CONTACT" color={EMERALD_INK} />
              <StartMenuRow href="/uses" icon={<Wrench size={14} />} label="USES" color={EMERALD_INK} />
              <StartMenuRow href="https://data.braunf.com" external icon={<BarChart3 size={14} />} label="DATACAMP" color="#f59e0b" />
              <StartMenuRow href="https://iot.braunf.com" external icon={<Cpu size={14} />} label="IOT LAB" color="#60a5fa" />
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
                    color: "rgba(28,28,28,0.7)",
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
                  Opening POKEDEX...
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
                  <span style={{ color: "rgba(28,28,28,0.7)" }}>So, you want </span>
                  <span style={{ color: selectedCard?.accentColor ?? EMERALD_INK }}>
                    {selectedCard?.title}
                  </span>
                  <span style={{ color: "rgba(28,28,28,0.7)" }}>{"? "}This choice is yours!</span>
                </motion.p>
              )}
            </AnimatePresence>
          </DialogBox>
        </FadeContent>
      </main>
    </div>
  );
}
