"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const PO_GREEN = "#8fd94a";

// A little sampler unit docked at the screen edge — the site's other secret
// door (backtick → terminal). Peeks in always, slides out on hover, launches
// on click. Not a menu row on purpose.
export default function PocketOperator({
  onLaunch,
  disabled = false,
}: {
  onLaunch: () => void;
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const awake = hovered && !disabled;

  return (
    <motion.button
      type="button"
      aria-label="Open Beats — a page for the loops made on a Teenage Engineering PO-33"
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onLaunch}
      initial={{ x: -58 }}
      animate={{ x: disabled ? -80 : awake ? 0 : -58, opacity: disabled ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        position: "fixed",
        left: 0,
        top: "50%",
        translate: "0 -50%",
        zIndex: 30,
        display: "flex",
        alignItems: "stretch",
        width: "76px",
        height: "92px",
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: disabled ? "default" : "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* device body */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "linear-gradient(155deg, #1c1f1a 0%, #101210 100%)",
          border: `1px solid ${PO_GREEN}55`,
          borderLeft: "none",
          borderRadius: "0 10px 10px 0",
          boxShadow: awake
            ? `0 8px 26px rgba(0,0,0,0.55), 0 0 22px ${PO_GREEN}30`
            : "0 4px 16px rgba(0,0,0,0.45)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 8px 8px",
          gap: "6px",
        }}
      >
        {/* faint PCB grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${PO_GREEN}14 1px, transparent 1px), linear-gradient(90deg, ${PO_GREEN}14 1px, transparent 1px)`,
            backgroundSize: "8px 8px",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        {/* LED */}
        <span
          className={reducedMotion ? undefined : "pulse-dot"}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: awake ? "#ff5a5a" : PO_GREEN,
            boxShadow: `0 0 6px ${awake ? "#ff5a5a" : PO_GREEN}`,
          }}
        />

        {/* tiny LCD */}
        <div
          style={{
            position: "relative",
            width: "100%",
            marginTop: "10px",
            background: "#0a1a0d",
            border: `1px solid ${PO_GREEN}40`,
            borderRadius: "3px",
            padding: "4px 3px",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-pixel), monospace",
              fontSize: "6px",
              letterSpacing: "0.03em",
              color: PO_GREEN,
              textAlign: "center",
              lineHeight: 1.5,
              whiteSpace: "nowrap",
              opacity: 0.9,
            }}
          >
            {awake ? "LOOPS ▸" : "PO·33"}
          </p>
        </div>

        {/* fake pad grid */}
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "3px",
            width: "100%",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              style={{
                aspectRatio: "1",
                borderRadius: "1px",
                background: PO_GREEN,
                opacity: awake && !reducedMotion ? [0.15, 0.85, 0.15, 0.5, 0.9, 0.2, 0.7, 0.3][i] : 0.18,
                transition: "opacity 0.25s ease",
              }}
            />
          ))}
        </div>

        {/* vertical peek label, visible when docked */}
        <div
          style={{
            position: "absolute",
            left: "3px",
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "left center",
            fontFamily: "var(--font-pixel), monospace",
            fontSize: "6px",
            letterSpacing: "0.12em",
            color: PO_GREEN,
            opacity: awake ? 0 : 0.85,
            transition: "opacity 0.2s ease",
            whiteSpace: "nowrap",
          }}
        >
          ● BEATS
        </div>
      </div>
    </motion.button>
  );
}
