"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import PageTransition from "./PageTransition";

export default function ExperienceContent() {
  const { experience, education } = portfolioData;

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Experience
          </h1>
          <p className="text-muted">
            Where I&apos;ve worked and what I&apos;ve studied.
          </p>
        </div>

        {/* Work Experience */}
        <div className="mb-20">
          <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-8">
            Work
          </h2>

          <div className="space-y-1">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: "easeOut" as const,
                }}
                className="group rounded-xl border border-border bg-card p-6 hover:bg-card-hover transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                  <div>
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-sm text-accent">{exp.company}</p>
                    <p className="text-xs text-muted">{exp.location}</p>
                  </div>
                  <span className="text-sm text-muted whitespace-nowrap font-mono">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>

                <ul className="space-y-2">
                  {exp.description.map((d, j) => (
                    <li
                      key={j}
                      className="text-sm text-muted leading-relaxed flex gap-2"
                    >
                      <span className="text-border mt-1.5 shrink-0">
                        &#8212;
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {exp.techStack && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-background text-muted border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xs font-medium text-muted uppercase tracking-widest mb-8">
            Education
          </h2>

          <div className="space-y-1">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: "easeOut" as const,
                }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-accent">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-muted whitespace-nowrap font-mono">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>

                {edu.gpa && (
                  <p className="text-xs text-muted mb-4">GPA: {edu.gpa}</p>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="text-xs px-2 py-0.5 rounded bg-background border border-border text-muted"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
