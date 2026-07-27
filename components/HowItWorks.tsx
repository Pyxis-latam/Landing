"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-32">
      <RevealOnScroll>
        <SectionEyebrow>{t.howItWorks.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.howItWorks.headlinePre}{" "}
          <Emphasis>{t.howItWorks.headlineEmphasis}</Emphasis>
        </h2>
      </RevealOnScroll>
      <div className="mt-16 grid gap-10 sm:grid-cols-3">
        {t.howItWorks.steps.map((step, index) => (
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
    </section>
  );
}
