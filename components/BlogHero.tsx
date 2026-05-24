"use client";

import { useEffect, useRef, useState } from "react";

export default function BlogHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animated particle grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const count = 60;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const words = ["React", "Next.js", "TypeScript", "Performance", "Architecture", "JavaScript"];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#06080d]" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-[#00d4ff]/5 blur-[100px] animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-[#a855f7]/5 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-4xl">
          {/* Label */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 mb-8 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
            <span className="text-[#00d4ff] font-['Outfit',sans-serif] text-xs font-semibold tracking-[0.15em] uppercase">
              Technical Blog
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6">
            <span
              className={`block font-['Outfit',sans-serif] text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight transition-all duration-700 delay-100 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Frontend Engineering
            </span>
            <span
              className={`block font-['Outfit',sans-serif] text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mt-1 transition-all duration-700 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#38bdf8] to-[#a855f7]">
                Insights
              </span>
              <span className="text-white"> & Ideas</span>
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-[#8892a4] text-lg md:text-xl leading-relaxed max-w-2xl mb-10 font-['DM_Sans',sans-serif] transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Real solutions from 9.5+ years of building production applications at enterprise scale.
            Deep dives into React, performance optimization, and system architecture.
          </p>

          {/* Animated floating tags */}
          <div
            className={`flex flex-wrap gap-3 transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {words.map((word, i) => (
              <span
                key={word}
                className="px-4 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#8892a4] text-sm font-['Outfit',sans-serif] font-medium hover:border-[#00d4ff]/40 hover:text-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,212,255,0.1)]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className={`mt-16 grid grid-cols-3 gap-6 max-w-lg transition-all duration-700 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {[
            { value: "9.5+", label: "Years Experience" },
            { value: "40%", label: "Perf Improvement" },
            { value: "5+", label: "Enterprise Clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="font-['Outfit',sans-serif] text-2xl md:text-3xl font-black text-white group-hover:text-[#00d4ff] transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-[#5a6477] text-xs font-medium mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06080d] to-transparent" />
    </section>
  );
}
