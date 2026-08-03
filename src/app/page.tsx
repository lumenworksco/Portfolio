"use client";

import { useState, useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Wrench, FlaskConical, BarChart3, Cpu, Flame, Brain, Leaf, BookOpen } from "lucide-react";
import Link from "next/link";
import Aurora from "@/components/ui/Aurora";
import SpotlightCard from "@/components/ui/SpotlightCard";
import GradientText from "@/components/ui/GradientText";
import FadeContent from "@/components/ui/FadeContent";
import ChiptuneMusic from "@/components/ui/ChiptuneMusic";
import { playHoverBlip, playConfirmChime } from "@/lib/uiSfx";

type CardId = "lumen" | "portfolio" | "calm";

const POKEDEX_RED = "#CC0000";
const EMERALD_CREAM = "#F7F4E3";
const EMERALD_CREAM_DEEP = "#EAE5C8";
const EMERALD_INK = "#1C1C1C";
const EMERALD_BLUE = "#2E86AB";
const EMERALD_BOX_BG = `linear-gradient(180deg, ${EMERALD_CREAM} 0%, ${EMERALD_CREAM_DEEP} 100%)`;
const EMERALD_BOX_BORDER = `3px solid ${EMERALD_INK}`;
const EMERALD_BOX_INSET = `inset 0 0 0 2px ${EMERALD_BLUE}30`;

// ─── prefers-reduced-motion — SSR-safe via useSyncExternalStore ───────────────
function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

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
        padding: "7px 16px",
        boxShadow: `${EMERALD_BOX_INSET}, 0 6px 28px rgba(0,0,0,0.45)`,
      }}
    >
      {children}
      {showCursor && (
        <span
          className="dialog-cursor"
          style={{
            position: "absolute",
            bottom: "7px",
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

// ─── Typewriter text — reveals character by character, like the game's boxes ──
function TypewriterText({
  segments,
  speedMs = 22,
  startDelay = 0,
}: {
  segments: { text: string; style?: React.CSSProperties }[];
  speedMs?: number;
  startDelay?: number;
}) {
  const fullLength = segments.reduce((n, s) => n + s.text.length, 0);
  const [count, setCount] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    let cancelled = false;
    const startTime = performance.now() + startDelay;
    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - startTime;
      if (elapsed >= 0) {
        const n = Math.min(fullLength, Math.floor(elapsed / speedMs));
        setCount(n);
        if (n >= fullLength) return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [fullLength, speedMs, startDelay, reducedMotion]);

  const displayCount = reducedMotion ? fullLength : count;

  return (
    <>
      {segments.map((seg, i) => {
        const startOffset = segments.slice(0, i).reduce((n, s) => n + s.text.length, 0);
        const take = Math.max(0, Math.min(seg.text.length, displayCount - startOffset));
        return (
          <span key={i} style={seg.style}>
            {seg.text.slice(0, take)}
          </span>
        );
      })}
    </>
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
  soundEnabled = false,
}: {
  href?: string;
  onClick?: () => void;
  external?: boolean;
  icon: React.ReactNode;
  label: string;
  color: string;
  badge?: string;
  soundEnabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const style: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "5px 10px 5px 20px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
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
    onMouseEnter: () => {
      setHovered(true);
      if (soundEnabled) playHoverBlip();
    },
    onMouseLeave: () => setHovered(false),
    onFocus: () => {
      setHovered(true);
      if (soundEnabled) playHoverBlip();
    },
    onBlur: () => setHovered(false),
    onClick: () => {
      if (soundEnabled) playConfirmChime();
      onClick?.();
    },
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
      <button style={style} {...handlers}>
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
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      style={{ width: size, height: size, position: "relative" }}
      animate={
        reducedMotion
          ? { scale: selected ? 1.08 : 1 }
          : selected
          ? { scale: [1, 1.16, 0.94, 1.05, 1], rotate: [0, -6, 6, -3, 0] }
          : hovered
          ? { y: [0, -5, 0] }
          : { y: 0 }
      }
      transition={
        reducedMotion
          ? { duration: 0.2 }
          : selected
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
        height: "40px",
        borderRadius: "7px",
        overflow: "hidden",
        border: `2px solid ${EMERALD_INK}`,
        boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
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
          height: "14px",
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
              width: "5px",
              height: "6px",
              background: "#6b4423",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "4px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "14px",
              height: "14px",
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
              padding: "5px 14px 4px",
              fontFamily: "var(--font-pixel), monospace",
              fontSize: "9px",
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
  const [musicEnabled, setMusicEnabled] = useState(false);
  const cardRefs = useRef<Record<CardId, HTMLDivElement | null>>({
    lumen: null,
    portfolio: null,
    calm: null,
  });

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
      if (musicEnabled) playConfirmChime();
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
    [selectedId, navigatingToPokedex, router, musicEnabled]
  );

  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent, card: Card, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect(card);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = cards[(index + 1) % cards.length];
        cardRefs.current[next.id]?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = cards[(index - 1 + cards.length) % cards.length];
        cardRefs.current[prev.id]?.focus();
      }
    },
    [handleSelect]
  );

  const handlePokedex = useCallback(() => {
    if (selectedId !== null || navigatingToPokedex) return;
    if (musicEnabled) playConfirmChime();
    setNavigatingToPokedex(true);
    setTimeout(() => router.push("/pokedex"), 700);
  }, [selectedId, navigatingToPokedex, router, musicEnabled]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "#060608" }}>
      <ChiptuneMusic enabled={musicEnabled} onToggle={() => setMusicEnabled((v) => !v)} />

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

      {/* CRT scanlines — subtle handheld-screen texture */}
      <div
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.09) 0px, rgba(0,0,0,0.09) 1px, transparent 1px, transparent 3px)",
          mixBlendMode: "multiply",
          opacity: 0.5,
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

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-2 md:py-3 gap-2 md:gap-2.5">
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
                marginBottom: "3px",
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
              <TypewriterText
                segments={[
                  { text: "These three are no ordinary Pokémon — each one rare in its own right. " },
                  { text: "Which will you choose?", style: { color: EMERALD_INK, fontWeight: 600 } },
                ]}
                startDelay={300}
              />
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
                  ref={(el) => {
                    cardRefs.current[card.id] = el;
                  }}
                  role="button"
                  tabIndex={card.available ? 0 : -1}
                  aria-label={`Choose ${card.title}`}
                  aria-disabled={!card.available}
                  onHoverStart={() => {
                    if (!card.available) return;
                    setHoveredId(card.id);
                    if (musicEnabled) playHoverBlip();
                  }}
                  onHoverEnd={() => setHoveredId(null)}
                  onFocus={() => card.available && setHoveredId(card.id)}
                  onBlur={() => setHoveredId(null)}
                  onKeyDown={(e) => handleCardKeyDown(e, card, i)}
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
                    outline: "none",
                  }}
                >
                  <CornerBrackets color={card.accentColor} visible={(isHovered || isSelected) && card.available} />
                  <SpotlightCard
                    spotlightColor={card.available ? card.spotlightColor : "rgba(80, 80, 80, 0.08)"}
                    className="flex flex-col h-full"
                    style={{
                      minHeight: "clamp(210px, 26vw, 260px)",
                      padding: "13px",
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
                        marginTop: "0px",
                        marginBottom: "7px",
                        filter: card.available ? "none" : "grayscale(1)",
                        opacity: card.available ? 1 : 0.4,
                      }}
                    >
                      <TypeEmblem
                        variant={card.pokemonType.toLowerCase() as PokeType}
                        size={50}
                        hovered={isHovered}
                        selected={isSelected}
                        color={card.available ? card.accentColor : "#666"}
                      />
                    </div>

                    {/* Title */}
                    <h2 className="text-lg md:text-xl font-bold mb-0.5">
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
                    <div className="flex items-center gap-2 mb-1.5" style={{ flexWrap: "wrap" }}>
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
                        marginBottom: "6px",
                        transition: "width 0.4s ease",
                        opacity: card.available ? 1 : 0.4,
                      }}
                    />

                    {/* Description */}
                    <p
                      className="text-[12.5px] leading-snug flex-1"
                      style={{
                        color: card.available
                          ? "rgba(28,28,28,0.72)"
                          : "rgba(28,28,28,0.3)",
                      }}
                    >
                      {card.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-2">
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
              padding: "7px 8px 8px",
              boxShadow: EMERALD_BOX_INSET,
            }}
          >
            {/* Panel label */}
            <div className="flex items-center gap-2 px-2 pt-0.5 pb-1">
              <span
                className="pulse-dot"
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: POKEDEX_RED,
                  boxShadow: `0 0 8px ${POKEDEX_RED}`,
                }}
              />
              <p
                style={{
                  fontSize: "8px",
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
              <StartMenuRow onClick={handlePokedex} icon={<BookOpen size={14} />} label="POKEDEX" color={POKEDEX_RED} soundEnabled={musicEnabled} />
              <StartMenuRow href="/research" icon={<FlaskConical size={14} />} label="RESEARCH" color="#34d399" soundEnabled={musicEnabled} />
              <StartMenuRow
                href="https://nihongo.braunf.com"
                external
                icon={<span style={{ fontSize: "13px" }}>日</span>}
                label="NIHONGO"
                color="#f472b6"
                badge="WK LV.3"
                soundEnabled={musicEnabled}
              />
            </div>

            <div style={{ height: "1px", background: "rgba(28,28,28,0.15)", margin: "3px 12px" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px" }}>
              <StartMenuRow href="/contact" icon={<Mail size={14} />} label="CONTACT" color={EMERALD_INK} soundEnabled={musicEnabled} />
              <StartMenuRow href="/uses" icon={<Wrench size={14} />} label="USES" color={EMERALD_INK} soundEnabled={musicEnabled} />
              <StartMenuRow href="https://data.braunf.com" external icon={<BarChart3 size={14} />} label="DATACAMP" color="#f59e0b" soundEnabled={musicEnabled} />
              <StartMenuRow href="https://iot.braunf.com" external icon={<Cpu size={14} />} label="IOT LAB" color="#60a5fa" soundEnabled={musicEnabled} />
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
                  <TypewriterText segments={[{ text: "Choose a Pokémon!" }]} speedMs={28} />
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
                  <TypewriterText segments={[{ text: "Opening POKEDEX..." }]} speedMs={28} />
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
                  <TypewriterText
                    segments={[
                      { text: "So, you want ", style: { color: "rgba(28,28,28,0.7)" } },
                      { text: selectedCard?.title ?? "", style: { color: selectedCard?.accentColor ?? EMERALD_INK } },
                      { text: "? This choice is yours!", style: { color: "rgba(28,28,28,0.7)" } },
                    ]}
                    speedMs={28}
                  />
                </motion.p>
              )}
            </AnimatePresence>
          </DialogBox>
        </FadeContent>
      </main>
    </div>
  );
}
