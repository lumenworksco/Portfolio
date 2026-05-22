"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import PageTransition from "./PageTransition";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: portfolioData.personal.email,
    href: `mailto:${portfolioData.personal.email}`,
    description: "Drop me a line anytime",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "florianbraun",
    href: portfolioData.personal.github,
    description: "Check out my open-source work",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "florianbraun",
    href: portfolioData.personal.linkedin,
    description: "Let's connect professionally",
  },
];

export default function ContactContent() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16 max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Get in touch
          </h1>
          <p className="text-muted leading-relaxed">
            I&apos;m always open to discussing new opportunities, interesting
            projects, or just having a chat about technology. Feel free to reach
            out through any of the channels below.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactMethods.map((method, i) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.label !== "Email" ? "_blank" : undefined}
              rel={
                method.label !== "Email" ? "noopener noreferrer" : undefined
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: "easeOut" as const,
              }}
              className="group rounded-xl border border-border bg-card p-6 hover:bg-card-hover hover:border-accent/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <method.icon size={20} className="text-accent" />
                <ArrowUpRight
                  size={14}
                  className="text-muted group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <h2 className="font-semibold mb-1">{method.label}</h2>
              <p className="text-sm text-muted mb-2">{method.description}</p>
              <p className="text-sm font-mono text-muted group-hover:text-foreground transition-colors">
                {method.value}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Additional note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 p-6 rounded-xl border border-border bg-card"
        >
          <p className="text-sm text-muted leading-relaxed">
            <span className="text-foreground font-medium">
              Currently seeking:
            </span>{" "}
            Internship opportunities in software engineering for Summer 2026.
            Particularly interested in full-stack development, distributed
            systems, and machine learning infrastructure roles.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
