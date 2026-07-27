"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionEyebrow } from "./ui/SectionEyebrow";
import { Emphasis } from "./ui/Emphasis";

export function Team() {
  const { t } = useLanguage();

  return (
    <section id="team" className="mx-auto max-w-4xl px-6 py-32">
      <RevealOnScroll>
        <SectionEyebrow>{t.team.eyebrow}</SectionEyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold text-pyxis-fg sm:text-5xl">
          {t.team.headlinePre} <Emphasis>{t.team.headlineEmphasis}</Emphasis>
        </h2>
      </RevealOnScroll>
      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        {t.team.members.map((member, index) => (
          <RevealOnScroll key={member.name} delay={index * 0.15}>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pyxis-panel font-display text-lg font-bold text-pyxis-accent">
                {member.initials}
              </span>
              <span>
                <span className="block font-display font-bold text-pyxis-fg group-hover:text-pyxis-accent">
                  {member.name}
                </span>
                <span className="block text-sm text-pyxis-fg/70">
                  {member.role}
                </span>
              </span>
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
