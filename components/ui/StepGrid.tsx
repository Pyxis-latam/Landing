"use client";

import { RevealOnScroll } from "./RevealOnScroll";

export type Step = { number: string; title: string; body: string };

/**
 * Three-column sequence. Each column opens with a hairline rule carrying a
 * short brass segment, and a large ghost numeral behind the title, so the
 * order reads before the words do.
 */
export function StepGrid({ steps }: { steps: ReadonlyArray<Step> }) {
  return (
    <div className="mt-20 grid gap-12 sm:grid-cols-3 sm:gap-8">
      {steps.map((step, index) => (
        <RevealOnScroll key={step.number} delay={index * 0.15}>
          <div className="relative border-t border-pyxis-line pt-7 before:absolute before:-top-px before:left-0 before:h-px before:w-12 before:bg-pyxis-accent">
            {/* Ghost numeral: drawn by CSS from data-number so it is not readable text */}
            <span
              aria-hidden="true"
              data-number={step.number}
              className="font-display pointer-events-none absolute right-0 top-3 select-none text-[5.5rem] font-semibold leading-none tracking-[-0.06em] text-pyxis-fg/[0.06] after:content-[attr(data-number)]"
            />
            <span className="font-mono-label text-[11px] tracking-[0.2em] text-pyxis-accent">
              {step.number}
            </span>
            <h3 className="font-display mt-4 text-[1.35rem] font-semibold tracking-[-0.02em] text-pyxis-fg">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[30ch] leading-relaxed text-pyxis-fg/65">{step.body}</p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
