"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";

export function Divisions() {
  const { t } = useLanguage();

  return (
    <section id="divisions" className="mx-auto max-w-5xl px-6 py-32">
      <RevealOnScroll>
        <SectionEyebrow>{t.divisions.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.divisions.headlinePre}{" "}
          <Emphasis>{t.divisions.headlineEmphasis}</Emphasis>
        </h2>
      </RevealOnScroll>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {t.divisions.items.map((item, index) => (
          <RevealOnScroll key={item.code} delay={index * 0.15}>
            <a
              href={item.href}
              className="group flex h-full flex-col rounded-2xl border border-pyxis-fg/10 bg-pyxis-panel/40 p-8 transition-colors duration-300 hover:border-pyxis-accent/40 hover:bg-pyxis-panel"
            >
              <span className="font-mono-label text-xs tracking-[0.3em] text-pyxis-accent">
                {item.code}
              </span>
              <h3 className="font-display mt-4 text-2xl font-bold text-pyxis-fg sm:text-3xl">
                {item.name}
              </h3>
              <p className="mt-2 font-display italic text-pyxis-accent">
                {item.tagline}
              </p>
              <p className="mt-4 flex-1 text-pyxis-fg/80">{item.body}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-pyxis-fg/70 transition-colors group-hover:text-pyxis-accent">
                {item.linkLabel}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-y-0.5"
                >
                  <path
                    d="M12 5v14M6 13l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
