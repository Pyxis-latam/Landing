"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";

export function Team() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="team" className="mx-auto max-w-4xl px-6 py-32">
      <RevealOnScroll>
        <SectionEyebrow>{t.team.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.team.headlinePre} <Emphasis>{t.team.headlineEmphasis}</Emphasis>
        </h2>
        <p className="mt-4 text-sm text-pyxis-fg/60">{t.team.expandHint}</p>
      </RevealOnScroll>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {t.team.members.map((member, index) => {
          const isOpen = openIndex === index;
          const panelId = `member-panel-${index}`;
          return (
            <RevealOnScroll key={member.name} delay={index * 0.15}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-pyxis-accent/40 bg-pyxis-panel"
                    : "border-pyxis-fg/10 bg-pyxis-panel/40 hover:border-pyxis-accent/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group flex w-full items-center gap-4 p-4 text-left"
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-pyxis-accent/30">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-bold text-pyxis-fg group-hover:text-pyxis-accent">
                      {member.name}
                    </span>
                    <span className="block text-sm text-pyxis-fg/70">
                      {member.role}
                    </span>
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-pyxis-accent"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-pyxis-fg/10 px-4 pb-5 pt-4">
                        <p className="text-sm leading-relaxed text-pyxis-fg/80">
                          {member.bio}
                        </p>

                        <p className="font-mono-label mt-5 text-xs uppercase tracking-[0.2em] text-pyxis-accent">
                          {t.team.experienceLabel}
                        </p>
                        <ul className="mt-3 space-y-2">
                          {member.experiences.map((exp) => (
                            <li key={exp.org} className="flex gap-3 text-sm">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pyxis-accent" />
                              <span className="min-w-0">
                                <span className="flex flex-wrap items-baseline gap-x-2">
                                  <span className="font-medium text-pyxis-fg">
                                    {exp.org}
                                  </span>
                                  <span className="font-mono-label text-[10px] uppercase tracking-widest text-pyxis-fg/40">
                                    {exp.period}
                                  </span>
                                </span>
                                <span className="block text-pyxis-fg/60">
                                  {exp.role}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>

                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-pyxis-accent hover:underline"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z" />
                          </svg>
                          {t.team.linkedinLabel}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
