"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageToggle } from "./ui/LanguageToggle";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-pyxis-fg/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <a
          href={`mailto:${t.footer.email}`}
          className="text-sm text-pyxis-fg/70 hover:text-pyxis-accent"
        >
          {t.footer.email}
        </a>
        <div className="flex items-center gap-6">
          <LanguageToggle />
          <span className="text-sm text-pyxis-fg/50">
            © {year} {t.footer.copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
