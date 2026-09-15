"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";
import { StepGrid } from "./ui/StepGrid";

export function Ventures() {
  const { t } = useLanguage();

  return (
    <section id="ventures" className="mx-auto max-w-5xl px-6 pt-32 pb-16">
      <RevealOnScroll>
        <SectionEyebrow>{t.ventures.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.ventures.headlinePre}{" "}
          <Emphasis>{t.ventures.headlineEmphasis}</Emphasis>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-pyxis-fg/80">
          {t.ventures.body}
        </p>
      </RevealOnScroll>

      <StepGrid steps={t.ventures.pillars} />
    </section>
  );
}
