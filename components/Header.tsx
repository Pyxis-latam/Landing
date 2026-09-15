"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageToggle } from "./ui/LanguageToggle";
import { MailtoButton } from "./ui/MailtoButton";
import { PyxisCompass } from "./PyxisCompass";

export function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#labs", label: t.nav.labs },
    { href: "#ventures", label: t.nav.ventures },
    { href: "#team", label: t.nav.team },
  ];

  return (
    <header
      data-testid="header"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-pyxis-bg/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <PyxisCompass size={28} />
          <span className="font-display text-sm font-bold tracking-widest text-pyxis-fg">
            PYXIS
          </span>
        </a>
        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-pyxis-fg/80 hover:text-pyxis-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <MailtoButton email={t.footer.email} label={t.cta.talk} />
        </div>
      </div>
    </header>
  );
}
