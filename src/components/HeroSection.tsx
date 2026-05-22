"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  const { personal } = portfolioData;

  return (
    <section className="min-h-[90vh] flex items-center">
      <div className="mx-auto max-w-5xl px-6 py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-accent" />
            <span className="text-sm text-muted font-mono">
              Hello, I&apos;m
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            {personal.name}
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted leading-relaxed mb-4"
          >
            {personal.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="text-base text-muted leading-relaxed mb-10 max-w-lg"
          >
            Building clean, performant applications at the intersection of
            software engineering and machine learning. Based in{" "}
            {personal.location}.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View projects
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-sm font-medium text-foreground hover:bg-card transition-colors"
            >
              Get in touch
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center gap-3 mt-12"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-muted hover:text-foreground hover:bg-card transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-muted hover:text-foreground hover:bg-card transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
