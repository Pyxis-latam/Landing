"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "./RevealOnScroll";

export type Phase = { label: string; title: string; body: string };

type PhaseTimelineProps = {
  phases: ReadonlyArray<Phase>;
  lineTestId: string;
};

export function PhaseTimeline({ phases, lineTestId }: PhaseTimelineProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mt-20">
      <svg
        className="absolute left-0 top-[5px] hidden w-full sm:block"
        height="2"
        preserveAspectRatio="none"
        data-testid={lineTestId}
      >
        <motion.line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="#D9A54D"
          strokeWidth="2"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>
      <div className="grid gap-12 sm:grid-cols-3">
        {phases.map((phase, index) => (
          <RevealOnScroll key={phase.label} delay={index * 0.2}>
            <div className="relative pt-8">
              <span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-pyxis-accent" />
              <span className="font-mono-label text-xs tracking-widest text-pyxis-accent">
                {phase.label}
              </span>
              <h3 className="font-display mt-2 text-xl font-bold text-pyxis-fg">
                {phase.title}
              </h3>
              <p className="mt-2 text-pyxis-fg/80">{phase.body}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
