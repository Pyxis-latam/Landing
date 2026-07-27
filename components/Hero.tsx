"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ParticleField } from "./ParticleField";
import { Comet } from "./Comet";
import { PyxisCompass } from "./PyxisCompass";
import { MailtoButton } from "./ui/MailtoButton";
import { Emphasis } from "./ui/Emphasis";

export function Hero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 80]
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-pyxis-bg"
    >
      <ParticleField />
      <Comet />
      <motion.div
        style={{ y: headlineY }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <div className="mb-6 flex flex-col items-center gap-3">
          <PyxisCompass size={72} />
          <p className="font-mono-label text-xs tracking-[0.3em] text-pyxis-accent">
            {t.hero.eyebrow}
          </p>
        </div>
        <h1 className="font-display text-4xl font-extrabold leading-tight text-pyxis-fg sm:text-6xl">
          {t.hero.headlinePre} <Emphasis>{t.hero.headlineEmphasis}</Emphasis>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-pyxis-fg/80">
          {t.hero.subheadline}
        </p>
        <div className="mt-10">
          <MailtoButton email={t.footer.email} label={t.hero.cta} />
        </div>
      </motion.div>
    </section>
  );
}
