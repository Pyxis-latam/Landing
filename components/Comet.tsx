"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A comet that periodically streaks diagonally across its container. The SVG
 * already draws the tail pointing up-right and the glowing head down-left, so
 * the whole element simply travels along that same down-left diagonal.
 */
export function Comet() {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-0"
      initial={{ x: "108vw", y: "-24vh", opacity: 0 }}
      animate={{
        x: ["108vw", "-28vw"],
        y: ["-24vh", "112vh"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 6,
        ease: "easeIn",
        times: [0, 0.08, 0.9, 1],
        repeat: Infinity,
        repeatDelay: 9,
      }}
    >
      <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
        <defs>
          <linearGradient id="cometTail" x1="220" y1="20" x2="70" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d9a54d" stopOpacity="0" />
            <stop offset="1" stopColor="#f2f1ee" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="cometHead" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#ffffff" />
            <stop offset="0.4" stopColor="#f2f1ee" />
            <stop offset="1" stopColor="#d9a54d" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M220 20 L70 150" stroke="url(#cometTail)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M212 34 L74 150" stroke="url(#cometTail)" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round" />
        <circle cx="70" cy="150" r="16" fill="url(#cometHead)" />
        <circle cx="70" cy="150" r="3.2" fill="#ffffff" />
      </svg>
    </motion.div>
  );
}
