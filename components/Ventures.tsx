"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";
import { StepGrid } from "./ui/StepGrid";

export function Ventures() {
  const { t } = useLanguage();

  return (
    <section id="ventures" className="mx-auto max-w-5xl px-6 pb-20 pt-36">
      <RevealOnScroll>
        <SectionEyebrow>{t.ventures.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-pyxis-fg sm:text-5xl md:text-6xl">
          {t.ventures.headlinePre}{" "}
          <Emphasis>{t.ventures.headlineEmphasis}</Emphasis>
        </h2>
        <p className="mt-7 max-w-[60ch] text-base leading-relaxed text-pyxis-fg/65 sm:text-lg">
          {t.ventures.body}
        </p>
      </RevealOnScroll>

      <StepGrid steps={t.ventures.pillars} />
    </section>
  );
}
