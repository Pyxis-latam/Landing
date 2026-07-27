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
};

const PARTICLE_COUNT = 80;

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.2 + 0.3,
    driftX: (Math.random() - 0.5) * 0.05,
    driftY: (Math.random() - 0.5) * 0.05,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2,
  }));
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
        ctx.fillStyle = `rgba(242, 241, 238, ${twinkle})`;
        ctx.fill();
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
