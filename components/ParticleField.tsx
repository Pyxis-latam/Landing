"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  depth: number; // 0 = far/dim/slow, 1 = near/bright/fast
  driftX: number;
  driftY: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  warm: boolean;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
};

const MAX_DPR = 2;

// One star per ~9000 css px², so a phone gets ~60 stars and a desktop ~150.
function starCount(width: number, height: number) {
  return Math.max(60, Math.min(170, Math.round((width * height) / 9000)));
}

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: starCount(width, height) }, () => {
    const depth = Math.pow(Math.random(), 2.2); // most stars are far away
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.35 + depth * 1.4 + Math.random() * 0.3,
      depth,
      driftX: (Math.random() - 0.5) * 0.02 * (0.4 + depth),
      driftY: (Math.random() - 0.5) * 0.02 * (0.4 + depth),
      twinkleSpeed: Math.random() * 0.018 + 0.004,
      twinkleOffset: Math.random() * Math.PI * 2,
      // a small share of the stars glow warm brass, matching the accent
      warm: Math.random() < 0.16,
    };
  });
}

function spawnShootingStar(width: number, height: number): ShootingStar {
  const speed = Math.random() * 5 + 6;
  const angle = Math.PI * (0.72 + Math.random() * 0.12); // down-left
  return {
    x: Math.random() * width * 0.6 + width * 0.4,
    y: Math.random() * height * 0.35,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    len: Math.random() * 90 + 70,
    life: 0,
    maxLife: Math.random() * 40 + 40,
  };
}

/**
 * Starfield with two things a flat particle canvas lacks: depth (near stars are
 * larger, brighter, drift faster and parallax against the scroll) and a
 * DPR-aware bitmap so the stars stay crisp on retina displays.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let shootingStars: ShootingStar[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let animationId: number | undefined;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const scroll = window.scrollY || 0;

      for (const p of particles) {
        p.x = (p.x + p.driftX + width) % width;
        p.y = (p.y + p.driftY + height) % height;
        // near stars slide up slightly faster than the page: parallax
        const py = (p.y - scroll * p.depth * 0.12 + height * 4) % height;
        const twinkle =
          0.35 + 0.65 * Math.abs(Math.sin(frame * p.twinkleSpeed + p.twinkleOffset));
        const alpha = twinkle * (0.3 + p.depth * 0.55);
        const rgb = p.warm ? "234, 197, 124" : "242, 241, 238";

        if (p.depth > 0.8) {
          // soft halo on the nearest stars
          const g = ctx.createRadialGradient(p.x, py, 0, p.x, py, p.radius * 5);
          g.addColorStop(0, `rgba(${rgb}, ${alpha * 0.35})`);
          g.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, py, p.radius * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.fill();
      }

      if (!prefersReducedMotion && shootingStars.length < 1 && Math.random() < 0.0025) {
        shootingStars.push(spawnShootingStar(width, height));
      }

      shootingStars = shootingStars.filter((s) => s.life < s.maxLife);
      for (const s of shootingStars) {
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        const fade = Math.sin((s.life / s.maxLife) * Math.PI);
        const tailX = s.x - s.vx * (s.len / 10);
        const tailY = s.y - s.vy * (s.len / 10);
        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(242, 241, 238, ${fade})`);
        gradient.addColorStop(1, "rgba(242, 241, 238, 0)");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      frame += 1;
      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="particle-field"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
