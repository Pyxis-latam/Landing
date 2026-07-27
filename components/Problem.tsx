"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";

export function Problem() {
  const { t } = useLanguage();

  return (
    <section id="problem" className="mx-auto max-w-4xl px-6 py-32">
      <RevealOnScroll>
        <SectionEyebrow>{t.problem.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.problem.headlinePre} <Emphasis>{t.problem.headlineEmphasis}</Emphasis>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-pyxis-fg/80">
          {t.problem.body}
        </p>
      </RevealOnScroll>
    </section>
  );
}
