"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import Aurora from "@/components/ui/Aurora";
import {
  achievements,
  typeColors,
  type Achievement,
  type Category,
} from "@/data/achievements";

// ─── Filter categories ─────────────────────────────────────────────────────────
const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all",        label: "ALL"       },
  { id: "founding",   label: "FOUNDING"  },
  { id: "hackathon",  label: "HACKATHON" },
  { id: "award",      label: "AWARD"     },
  { id: "education",  label: "EDUCATION" },
  { id: "cert",       label: "CERT"      },
  { id: "research",   label: "RESEARCH"  },
];

// ─── Type badge ────────────────────────────────────────────────────────────────
function TypeBadge({ type }: { type: string }) {
  const color = typeColors[type as keyof typeof typeColors] ?? "#A8A878";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px 1px",
        borderRadius: "4px",
        background: color,
        color: "#fff",
        fontSize: "7px",
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

// ─── Achievement card ──────────────────────────────────────────────────────────
function AchievementCard({
  achievement,
  onClick,
  index,
}: {
  achievement: Achievement;
  onClick: () => void;
  index: number;
}) {
  const Icon = achievement.icon;
  const primaryColor = typeColors[achievement.types[0]];

  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.06 + index * 0.035, ease: "easeOut" }}
      onClick={onClick}
      whileHover={{ scale: 1.02, borderColor: primaryColor + "55" }}
      style={{
        background: "rgba(10,10,14,0.88)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "10px",
        padding: "16px",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.25s ease",
      }}
    >
      {/* Corner glow */}
      <div
        style={{
          position: "absolute",
          top: -24,
          right: -24,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: primaryColor,
          opacity: 0.05,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

      {/* Number */}
      <p
        style={{
          fontSize: "9px",
          fontFamily: "var(--font-pixel), monospace",
          color: "rgba(255,255,255,0.18)",
          marginBottom: "10px",
          letterSpacing: "0.1em",
        }}
      >
        #{achievement.id}
      </p>

      {/* Icon */}
      <div
        style={{
          color: primaryColor,
          marginBottom: "10px",
          filter: `drop-shadow(0 0 5px ${primaryColor}50)`,
        }}
      >
        <Icon size={22} />
      </div>

      {/* Name */}
      <p
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "rgba(255,255,255,0.9)",
          marginBottom: "3px",
          lineHeight: 1.3,
        }}
      >
        {achievement.name}
      </p>

      {/* Org */}
      <p
        style={{
          fontSize: "10px",
          color: "rgba(255,255,255,0.3)",
          marginBottom: "9px",
          lineHeight: 1.3,
        }}
      >
        {achievement.org}
      </p>

      {/* Type badges */}
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {achievement.types.map((t) => (
          <TypeBadge key={t} type={t} />
        ))}
      </div>

      {/* Highlight */}
      {achievement.highlight && (
        <p
          style={{
            fontSize: "8px",
            fontFamily: "var(--font-pixel), monospace",
            color: primaryColor,
            opacity: 0.85,
            letterSpacing: "0.04em",
            marginTop: "9px",
          }}
        >
          ★ {achievement.highlight}
        </p>
      )}
    </motion.button>
  );
}

// ─── Detail modal ──────────────────────────────────────────────────────────────
function Modal({
  achievement,
  onClose,
}: {
  achievement: Achievement;
  onClose: () => void;
}) {
  const Icon = achievement.icon;
  const primaryColor = typeColors[achievement.types[0]];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(8,8,12,0.97)",
          border: `1px solid ${primaryColor}38`,
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "480px",
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          boxShadow: `0 0 60px ${primaryColor}18, 0 24px 60px rgba(0,0,0,0.85)`,
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "6px",
            padding: "5px",
            cursor: "pointer",
            color: "rgba(255,255,255,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.15s ease",
          }}
        >
          <X size={13} />
        </button>

        {/* Number */}
        <p
          style={{
            fontSize: "9px",
            fontFamily: "var(--font-pixel), monospace",
            color: "rgba(255,255,255,0.2)",
            marginBottom: "16px",
            letterSpacing: "0.1em",
          }}
        >
          #{achievement.id}
        </p>

        {/* Icon + name */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              color: primaryColor,
              filter: `drop-shadow(0 0 10px ${primaryColor}65)`,
              flexShrink: 0,
              marginTop: "3px",
            }}
          >
            <Icon size={34} />
          </div>
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                marginBottom: "7px",
              }}
            >
              {achievement.name}
            </h2>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {achievement.types.map((t) => (
                <TypeBadge key={t} type={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Org + period */}
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{
              fontSize: "12px",
              color: primaryColor,
              opacity: 0.8,
              marginBottom: "4px",
            }}
          >
            {achievement.org}
          </p>
          <p
            style={{
              fontSize: "10px",
              fontFamily: "var(--font-pixel), monospace",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.04em",
            }}
          >
            {achievement.period}
          </p>
        </div>

        {/* Highlight */}
        {achievement.highlight && (
          <div
            style={{
              background: `${primaryColor}12`,
              border: `1px solid ${primaryColor}28`,
              borderRadius: "6px",
              padding: "8px 12px",
              marginBottom: "16px",
            }}
          >
            <p
              style={{
                fontSize: "9px",
                fontFamily: "var(--font-pixel), monospace",
                color: primaryColor,
                letterSpacing: "0.05em",
              }}
            >
              ★ {achievement.highlight}
            </p>
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            marginBottom: "16px",
          }}
        />

        {/* Detail */}
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.52)",
            lineHeight: 1.75,
          }}
        >
          {achievement.detail}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function PokedexPage() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [scanDone, setScanDone] = useState(false);

  const filtered =
    filter === "all"
      ? achievements
      : achievements.filter((a) => a.category === filter);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: "#060608" }}
    >
      {/* Aurora */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#8B0000", "#6d28d9", "#7c0000"]}
          speed={0.4}
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

      {/* Entry reveal overlay — slides away from top, scan glow at leading edge */}
      <AnimatePresence>
        {!scanDone && (
          <>
            {/* Dark cover that clips away from the top, revealing content */}
            <motion.div
              key="reveal-overlay"
              style={{
                position: "fixed",
                inset: 0,
                background: "#060608",
                zIndex: 32,
                pointerEvents: "none",
              }}
              initial={{ clipPath: "inset(0 0 0 0)" }}
              animate={{ clipPath: "inset(100% 0 0 0)" }}
              transition={{ duration: 1.5, ease: "linear" }}
              onAnimationComplete={() => setScanDone(true)}
            />
            {/* Scan glow line at the reveal boundary */}
            <motion.div
              key="scanline"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                zIndex: 33,
                background:
                  "linear-gradient(to right, transparent, #CC0000 20%, #ff6666 50%, #CC0000 80%, transparent)",
                boxShadow: "0 0 20px #CC000099, 0 0 50px #CC000050, 0 2px 8px #CC000060",
                pointerEvents: "none",
              }}
              initial={{ y: 0 }}
              animate={{ y: "100vh" }}
              transition={{ duration: 1.5, ease: "linear" }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Back */}
      <Link
        href="/"
        className="fixed top-5 left-5 z-20 flex items-center gap-2 text-xs font-mono tracking-widest uppercase"
        style={{
          color: "rgba(255,255,255,0.35)",
          transition: "color 0.15s ease",
          textDecoration: "none",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color =
            "rgba(255,255,255,0.7)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color =
            "rgba(255,255,255,0.35)")
        }
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <main className="relative z-10 max-w-4xl mx-auto px-4 pt-20 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-10 text-center"
        >
          <h1
            style={{
              fontFamily: "var(--font-pixel), monospace",
              fontSize: "clamp(22px, 4vw, 34px)",
              color: "#CC0000",
              letterSpacing: "0.14em",
              marginBottom: "10px",
              textShadow: "0 0 40px #CC000055, 0 0 80px #CC000025",
            }}
          >
            POKEDEX
          </h1>
          <p
            style={{
              fontSize: "8px",
              fontFamily: "var(--font-pixel), monospace",
              color: "rgba(255,255,255,0.22)",
              letterSpacing: "0.18em",
            }}
          >
            {achievements.length} ACHIEVEMENTS CAPTURED
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: "flex",
            gap: "5px",
            overflowX: "auto",
            marginBottom: "24px",
            paddingBottom: "2px",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                style={{
                  padding: "5px 12px 4px",
                  borderRadius: "5px",
                  fontSize: "8px",
                  fontFamily: "var(--font-pixel), monospace",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: isActive ? "#CC0000" : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid #CC0000"
                    : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.38)",
                  boxShadow: isActive ? "0 0 16px #CC000038" : "none",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            gap: "10px",
          }}
        >
          {filtered.map((achievement, i) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={i}
              onClick={() => setSelected(achievement)}
            />
          ))}
        </motion.div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selected && <Modal achievement={selected} onClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
}
