"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { MailtoButton } from "./ui/MailtoButton";
import { Emphasis } from "./ui/Emphasis";

export function FinalCta() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <RevealOnScroll>
        <h2 className="font-display text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.finalCta.headlinePre} <Emphasis>{t.finalCta.headlineEmphasis}</Emphasis>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-pyxis-fg/80">
          {t.finalCta.body}
        </p>
        <div className="mt-10">
          <MailtoButton email={t.footer.email} label={t.finalCta.cta} />
        </div>
      </RevealOnScroll>
    </section>
  );
}
