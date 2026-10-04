"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const SAGE = "#65a30d";

// CalmCampus door, docked under PocketOperator on the left edge — same
// "peek in, slide out on hover" language as the other tabs.
export default function CalmTab({ href }: { href: string }) {
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const awake = hovered;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open CalmCampus at calm.braunf.com (opens in a new tab)"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={{ x: -58 }}
      animate={{ x: awake ? 0 : -58 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        position: "fixed",
        left: 0,
        top: "calc(50% + 52px)",
        translate: "0 -50%",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        width: "76px",
        height: "92px",
        textDecoration: "none",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        background: "linear-gradient(155deg, #f4f8ec 0%, #dcebc4 100%)",
        border: `1px solid ${SAGE}66`,
        borderLeft: "none",
        borderRadius: "0 10px 10px 0",
        boxShadow: awake
          ? `0 8px 26px rgba(0,0,0,0.5), 0 0 22px ${SAGE}40`
          : "0 4px 14px rgba(0,0,0,0.4)",
      }}
    >
      <motion.div
        animate={reducedMotion ? {} : { rotate: awake ? 20 : 0, scale: awake ? 1.1 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ marginLeft: "auto", marginRight: "6px" }}
      >
        <Leaf size={28} color={SAGE} strokeWidth={1.8} />
      </motion.div>
      <p
        style={{
          margin: 0,
          marginLeft: "auto",
          marginRight: "6px",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "8px",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#3f6212",
          whiteSpace: "nowrap",
        }}
      >
        {awake ? "Calm ▸" : "Campus"}
      </p>
    </motion.a>
  );
}
