"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The Pyxis mark. Pyxis is the constellation of the mariner's compass, so the
 * mark is a compass rose: a single brass ring with four cardinal ticks and a
 * four-point star whose north point is long and bright, the rest quiet.
 *
 * Below 48px the strokes thicken and the inner dial disappears so the mark
 * still reads in the header and as a favicon.
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
  const sw = small ? 2.6 : 1.3;

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
          <stop offset="0" stopColor="#f3d68f" />
          <stop offset="0.5" stopColor="#d9a54d" />
          <stop offset="1" stopColor="#a8762a" />
        </linearGradient>
        <linearGradient id={`${id}-brass-h`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a8762a" />
          <stop offset="0.5" stopColor="#d9a54d" />
          <stop offset="1" stopColor="#f3d68f" />
        </linearGradient>
        <radialGradient id={`${id}-halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d9a54d" stopOpacity="0.3" />
          <stop offset="1" stopColor="#d9a54d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {!small && <circle cx="50" cy="50" r="50" fill={`url(#${id}-halo)`} />}

      {/* Dial: one ring with cardinal ticks, turning very slowly */}
      <motion.g
        style={{ originX: "50px", originY: "50px" }}
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 160, ease: "linear", repeat: Infinity }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={`url(#${id}-brass`}
          strokeOpacity={small ? 0.95 : 0.75}
          strokeWidth={sw}
        />
        {[0, 90, 180, 270].map((deg) => (
          <line
            key={deg}
            x1="50"
            y1="5"
            x2="50"
            y2={small ? "11" : "10"}
            stroke="#d9a54d"
            strokeOpacity="0.9"
            strokeWidth={sw}
            strokeLinecap="round"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
        {!small && (
          <circle
            cx="50"
            cy="50"
            r="33"
            stroke="#d9a54d"
            strokeOpacity="0.22"
            strokeWidth="0.8"
            strokeDasharray="0.8 3.4"
          />
        )}
      </motion.g>

      {/* Rose: settles like a real needle, then holds north */}
      <motion.g
        style={{ originX: "50px", originY: "50px" }}
        initial={shouldReduceMotion ? false : { rotate: -16 }}
        animate={shouldReduceMotion ? undefined : { rotate: [-16, 10, -4, 1.5, 0] }}
        transition={{ duration: 3.2, ease: "easeOut", times: [0, 0.35, 0.6, 0.82, 1] }}
      >
        {/* East and west points, short and quiet */}
        <path d="M78 50 L50 54.5 L50 45.5 Z" fill={`url(#${id}-brass-h)`} fillOpacity={small ? 0.55 : 0.45} />
        <path d="M22 50 L50 54.5 L50 45.5 Z" fill={`url(#${id}-brass-h)`} fillOpacity={small ? 0.55 : 0.45} />
        {/* South point, dim */}
        <path d="M50 88 L56 50 L44 50 Z" fill="#f2f1ee" fillOpacity={small ? 0.4 : 0.26} />
        {/* North point, long and bright */}
        <path
          d="M50 8 L56 50 L44 50 Z"
          fill={`url(#${id}-brass)`}
          data-testid="compass-needle"
        />
        {/* Light edge on the north point */}
        {!small && <path d="M50 8 L44 50 L50 50 Z" fill="#fff" fillOpacity="0.16" />}
      </motion.g>

      {/* Pivot */}
      <circle cx="50" cy="50" r={small ? 4.2 : 3.4} fill="#07080b" stroke={`url(#${id}-brass)`} strokeWidth={sw} />
      <circle cx="50" cy="50" r={small ? 1.5 : 1.2} fill="#f3d68f" />
    </svg>
  );
}
