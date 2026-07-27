"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
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

const PARTICLE_COUNT = 140;

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.3 + 0.3,
    driftX: (Math.random() - 0.5) * 0.05,
    driftY: (Math.random() - 0.5) * 0.05,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2,
    // a small share of the stars glow warm gold, matching the Pyxis accent
    warm: Math.random() < 0.14,
  }));
}

function spawnShootingStar(width: number, height: number): ShootingStar {
  const speed = Math.random() * 6 + 6;
  // travels down-left, like the comet
  const angle = Math.PI * (0.72 + Math.random() * 0.12);
  return {
    x: Math.random() * width * 0.6 + width * 0.4,
    y: Math.random() * height * 0.4,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    len: Math.random() * 80 + 60,
    life: 0,
    maxLife: Math.random() * 40 + 40,
  };
}

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

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let particles = createParticles(width, height);
    let shootingStars: ShootingStar[] = [];

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      particles = createParticles(width, height);
    };
    window.addEventListener("resize", handleResize);

    let frame = 0;
    let animationId: number | undefined;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x = (p.x + p.driftX + width) % width;
        p.y = (p.y + p.driftY + height) % height;
        const twinkle =
          0.4 + 0.6 * Math.abs(Math.sin(frame * p.twinkleSpeed + p.twinkleOffset));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.warm
          ? `rgba(217, 165, 77, ${twinkle})`
          : `rgba(242, 241, 238, ${twinkle})`;
        ctx.fill();
      }

      // Occasionally launch a shooting star (animated frames only)
      if (!prefersReducedMotion && shootingStars.length < 2 && Math.random() < 0.004) {
        shootingStars.push(spawnShootingStar(width, height));
      }

      shootingStars = shootingStars.filter((s) => s.life < s.maxLife);
      for (const s of shootingStars) {
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        const fade = 1 - s.life / s.maxLife;
        const tailX = s.x - s.vx * (s.len / 10);
        const tailY = s.y - s.vy * (s.len / 10);
        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(242, 241, 238, ${fade})`);
        gradient.addColorStop(1, "rgba(242, 241, 238, 0)");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      frame += 1;
      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
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
