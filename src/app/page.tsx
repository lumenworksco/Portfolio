"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Aurora from "@/components/ui/Aurora";
import SpotlightCard from "@/components/ui/SpotlightCard";
import GradientText from "@/components/ui/GradientText";
import FadeContent from "@/components/ui/FadeContent";

type CardId = "lumen" | "portfolio" | "calm";

interface Card {
  id: CardId;
  title: string;
  subtitle: string;
  description: string;
  href: string | null;
  available: boolean;
  accentColor: string;
  spotlightColor: `rgba(${number}, ${number}, ${number}, ${number})`;
  gradientColors: string[];
  icon: string;
}

const cards: Card[] = [
  {
    id: "lumen",
    title: "Lumen Studio",
    subtitle: "Design & Visual",
    description:
      "A creative design studio crafting immersive visual experiences, brand identities, and digital worlds.",
    href: "/Lumen-Studio",
    available: true,
    accentColor: "#f59e0b",
    spotlightColor: "rgba(245, 158, 11, 0.4)",
    gradientColors: ["#fde68a", "#f59e0b", "#fbbf24", "#f59e0b", "#fde68a"],
    icon: "✦",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    subtitle: "Personal Space",
    description:
      "A personal portfolio showcasing projects, experience, and the journey of a developer. Coming soon.",
    href: null,
    available: false,
    accentColor: "#8b5cf6",
    spotlightColor: "rgba(139, 92, 246, 0.2)",
    gradientColors: ["#c4b5fd", "#8b5cf6", "#a78bfa", "#8b5cf6", "#c4b5fd"],
    icon: "◈",
  },
  {
    id: "calm",
    title: "CalmCampus",
    subtitle: "Student Wellness",
    description:
      "A wellness companion for students, helping build healthy daily routines and mental clarity.",
    href: "/CalmCampus",
    available: true,
    accentColor: "#10b981",
    spotlightColor: "rgba(16, 185, 129, 0.4)",
    gradientColors: ["#6ee7b7", "#10b981", "#34d399", "#10b981", "#6ee7b7"],
    icon: "◉",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: 0.2 + i * 0.14, ease: "easeOut" as const },
  }),
};

export default function SelectPage() {
  const [hoveredId, setHoveredId] = useState<CardId | null>(null);
  const [selectedId, setSelectedId] = useState<CardId | null>(null);

  const handleSelect = useCallback(
    (card: Card) => {
      if (!card.available || selectedId !== null) return;
      setSelectedId(card.id);
      if (card.href) {
        setTimeout(() => {
          window.location.href = card.href!;
        }, 650);
      }
    },
    [selectedId]
  );

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

      {/* Dark vignette so text stays readable */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(6,6,8,0.55) 100%)",
        }}
      />

      {/* Full-screen selection flash */}
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            key="flash"
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ background: "#fff" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            transition={{ duration: 0.65, times: [0, 0.25, 1], ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        {/* Header */}
        <FadeContent blur duration={700} initialOpacity={0}>
          <div className="text-center mb-14">
            <p
              className="text-xs font-mono tracking-[0.3em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Select your experience
            </p>
            <h1 className="text-4xl md:text-[3.25rem] font-bold leading-tight">
              <GradientText
                colors={["#fbbf24", "#a78bfa", "#34d399", "#a78bfa", "#fbbf24"]}
                animationSpeed={7}
              >
                Choose your path.
              </GradientText>
            </h1>
          </div>
        </FadeContent>

        {/* Card grid */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
          {cards.map((card, i) => {
            const isSelected = selectedId === card.id;
            const isOther = selectedId !== null && !isSelected;
            const isHovered = hoveredId === card.id && selectedId === null;

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
                    opacity: isOther ? 0.22 : 1,
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
                      minHeight: "360px",
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
                        ? "rgba(10,10,14,0.85)"
                        : "rgba(10,10,14,0.6)",
                    }}
                  >
                    {/* Glow blob behind the icon */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-30px",
                        left: "-30px",
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                        background: card.accentColor,
                        opacity: isHovered || isSelected ? 0.07 : 0.03,
                        filter: "blur(40px)",
                        transition: "opacity 0.4s ease",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Icon */}
                    <div
                      className="text-3xl mb-6 font-mono"
                      style={{
                        color: card.available ? card.accentColor : "#555",
                        textShadow: isHovered
                          ? `0 0 20px ${card.accentColor}80`
                          : "none",
                        transition: "text-shadow 0.3s ease",
                      }}
                    >
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-1">
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

                    {/* Subtitle */}
                    <p
                      className="text-[10px] font-mono tracking-[0.25em] uppercase mb-5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {card.subtitle}
                    </p>

                    {/* Accent line */}
                    <div
                      style={{
                        width: isHovered || isSelected ? "48px" : "24px",
                        height: "1px",
                        background: card.available ? card.accentColor : "#333",
                        marginBottom: "20px",
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
                          : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {card.description}
                    </p>

                    {/* CTA / badge */}
                    <div className="mt-7">
                      {card.available ? (
                        <span
                          className="text-xs font-mono"
                          style={{
                            color: card.accentColor,
                            opacity: isHovered ? 1 : 0.7,
                            transition: "opacity 0.3s ease",
                          }}
                        >
                          → Enter
                        </span>
                      ) : (
                        <span
                          className="text-[10px] font-mono px-2.5 py-1 rounded"
                          style={{
                            color: "rgba(255,255,255,0.2)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          Coming soon
                        </span>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom hint */}
        <FadeContent blur duration={600} delay={900} initialOpacity={0}>
          <p
            className="mt-12 text-[10px] font-mono tracking-[0.35em] uppercase"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Click to select
          </p>
        </FadeContent>
      </main>
    </div>
  );
}
