"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function FeaturedProjects() {
  const featured = portfolioData.projects.filter((p) => p.featured);

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Featured work
            </h2>
            <p className="text-sm text-muted mt-1">
              A selection of recent projects
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            All projects
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-4">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: "easeOut" as const,
              }}
              className="group rounded-xl border border-border bg-card p-6 hover:bg-card-hover transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-background text-muted border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-2 shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-muted hover:text-foreground hover:bg-background transition-colors"
                      aria-label={`${project.title} source code`}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-md text-muted hover:text-foreground hover:bg-background transition-colors"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            View all projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
