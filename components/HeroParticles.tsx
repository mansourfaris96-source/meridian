"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  da: number; // alpha drift
}

const COUNT = 55;
const GOLD  = "201,168,83";

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Spawn particles
    const spawn = (): Particle => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.22,
      vy:    -Math.random() * 0.35 - 0.05,
      r:     Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.45 + 0.08,
      da:    (Math.random() - 0.5) * 0.003,
    });

    const particles: Particle[] = Array.from({ length: COUNT }, spawn);

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.da;

        // Clamp alpha and drift direction
        if (p.alpha <= 0.05 || p.alpha >= 0.55) p.da *= -1;

        // Wrap edges
        if (p.y < -5)             { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
        if (p.x < -5)             p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD},${p.alpha.toFixed(3)})`;
        ctx.fill();
      });
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
    />
  );
}
