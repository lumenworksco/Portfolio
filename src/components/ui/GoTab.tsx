"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const WOOD = "#d9a85b";
const LINE = "#5a3b12";

// A slice of goban docked at the right edge — the same "peek in, slide out"
// language as the left-hand tabs, but it's a door to the Go site, so it gets
// its own edge. Hover and a white stone answers the black one.
export default function GoTab({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const awake = hovered;

  const cell = 16;
  const pad = 12;
  const size = pad * 2 + cell * 3;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Play Go at go.braunf.com (opens in a new tab)"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={{ x: 58 }}
      animate={{ x: awake ? 0 : 58 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        translate: "0 -50%",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "76px",
        padding: "8px 6px 6px 10px",
        gap: "5px",
        textDecoration: "none",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        background: `linear-gradient(160deg, #e6b96d 0%, ${WOOD} 100%)`,
        border: `1px solid ${LINE}80`,
        borderRight: "none",
        borderRadius: "10px 0 0 10px",
        boxShadow: awake
          ? "0 10px 26px rgba(0,0,0,0.55), 0 0 22px rgba(217,168,91,0.3)"
          : "0 4px 14px rgba(0,0,0,0.45)",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} stroke={LINE} strokeWidth="1" opacity="0.8">
            <line x1={pad} x2={size - pad} y1={pad + i * cell} y2={pad + i * cell} />
            <line y1={pad} y2={size - pad} x1={pad + i * cell} x2={pad + i * cell} />
          </g>
        ))}
        {/* black stone, always there */}
        <circle cx={pad + cell} cy={pad + cell} r="6.5" fill="#111" />
        <circle cx={pad + cell - 2} cy={pad + cell - 2} r="2" fill="#fff" opacity="0.18" />
        {/* white stone drops in on hover */}
        <motion.g
          initial={false}
          animate={reducedMotion ? { opacity: awake ? 1 : 0 } : { opacity: awake ? 1 : 0, y: awake ? 0 : -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <circle cx={pad + cell * 2} cy={pad + cell * 2} r="6.5" fill="#f5f1e8" stroke="#444" strokeWidth="0.8" />
        </motion.g>
      </svg>
      <p
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "8px",
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#3b2508",
          whiteSpace: "nowrap",
          margin: 0,
        }}
      >
        {awake ? "Play Go ▸" : "囲碁"}
      </p>
    </motion.a>
  );
}
