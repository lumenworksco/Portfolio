"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap, Award } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import PageTransition from "./PageTransition";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function AboutContent() {
  const { personal, skills, education } = portfolioData;

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            About me
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin size={14} />
            <span>{personal.location}</span>
          </div>
        </div>

        {/* Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          <div className="lg:col-span-2 space-y-4">
            {personal.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-muted leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Profile placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-center lg:justify-end"
          >
            <div className="w-48 h-48 rounded-2xl bg-card border border-border flex items-center justify-center">
              <span className="text-4xl font-bold text-muted/30">FB</span>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <div className="mb-24">
          <h2 className="text-xl font-semibold tracking-tight mb-8">
            Technologies I work with
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category, i) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                  ease: "easeOut" as const,
                }}
              >
                <h3 className="text-xs font-medium text-muted uppercase tracking-wider mb-3">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="text-sm px-2.5 py-1 rounded-md bg-card border border-border text-muted hover:text-foreground hover:border-accent/30 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-8">
            Education
          </h2>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div className="flex items-start gap-3">
                  <GraduationCap
                    size={18}
                    className="text-accent mt-0.5 shrink-0"
                  />
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-muted">{edu.institution}</p>
                    <p className="text-xs text-muted">{edu.location}</p>
                  </div>
                </div>
                <div className="text-right sm:text-right">
                  <span className="text-sm text-muted">
                    {edu.startDate} — {edu.endDate}
                  </span>
                  {edu.gpa && (
                    <p className="text-xs text-muted mt-0.5">
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              </div>

              {/* Coursework */}
              <div className="mt-6">
                <h4 className="text-xs font-medium text-muted uppercase tracking-wider mb-3">
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="text-xs px-2 py-1 rounded bg-background border border-border text-muted"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xs font-medium text-muted uppercase tracking-wider mb-3">
                    Achievements
                  </h4>
                  <div className="space-y-2">
                    {edu.achievements.map((achievement) => (
                      <div
                        key={achievement}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <Award size={13} className="text-accent shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
