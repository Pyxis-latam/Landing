"use client";

import { RevealOnScroll } from "./RevealOnScroll";

export type Step = { number: string; title: string; body: string };

export function StepGrid({ steps }: { steps: ReadonlyArray<Step> }) {
  return (
    <div className="mt-16 grid gap-10 sm:grid-cols-3">
      {steps.map((step, index) => (
        <RevealOnScroll key={step.number} delay={index * 0.15}>
          <span className="font-mono-label text-sm text-pyxis-accent">
            {step.number}
          </span>
          <h3 className="font-display mt-3 text-xl font-bold text-pyxis-fg">
            {step.title}
          </h3>
          <p className="mt-2 text-pyxis-fg/80">{step.body}</p>
        </RevealOnScroll>
      ))}
    </div>
  );
}
