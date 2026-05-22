"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import PageTransition from "./PageTransition";

export default function ProjectsContent() {
  const { projects } = portfolioData;

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Projects
          </h1>
          <p className="text-muted">
            Things I&apos;ve built and contributed to.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: "easeOut" as const,
              }}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 hover:bg-card-hover transition-colors"
            >
              {/* Top: title + links */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-lg font-semibold group-hover:text-accent transition-colors">
                  {project.title}
                </h2>
                <div className="flex items-center gap-1 shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-muted hover:text-foreground transition-colors"
                      aria-label={`${project.title} source code`}
                    >
                      <Github size={15} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-muted hover:text-foreground transition-colors"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-background text-muted border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Featured badge */}
              {project.featured && (
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-accent">
                    Featured
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
