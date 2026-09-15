"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";
import { StepGrid } from "./ui/StepGrid";
import { PhaseTimeline } from "./ui/PhaseTimeline";

export function Labs() {
  const { t } = useLanguage();

  return (
    <section id="labs" className="mx-auto max-w-5xl px-6 py-32">
      <RevealOnScroll>
        <SectionEyebrow>{t.labs.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.labs.headlinePre} <Emphasis>{t.labs.headlineEmphasis}</Emphasis>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-pyxis-fg/80">{t.labs.body}</p>
      </RevealOnScroll>

      <StepGrid steps={t.labs.steps} />

      <div className="mt-32">
        <RevealOnScroll>
          <SectionEyebrow>{t.labs.phasesEyebrow}</SectionEyebrow>
          <h3 className="font-display mt-4 text-2xl font-bold text-pyxis-fg sm:text-4xl">
            {t.labs.phasesHeadlinePre}{" "}
            <Emphasis>{t.labs.phasesHeadlineEmphasis}</Emphasis>
          </h3>
        </RevealOnScroll>
        <PhaseTimeline phases={t.labs.phases} lineTestId="labs-line" />
      </div>
    </section>
  );
}
