"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The Pyxis mark. Pyxis is the constellation of the mariner's compass, so the
 * mark is a single brass dial with a long north needle, and the four stars of
 * Pyxis (Alpha, Beta, Gamma, Kappa) set into the upper-right quadrant.
 *
 * Strokes thicken below 48px so the mark still reads in the header and as a
 * favicon; the constellation lines are dropped there because they turn to mud.
 */
export function PyxisCompass({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const small = size < 48;
  const sw = small ? 2.4 : 1.25;

  // Pyxis stars, laid out on the dial (relative positions of α, β, γ, κ Pyx).
  const stars = [
    { cx: 64, cy: 22, r: 2.1, delay: 0 },
    { cx: 70, cy: 33, r: 1.5, delay: 0.7 },
    { cx: 74, cy: 45, r: 1.8, delay: 1.3 },
    { cx: 80, cy: 57, r: 1.2, delay: 2 },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="Pyxis"
      data-scale={small ? "small" : "large"}
      className={className}
    >
      <title>Pyxis</title>
      <defs>
        <linearGradient id={`${id}-brass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0d08a" />
          <stop offset="0.55" stopColor="#d9a54d" />
          <stop offset="1" stopColor="#a67529" />
        </linearGradient>
        <radialGradient id={`${id}-halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d9a54d" stopOpacity="0.28" />
          <stop offset="1" stopColor="#d9a54d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {!small && <circle cx="50" cy="50" r="50" fill={`url(#${id}-halo)`} />}

      {/* Dial: one ring with cardinal and minor ticks, turning very slowly */}
      <motion.g
        style={{ originX: "50px", originY: "50px" }}
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 120, ease: "linear", repeat: Infinity }}
      >
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke={`url(#${id}-brass)`}
          strokeOpacity={small ? 0.9 : 0.7}
          strokeWidth={sw}
        />
        {Array.from({ length: small ? 4 : 24 }).map((_, i) => {
          const step = small ? 90 : 15;
          const cardinal = (i * step) % 90 === 0;
          if (small && !cardinal) return null;
          return (
            <line
              key={i}
              x1="50"
              y1="6"
              x2="50"
              y2={cardinal ? 13 : 9.5}
              stroke="#d9a54d"
              strokeOpacity={cardinal ? 0.9 : 0.4}
              strokeWidth={cardinal ? sw : sw * 0.7}
              strokeLinecap="round"
              transform={`rotate(${i * step} 50 50)`}
            />
          );
        })}
      </motion.g>

      {/* Needle: settles like a real compass, then holds north */}
      <motion.g
        style={{ originX: "50px", originY: "50px" }}
        initial={shouldReduceMotion ? false : { rotate: -14 }}
        animate={shouldReduceMotion ? undefined : { rotate: [-14, 9, -4, 1.5, 0] }}
        transition={{ duration: 3.2, ease: "easeOut", times: [0, 0.35, 0.6, 0.82, 1] }}
      >
        {/* North half, brass */}
        <path
          d="M50 12 L55.5 50 L44.5 50 Z"
          fill={`url(#${id}-brass)`}
          data-testid="compass-needle"
        />
        {/* South half, dim */}
        <path d="M50 88 L55.5 50 L44.5 50 Z" fill="#f2f1ee" fillOpacity={small ? 0.35 : 0.22} />
        {/* East–west crossbar */}
        <line
          x1="22"
          y1="50"
          x2="78"
          y2="50"
          stroke="#f2f1ee"
          strokeOpacity={small ? 0.5 : 0.3}
          strokeWidth={sw * 0.8}
          strokeLinecap="round"
        />
      </motion.g>

      {/* Pyxis stars in the upper-right quadrant */}
      {!small && (
        <path
          d={`M${stars[0].cx} ${stars[0].cy} L${stars[1].cx} ${stars[1].cy} L${stars[2].cx} ${stars[2].cy} L${stars[3].cx} ${stars[3].cy}`}
          stroke="#f2f1ee"
          strokeOpacity="0.45"
          strokeWidth="0.8"
        />
      )}
      {!small &&
        stars.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#f2f1ee"
            animate={shouldReduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity, delay: s.delay }}
          />
        ))}

      {/* Pivot */}
      <circle cx="50" cy="50" r={small ? 4 : 3.2} fill="#07080b" stroke={`url(#${id}-brass)`} strokeWidth={sw} />
      <circle cx="50" cy="50" r={small ? 1.4 : 1.1} fill="#f0d08a" />
    </svg>
  );
}
