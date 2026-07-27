"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The Pyxis compass. Pyxis is the constellation of the mariner's compass, so
 * this mark fuses a slowly rotating compass rose with the real Pyxis star
 * pattern (Alpha, Beta, Gamma and Kappa Pyxidis) twinkling on top.
 */
export function PyxisCompass({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  // Approximate relative positions of the Pyxis stars, laid out on the dial.
  const stars = [
    { cx: 50, cy: 24, r: 1.9, delay: 0 }, // Alpha
    { cx: 46, cy: 40, r: 1.5, delay: 0.6 }, // Beta
    { cx: 52, cy: 56, r: 1.7, delay: 1.2 }, // Gamma
    { cx: 60, cy: 70, r: 1.1, delay: 1.8 }, // Kappa
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="Brújula de Pyxis"
      className={className}
    >
      {/* Slowly rotating outer dial */}
      <motion.g
        style={{ originX: "50px", originY: "50px" }}
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        <circle cx="50" cy="50" r="46" stroke="#d9a54d" strokeOpacity="0.35" strokeWidth="1" />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#d9a54d"
          strokeOpacity="0.2"
          strokeWidth="0.75"
          strokeDasharray="1 3"
        />
        {/* Tick marks every 30° */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="6"
            x2="50"
            y2={i % 3 === 0 ? "12" : "9"}
            stroke="#d9a54d"
            strokeOpacity={i % 3 === 0 ? 0.6 : 0.3}
            strokeWidth="1"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
      </motion.g>

      {/* Compass rose */}
      <g stroke="#d9a54d" strokeWidth="1" strokeLinejoin="round">
        <path d="M50 14 L55 50 L50 86 L45 50 Z" fill="#d9a54d" fillOpacity="0.12" />
        <path d="M14 50 L50 45 L86 50 L50 55 Z" fill="#d9a54d" fillOpacity="0.06" />
      </g>

      {/* Pyxis constellation lines */}
      <path
        d={`M${stars[0].cx} ${stars[0].cy} L${stars[1].cx} ${stars[1].cy} L${stars[2].cx} ${stars[2].cy} L${stars[3].cx} ${stars[3].cy}`}
        stroke="#f2f1ee"
        strokeOpacity="0.5"
        strokeWidth="0.75"
      />
      {/* Pyxis stars, twinkling */}
      {stars.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="#f2f1ee"
          animate={shouldReduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={{
            duration: 2.4,
            ease: "easeInOut",
            repeat: Infinity,
            delay: s.delay,
          }}
        />
      ))}
      {/* Center pivot */}
      <circle cx="50" cy="50" r="2.4" fill="#d9a54d" />
    </svg>
  );
}
