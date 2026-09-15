"use client";

import type { MouseEvent } from "react";
import { useContact } from "@/lib/contact/ContactContext";

type MailtoButtonProps = {
  email: string;
  label: string;
  subject?: string;
  variant?: "solid" | "outline";
  size?: "md" | "sm";
};

const base =
  "group inline-flex items-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out active:translate-y-0 active:scale-[0.98]";

const variants = {
  solid:
    "bg-[linear-gradient(180deg,#eac57c_0%,#d9a54d_55%,#c9933c_100%)] text-pyxis-bg shadow-[0_0_0_1px_rgba(217,165,77,0.35),0_10px_30px_-10px_rgba(217,165,77,0.55)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(234,197,124,0.6),0_16px_40px_-10px_rgba(217,165,77,0.75)]",
  outline:
    "border border-pyxis-accent/35 text-pyxis-fg/90 hover:border-pyxis-accent hover:bg-pyxis-accent/10 hover:text-pyxis-accent-soft",
};

const sizes = {
  md: "px-6 py-3 text-sm",
  sm: "px-4 py-2 text-[13px]",
};

/**
 * Contact call to action. It is a real mailto: link, so middle-click,
 * copy-link and assistive tech keep working; a plain click opens the contact
 * panel instead, because mailto alone does nothing on machines without a
 * default mail client.
 */
export function MailtoButton({
  email,
  label,
  subject,
  variant = "solid",
  size = "md",
}: MailtoButtonProps) {
  const { available, openContact } = useContact();
  const href = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!available) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    openContact();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      data-variant={variant}
      className={`${base} ${variants[variant]} ${sizes[size]}`}
    >
      {label}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
