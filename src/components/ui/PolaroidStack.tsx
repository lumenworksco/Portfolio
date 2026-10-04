"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Aperture } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const CREAM = "#f3ede0";
const INK = "#1c1c1c";

// The photography counterpart to PocketOperator — docked at the opposite
// edge, same "peek in, slide out on hover" language, different medium.
export default function PolaroidStack({
  href,
  onLaunch,
}: {
  href: string;
  onLaunch: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const awake = hovered;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Lightroom photography portfolio in a new tab"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onLaunch}
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
        width: "76px",
        height: "92px",
        textDecoration: "none",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* second photo peeking behind, slightly rotated */}
      <div
        style={{
          position: "absolute",
          inset: "6px 6px 6px 10px",
          background: CREAM,
          border: `1px solid ${INK}30`,
          borderRadius: "8px 2px 2px 8px",
          transform: `rotate(${awake ? -6 : -3}deg)`,
          transition: "transform 0.3s ease",
          boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
        }}
      />

      {/* front polaroid */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: CREAM,
          border: `1px solid ${INK}55`,
          borderRadius: "8px 2px 2px 8px",
          boxShadow: awake
            ? "0 10px 26px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"
            : "0 4px 14px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          padding: "6px 6px 5px",
          transform: `rotate(${awake ? 1 : -1}deg)`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        {/* frame / aperture */}
        <div
          style={{
            flex: 1,
            borderRadius: "3px",
            background: "radial-gradient(circle at 38% 34%, #3a3a3a 0%, #141414 70%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <motion.div
            animate={
              reducedMotion
                ? {}
                : { rotate: awake ? 45 : 0 }
            }
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Aperture size={22} color={awake ? "#f3ede0" : "#8a8578"} strokeWidth={1.6} />
          </motion.div>
        </div>

        {/* caption strip */}
        <p
          style={{
            marginTop: "5px",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "7px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: INK,
            textAlign: "center",
            opacity: 0.75,
            whiteSpace: "nowrap",
          }}
        >
          {awake ? "Lightroom ▸" : "35mm"}
        </p>
      </div>
    </motion.a>
  );
}
