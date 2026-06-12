"use client";

import { useRef, MouseEvent } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // degrees max tilt, default 12
  glare?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 12,
  glare = true,
}: Props) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0..1
    const y = (e.clientY - rect.top)  / rect.height; // 0..1
    const rotX = (0.5 - y) * intensity;
    const rotY = (x - 0.5) * intensity;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025,1.025,1.025)`;
    el.style.transition = "transform 0.1s ease-out";

    if (glare && glareRef.current) {
      const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI);
      glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.12) 0%, transparent 60%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
    if (glare && glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{ willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{ zIndex: 10 }}
        />
      )}
    </div>
  );
}
