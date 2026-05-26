"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────────── */
function useCountUp(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

/* ─────────────────────────────────────────────
   Intersection observer hook
───────────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   Animate on scroll wrapper
───────────────────────────────────────────── */
function AnimateIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Reading progress bar
───────────────────────────────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none">
      <div className="h-full bg-gradient-to-r from-amber-500 via-lime-500 to-emerald-500 transition-all duration-150 ease-out rounded-r-full shadow-sm shadow-amber-300/50" style={{ width: `${progress}%` }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Text-to-Speech Component (Lemon themed)
───────────────────────────────────────────── */
function ArticleTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<string[]>([]);
  const currentChunkRef = useRef(0);
  const startTimeRef = useRef(0);
  const elapsedBeforePauseRef = useRef(0);

  const articleText = `Data Protection... Why 68% of Websites Are Insecure. Let me tell you something surprising. Every 39 seconds, a cyberattack happens somewhere in the world. And here's the thing, most websites have basic vulnerabilities, that take less than an hour to fix! Based on analysis of 1.2 million websites worldwide, 68 percent have at least one vulnerability. 43 percent don't have HTTPS properly configured. 82 percent use outdated software components. And 57 percent? They have no Content Security Policy headers at all. The most common vulnerabilities include: Broken Access Control, at 94 percent. Cryptographic Failures, at 78 percent. And Injection Attacks, at 72 percent. Now, let me walk you through how a typical data breach happens. It follows 4 steps. First, the attacker scans for vulnerabilities, using automated bots. Second, they exploit weak points, like unpatched plugins or SQL injection. Third, data is extracted... including credentials, emails, and payment information. And finally, stolen data is sold on the dark web, or used for identity theft. The scary part? The average time from initial scan to data breach, is just 4.2 hours. But here's the good news! There are 8 essential fixes you can make right now. One, enable HTTPS with a free SSL certificate from Let's Encrypt. Two, implement strong authentication with 2FA. Three, add security headers like CSP and HSTS. Four, update your dependencies regularly. Five, validate all user input server-side. Six, enable rate limiting on API endpoints. Seven, handle errors without exposing internal details. And eight, configure CORS and cookies properly, with HttpOnly and Secure flags. Remember, security is not optional. With data breaches costing an average of 4.45 million dollars, every fix you make, protects real people's real data. Stay safe out there!`;

  const estimatedDuration = 4;

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);

  useEffect(() => {
    const sentences = articleText.match(/[^.!?]+[.!?]+/g) || [articleText];
    const chunks: string[] = [];
    let current = "";
    for (const sentence of sentences) {
      if ((current + sentence).length > 200) {
        if (current) chunks.push(current.trim());
        current = sentence;
      } else {
        current += sentence;
      }
    }
    if (current) chunks.push(current.trim());
    chunksRef.current = chunks;
  }, [articleText]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    // Priority: Premium/Enhanced natural female voices (sweet, human-like)
    const premiumFemale = [
      "Samantha (Enhanced)", "Samantha (Premium)", "Zoe (Enhanced)", "Zoe (Premium)",
      "Karen (Enhanced)", "Karen (Premium)", "Ava (Enhanced)", "Ava (Premium)",
      "Allison (Enhanced)", "Allison (Premium)", "Susan (Enhanced)", "Susan (Premium)",
      "Siri Female", "Microsoft Zira", "Microsoft Jenny", "Google US English",
      "Samantha", "Zoe", "Karen", "Ava", "Allison", "Fiona", "Moira", "Tessa",
    ];
    for (const name of premiumFemale) {
      const found = voices.find(v => v.name.includes(name) && v.lang.startsWith("en"));
      if (found) return found;
    }
    // Fallback: any female-sounding English voice
    const femaleVoice = voices.find(v => v.lang.startsWith("en") && /female|woman|girl|samantha|zoe|karen|ava|jenny|zira|fiona/i.test(v.name));
    if (femaleVoice) return femaleVoice;
    return voices.find(v => v.lang.startsWith("en")) || null;
  }, []);

  const speakChunk = useCallback((index: number) => {
    if (index >= chunksRef.current.length) {
      setIsPlaying(false); setIsPaused(false); setProgress(100);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimeout(() => setProgress(0), 2000);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(chunksRef.current[index]);
    utterance.rate = 0.92; utterance.pitch = 1.15; utterance.volume = 1; utterance.lang = "en-US";
    const voice = getVoice();
    if (voice) utterance.voice = voice;
    utterance.onend = () => {
      currentChunkRef.current = index + 1;
      setTimeout(() => {
        if (currentChunkRef.current < chunksRef.current.length) speakChunk(currentChunkRef.current);
        else { setIsPlaying(false); setIsPaused(false); setProgress(100); if (intervalRef.current) clearInterval(intervalRef.current); setTimeout(() => setProgress(0), 2000); }
      }, 100);
    };
    utterance.onerror = (e) => { if (e.error === "interrupted") return; setIsPlaying(false); setIsPaused(false); if (intervalRef.current) clearInterval(intervalRef.current); };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [getVoice]);

  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const totalMs = estimatedDuration * 60 * 1000;
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = elapsedBeforePauseRef.current + (Date.now() - startTimeRef.current);
      setProgress(Math.min((elapsed / totalMs) * 100, 99));
    }, 500);
  }, [estimatedDuration]);

  const handlePlay = () => {
    if (!isSupported) return;
    if (isPaused) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) { setIsPaused(false); setIsPlaying(true); startProgressTracking(); speakChunk(currentChunkRef.current); }
      else { window.speechSynthesis.resume(); setIsPaused(false); setIsPlaying(true); startProgressTracking(); }
      return;
    }
    window.speechSynthesis.cancel();
    currentChunkRef.current = 0; elapsedBeforePauseRef.current = 0;
    setProgress(0); setIsPlaying(true); startProgressTracking();
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => { speakChunk(0); window.speechSynthesis.onvoiceschanged = null; };
      setTimeout(() => { if (currentChunkRef.current === 0) speakChunk(0); }, 500);
    } else speakChunk(0);
  };

  const handlePause = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) window.speechSynthesis.cancel(); else window.speechSynthesis.pause();
    elapsedBeforePauseRef.current += Date.now() - startTimeRef.current;
    setIsPaused(true); setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false); setIsPaused(false); setProgress(0);
    currentChunkRef.current = 0; elapsedBeforePauseRef.current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  if (!isSupported) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-yellow-50 to-lime-50 p-5 shadow-md shadow-amber-100/50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-lime-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "700ms" }} />
      </div>
      <div className="relative flex items-center gap-4">
        <button
          type="button"
          onClick={isPlaying ? handlePause : handlePlay}
          onTouchEnd={(e) => { e.preventDefault(); (isPlaying ? handlePause : handlePlay)(); }}
          className={`relative flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg touch-manipulation ${
            isPlaying ? "bg-gradient-to-br from-amber-500 to-yellow-500 scale-110 shadow-amber-300/50"
            : isPaused ? "bg-gradient-to-br from-orange-400 to-amber-500 shadow-orange-300/50"
            : "bg-gradient-to-br from-amber-500 to-lime-500 hover:scale-105 shadow-amber-300/50"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying && <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />}
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3" /></svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-amber-900">
                {isPlaying ? "Now Playing" : isPaused ? "Paused" : "Listen to Article"}
              </span>
              {isPlaying && (
                <span className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="w-0.5 bg-amber-600 rounded-full animate-bounce" style={{ height: `${8 + Math.random() * 12}px`, animationDelay: `${i * 0.15}s`, animationDuration: "0.6s" }} />
                  ))}
                </span>
              )}
            </div>
            <span className="text-xs text-amber-700 font-medium">{estimatedDuration} min</span>
          </div>
          <div className="relative h-8 flex items-center">
            <div className="absolute inset-0 flex items-center gap-[2px]">
              {[...Array(50)].map((_, i) => {
                const isActive = (i / 50) * 100 <= progress;
                const height = Math.round((4 + Math.sin(i * 0.5) * 8 + Math.cos(i * 0.3) * 4) * 100) / 100;
                return (
                  <div key={i} className={`flex-1 rounded-full transition-all duration-300 ${isActive ? "bg-gradient-to-t from-amber-500 to-yellow-400" : "bg-amber-100"} ${isPlaying && isActive ? "animate-pulse" : ""}`}
                    style={{ height: `${isPlaying && isActive ? height + 2 : height}px`, animationDelay: `${i * 30}ms`, animationDuration: "0.8s" }} />
                );
              })}
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-amber-600">{Math.floor((progress / 100) * estimatedDuration)}:{String(Math.floor(((progress / 100) * estimatedDuration * 60) % 60)).padStart(2, "0")}</span>
            <span className="text-[10px] text-amber-600">{estimatedDuration}:00</span>
          </div>
        </div>
        {(isPlaying || isPaused) && (
          <button type="button" onClick={handleStop} onTouchEnd={(e) => { e.preventDefault(); handleStop(); }}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-white border border-amber-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all group shadow-sm touch-manipulation" aria-label="Stop">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400 group-hover:text-red-500 transition-colors"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG: Data Breach Flow Diagram
───────────────────────────────────────────── */
function ShieldHeroSVG() {
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[380px] mx-auto drop-shadow-xl" aria-hidden="true">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#65a30d" />
        </linearGradient>
        <linearGradient id="shieldInner" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fefce8" />
          <stop offset="100%" stopColor="#fef9c3" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <ellipse cx="200" cy="200" rx="170" ry="170" fill="none" stroke="#ca8a04" strokeWidth="0.5" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="200" cy="200" rx="150" ry="150" fill="none" stroke="#65a30d" strokeWidth="0.5" opacity="0.25">
        <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="25s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="70" cy="200" r="4" fill="#ca8a04" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
      </circle>
      <circle cx="330" cy="200" r="3" fill="#65a30d" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="25s" repeatCount="indefinite" />
      </circle>
      <path d="M200 80 L300 130 L300 240 C300 300 200 340 200 340 C200 340 100 300 100 240 L100 130 Z" fill="url(#shieldGrad)" opacity="0.12" />
      <path d="M200 95 L285 138 L285 235 C285 285 200 320 200 320 C200 320 115 285 115 235 L115 138 Z" fill="url(#shieldInner)" stroke="url(#shieldGrad)" strokeWidth="2.5" />
      <rect x="175" y="200" width="50" height="40" rx="6" fill="none" stroke="#854d0e" strokeWidth="2.5" filter="url(#glow)" />
      <path d="M185 200 V185 C185 172 192 165 200 165 C208 165 215 172 215 185 V200" fill="none" stroke="#854d0e" strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)" />
      <circle cx="200" cy="218" r="5" fill="#ca8a04"><animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" /></circle>
      <line x1="200" y1="222" x2="200" y2="230" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />
      <circle cx="270" cy="150" r="18" fill="#16a34a" opacity="0.9"><animate attributeName="r" values="18;20;18" dur="3s" repeatCount="indefinite" /></circle>
      <polyline points="261,150 268,157 280,144" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   SVG: Data Breach Flow Diagram
───────────────────────────────────────────── */
function DataBreachFlowSVG() {
  const flowSteps = [
    { title: "ATTACKER", desc1: "Scans for", desc2: "vulnerabilities", emoji: "💻", gradient: "from-red-600 to-red-700", step: "STEP 1" },
    { title: "VULNERABILITY", desc1: "Weak passwords,", desc2: "no HTTPS, outdated", emoji: "⚠️", gradient: "from-orange-600 to-orange-700", step: "STEP 2" },
    { title: "DATA STOLEN", desc1: "User credentials,", desc2: "payment info", emoji: "🔒", gradient: "from-purple-600 to-purple-700", step: "STEP 3" },
    { title: "IMPACT", desc1: "Financial loss", desc2: "Reputation damage", emoji: "💸", gradient: "from-gray-700 to-gray-800", step: "STEP 4" },
  ];

  return (
    <>
      {/* Desktop SVG */}
      <svg viewBox="0 0 900 300" className="w-full hidden md:block" aria-label="Data breach flow diagram">
        <defs>
          <linearGradient id="attackGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#dc2626" /><stop offset="100%" stopColor="#b91c1c" /></linearGradient>
          <linearGradient id="vulnGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#d97706" /><stop offset="100%" stopColor="#b45309" /></linearGradient>
          <linearGradient id="dataGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#6d28d9" /></linearGradient>
          <linearGradient id="impactGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#374151" /><stop offset="100%" stopColor="#1f2937" /></linearGradient>
        </defs>
        <g className="animate-[fadeSlideIn_0.6s_ease_0.2s_both]"><rect x="20" y="60" width="180" height="150" rx="16" fill="url(#attackGrad)" /><text x="110" y="110" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">ATTACKER</text><text x="110" y="135" textAnchor="middle" fill="white" fontSize="10" opacity="0.85">Scans for</text><text x="110" y="152" textAnchor="middle" fill="white" fontSize="10" opacity="0.85">vulnerabilities</text><circle cx="110" cy="185" r="14" fill="rgba(255,255,255,0.2)" /><text x="110" y="191" textAnchor="middle" fill="white" fontSize="14">&#128187;</text></g>
        <g className="animate-[fadeSlideIn_0.6s_ease_0.5s_both]"><line x1="200" y1="135" x2="240" y2="135" stroke="#dc2626" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" values="18;0" dur="1s" repeatCount="indefinite" /></line><polygon points="240,129 252,135 240,141" fill="#dc2626" /></g>
        <g className="animate-[fadeSlideIn_0.6s_ease_0.7s_both]"><rect x="252" y="60" width="180" height="150" rx="16" fill="url(#vulnGrad)" /><text x="342" y="110" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">VULNERABILITY</text><text x="342" y="135" textAnchor="middle" fill="white" fontSize="10" opacity="0.85">Weak passwords,</text><text x="342" y="152" textAnchor="middle" fill="white" fontSize="10" opacity="0.85">no HTTPS, outdated</text><circle cx="342" cy="185" r="14" fill="rgba(255,255,255,0.2)" /><text x="342" y="191" textAnchor="middle" fill="white" fontSize="14">&#9888;&#65039;</text></g>
        <g className="animate-[fadeSlideIn_0.6s_ease_1s_both]"><line x1="432" y1="135" x2="472" y2="135" stroke="#d97706" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" values="18;0" dur="1s" repeatCount="indefinite" /></line><polygon points="472,129 484,135 472,141" fill="#d97706" /></g>
        <g className="animate-[fadeSlideIn_0.6s_ease_1.2s_both]"><rect x="484" y="60" width="180" height="150" rx="16" fill="url(#dataGrad)" /><text x="574" y="110" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">DATA STOLEN</text><text x="574" y="135" textAnchor="middle" fill="white" fontSize="10" opacity="0.85">User credentials,</text><text x="574" y="152" textAnchor="middle" fill="white" fontSize="10" opacity="0.85">payment info</text><circle cx="574" cy="185" r="14" fill="rgba(255,255,255,0.2)" /><text x="574" y="191" textAnchor="middle" fill="white" fontSize="14">&#128274;</text></g>
        <g className="animate-[fadeSlideIn_0.6s_ease_1.5s_both]"><line x1="664" y1="135" x2="704" y2="135" stroke="#7c3aed" strokeWidth="2" strokeDasharray="6 3"><animate attributeName="stroke-dashoffset" values="18;0" dur="1s" repeatCount="indefinite" /></line><polygon points="704,129 716,135 704,141" fill="#7c3aed" /></g>
        <g className="animate-[fadeSlideIn_0.6s_ease_1.7s_both]"><rect x="716" y="60" width="160" height="150" rx="16" fill="url(#impactGrad)" /><text x="796" y="110" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">IMPACT</text><text x="796" y="135" textAnchor="middle" fill="#fca5a5" fontSize="10">Financial loss</text><text x="796" y="152" textAnchor="middle" fill="#fca5a5" fontSize="10">Reputation damage</text><circle cx="796" cy="185" r="14" fill="rgba(239,68,68,0.2)" /><text x="796" y="191" textAnchor="middle" fill="#fca5a5" fontSize="14">&#128176;</text></g>
        <text x="110" y="240" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="600">STEP 1</text>
        <text x="342" y="240" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="600">STEP 2</text>
        <text x="574" y="240" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="600">STEP 3</text>
        <text x="796" y="240" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="600">STEP 4</text>
        <line x1="60" y1="270" x2="840" y2="270" stroke="#d4a574" strokeWidth="1" />
        <text x="450" y="290" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="600">Average time: 4.2 hours from initial scan to data breach</text>
      </svg>

      {/* Mobile Grid */}
      <div className="grid grid-cols-2 gap-10 md:hidden relative">
        {flowSteps.map((item, i) => (
          <div key={i} className="relative">
            <div className={`bg-gradient-to-r ${item.gradient} rounded-2xl p-4 text-white shadow-lg h-full flex flex-col items-center justify-center text-center animate-[fadeSlideIn_0.6s_ease_both]`} style={{ animationDelay: `${i * 0.2}s` }}>
              <h3 className="text-xs font-bold mb-2">{item.title}</h3>
              <p className="text-[10px] opacity-90 mb-1">{item.desc1}</p>
              <p className="text-[10px] opacity-90 mb-3">{item.desc2}</p>
              <div className="text-2xl mb-2">{item.emoji}</div>
              <span className="text-[9px] font-semibold opacity-75">{item.step}</span>
            </div>
          </div>
        ))}
        
        {/* Animated Arrows - positioned in the center of gaps */}
        {/* ATTACKER → VULNERABILITY (horizontal) */}
        <svg className="absolute pointer-events-none" style={{ left: 'calc(50% - 12px)', top: 'calc(25% - 5px)', width: '24px', height: '10px', transform: 'translateY(-50%)' }}>
          <line x1="0" y1="5" x2="20" y2="5" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2">
            <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
          </line>
          <polygon points="20,3 24,5 20,7" fill="#dc2626" />
        </svg>

        {/* VULNERABILITY → DATA STOLEN (diagonal down-left) */}
        <svg className="absolute pointer-events-none" style={{ left: 'calc(50% - 10px)', top: '50%', width: '40px', height: '40px', transform: 'translate(-50%, -50%)' }}>
          <line x1="35" y1="5" x2="5" y2="35" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2">
            <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
          </line>
          <polygon points="3,32 5,35 8,33" fill="#d97706" />
        </svg>

        {/* DATA STOLEN → IMPACT (horizontal) */}
        <svg className="absolute pointer-events-none" style={{ left: 'calc(50% - 12px)', bottom: 'calc(25% - 5px)', width: '24px', height: '10px', transform: 'translateY(50%)' }}>
          <line x1="0" y1="5" x2="20" y2="5" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 2">
            <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
          </line>
          <polygon points="20,3 24,5 20,7" fill="#7c3aed" />
        </svg>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Donut Chart
───────────────────────────────────────────── */
function DonutChart({ percentage, label, color, delay = 0 }: { percentage: number; label: string; color: string; delay?: number }) {
  const { ref, inView } = useInView(0.3);
  const count = useCountUp(percentage, 1500, inView);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (circumference * (inView ? percentage : 0)) / 100;
  return (
    <div ref={ref} className="flex flex-col items-center gap-3 group cursor-default" style={{ animationDelay: `${delay}ms` }}>
      <div className="relative w-36 h-36 transition-transform duration-500 group-hover:scale-110">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#fef3c7" strokeWidth="10" />
          <circle cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black text-amber-900 transition-transform duration-300 group-hover:scale-125">{count}%</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-amber-800 text-center max-w-[140px]">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Interactive Fix Card with expand
───────────────────────────────────────────── */
function FixCard({ icon, title, description, color, step, tip }: {
  icon: React.ReactNode; title: string; description: string; color: string; step: number; tip: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`group relative bg-white border rounded-2xl p-6 transition-all duration-500 cursor-pointer overflow-hidden ${
        expanded ? "border-emerald-300 shadow-xl shadow-emerald-100/40 -translate-y-1" : "border-amber-200 hover:border-amber-400 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-100/60"
      }`}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => { if (e.key === "Enter") setExpanded(!expanded); }}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      {/* Background glow on hover */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full transition-all duration-700 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} style={{ background: `radial-gradient(circle, ${color}15, transparent)` }} />
      <div className={`absolute top-4 right-4 text-[3rem] font-black select-none transition-all duration-500 ${hovered ? "scale-110 opacity-30" : "opacity-10"}`} style={{ color }}>
        {String(step).padStart(2, "0")}
      </div>
      <div className={`hidden sm:flex relative w-14 h-14 rounded-xl items-center justify-center mb-4 transition-all duration-500 ${hovered ? "scale-110 rotate-3" : ""} ${expanded ? "scale-110 -rotate-3" : ""}`} style={{ background: `${color}15`, border: `1px solid ${color}40` }}>
        {icon}
      </div>
      <h3 className="relative text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="relative text-sm text-gray-600 leading-relaxed">{description}</p>
      {/* Expandable tip with animation */}
      <div className={`relative mt-3 overflow-hidden transition-all duration-500 ${expanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="pt-3 border-t border-amber-100">
          <p className="text-xs text-amber-700 font-medium leading-relaxed bg-amber-50 rounded-lg p-3 animate-[scaleIn_0.3s_ease]">
            <span className="font-bold">{"\u{1F4A1}"} Pro Tip:</span> {tip}
          </p>
        </div>
      </div>
      <div className={`relative mt-3 text-xs font-semibold transition-all duration-300 flex items-center gap-1 ${expanded ? "text-emerald-600" : "text-amber-500 group-hover:text-amber-700"}`}>
        <span>{expanded ? "Click to collapse" : "Click for pro tip"}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-300 ${expanded ? "rotate-180" : "group-hover:translate-y-0.5"}`}><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Interactive Security Score Calculator
───────────────────────────────────────────── */
function SecurityScoreCalculator() {
  const [checks, setChecks] = useState<boolean[]>(new Array(12).fill(false));
  const [celebrate, setCelebrate] = useState(false);
  const [lastChecked, setLastChecked] = useState<number | null>(null);
  const score = Math.round((checks.filter(Boolean).length / checks.length) * 100);
  const prevScoreRef = useRef(0);

  const items = [
    "SSL certificate is valid and not expired",
    "All HTTP requests redirect to HTTPS",
    "Passwords are hashed (not stored in plain text)",
    "SQL queries use parameterized statements",
    "Security headers (CSP, HSTS, X-Frame) are set",
    "Dependencies have no known CVEs (npm audit)",
    "Rate limiting is enabled on login/API endpoints",
    "Error messages don't expose internal details",
    "CORS is configured with specific allowed origins",
    "Session cookies use HttpOnly + Secure + SameSite",
    "File uploads are validated and size-limited",
    "Admin panels are not publicly accessible",
  ];

  const impacts = ["Critical","Critical","Critical","Critical","High","High","High","Medium","Medium","Medium","Medium","High"];

  useEffect(() => {
    if (score === 100 && prevScoreRef.current !== 100) setCelebrate(true);
    if (score < 100) setCelebrate(false);
    prevScoreRef.current = score;
  }, [score]);

  const getScoreColor = () => {
    if (score >= 80) return "#16a34a";
    if (score >= 50) return "#d97706";
    return "#dc2626";
  };

  const getScoreLabel = () => {
    if (score === 100) return "Perfect!";
    if (score >= 80) return "Excellent";
    if (score >= 50) return "Needs Work";
    if (score > 0) return "At Risk";
    return "Not Started";
  };

  const getScoreEmoji = () => {
    if (score === 100) return "\u{1F389}";
    if (score >= 80) return "\u{1F6E1}\u{FE0F}";
    if (score >= 50) return "\u{26A0}\u{FE0F}";
    if (score > 0) return "\u{1F6A8}";
    return "\u{1F50D}";
  };

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (circumference * score) / 100;
  const checkedCount = checks.filter(Boolean).length;

  const handleToggle = (i: number) => {
    const next = [...checks];
    next[i] = !next[i];
    setChecks(next);
    setLastChecked(i);
    setTimeout(() => setLastChecked(null), 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-10">
      {/* Mobile sticky score bar - compact, 20% height, below fixed nav */}
      <div className="lg:hidden sticky top-[64px] z-30 max-h-[20vh]">
        <div className={`bg-white/95 backdrop-blur-md border-b rounded-b-2xl px-4 py-3 shadow-lg transition-all duration-500 ${celebrate ? "border-emerald-400 shadow-emerald-200/60" : "border-amber-200 shadow-amber-100/40"}`}>
          <div className="flex items-center gap-4">
            {/* Mini score ring */}
            <div className="relative w-14 h-14 flex-shrink-0">
              {celebrate && (
                <div className="absolute inset-0 rounded-full animate-ping bg-emerald-200/50" />
              )}
              <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#fef3c7" strokeWidth="14" />
                <circle cx="80" cy="80" r="70" fill="none" stroke={getScoreColor()} strokeWidth="14" strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={offset}
                  style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-black" style={{ color: getScoreColor() }}>{score}</span>
              </div>
            </div>
            {/* Score info + progress bar */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{getScoreEmoji()}</span>
                  <span className="text-sm font-bold" style={{ color: getScoreColor() }}>{getScoreLabel()}</span>
                </div>
                <span className="text-xs font-bold text-gray-600">{checkedCount}/{items.length}</span>
              </div>
              <div className="w-full h-2.5 bg-amber-50 rounded-full overflow-hidden border border-amber-100">
                <div className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden" style={{ width: `${(checkedCount / items.length) * 100}%`, backgroundColor: getScoreColor() }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
              </div>
              {/* Mini category pills */}
              {checkedCount > 0 && (
                <div className="flex gap-2 mt-1.5">
                  <span className="text-[10px] font-bold text-red-500">{checks.slice(0,4).filter(Boolean).length}/4 Critical</span>
                  <span className="text-[10px] font-bold text-amber-500">{[checks[4],checks[5],checks[6],checks[11]].filter(Boolean).length}/4 High</span>
                  <span className="text-[10px] font-bold text-blue-500">{checks.slice(7,11).filter(Boolean).length}/4 Med</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop score card - sticky on left (hidden on mobile) */}
      <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-120px)]">
        <div className={`bg-white border rounded-3xl p-7 shadow-lg transition-all duration-500 ${celebrate ? "border-emerald-400 shadow-emerald-200/60 animate-bounce" : "border-amber-200 shadow-amber-100/40"}`}>
          <div className="flex flex-col items-center">
            {/* Animated score ring */}
            <div className="relative w-40 h-40 mb-4">
              {celebrate && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(12)].map((_, i) => (
                    <span key={i} className="absolute w-2 h-2 rounded-full animate-ping" style={{
                      backgroundColor: ["#16a34a","#d97706","#7c3aed","#dc2626","#0891b2","#db2777"][i % 6],
                      top: `${50 + 45 * Math.sin(i * Math.PI / 6)}%`,
                      left: `${50 + 45 * Math.cos(i * Math.PI / 6)}%`,
                      animationDelay: `${i * 100}ms`,
                      animationDuration: "1s",
                    }} />
                  ))}
                </div>
              )}
              <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#fef3c7" strokeWidth="10" />
                <circle cx="80" cy="80" r="70" fill="none" stroke={getScoreColor()} strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={offset}
                  className="drop-shadow-sm"
                  style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black transition-all duration-300" style={{ color: getScoreColor(), transform: lastChecked !== null ? "scale(1.2)" : "scale(1)" }}>{score}</span>
                <span className="text-xs font-semibold text-gray-400 mt-0.5">/ 100</span>
              </div>
            </div>
            {/* Score label with emoji */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{getScoreEmoji()}</span>
              <span className="text-lg font-bold transition-colors duration-300" style={{ color: getScoreColor() }}>{getScoreLabel()}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-center">Click items on the right</p>
            {/* Progress bar */}
            <div className="w-full mt-5 pt-5 border-t border-amber-100">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500">Progress</span>
                <span className="font-bold text-gray-800">{checkedCount} / {items.length}</span>
              </div>
              <div className="w-full h-3 bg-amber-50 rounded-full overflow-hidden border border-amber-100">
                <div className="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden" style={{ width: `${(checkedCount / items.length) * 100}%`, backgroundColor: getScoreColor() }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
              </div>
            </div>
            {/* Quick stats */}
            {checkedCount > 0 && (
              <div className="w-full mt-4 grid grid-cols-3 gap-2 text-center animate-[fadeSlideIn_0.3s_ease]">
                <div className="bg-red-50 rounded-lg p-2">
                  <div className="text-sm font-bold text-red-600">{checks.slice(0,4).filter(Boolean).length}/4</div>
                  <div className="text-[9px] text-red-500 font-medium">Critical</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-2">
                  <div className="text-sm font-bold text-amber-600">{[checks[4],checks[5],checks[6],checks[11]].filter(Boolean).length}/4</div>
                  <div className="text-[9px] text-amber-500 font-medium">High</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-2">
                  <div className="text-sm font-bold text-blue-600">{checks.slice(7,11).filter(Boolean).length}/4</div>
                  <div className="text-[9px] text-blue-500 font-medium">Medium</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right column - Interactive checklist */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <button
            key={item}
            type="button"
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left touch-manipulation ${
              checks[i]
                ? "bg-emerald-50 border-emerald-300 shadow-sm shadow-emerald-100"
                : "bg-white border-amber-200 hover:border-amber-400 hover:shadow-md hover:-translate-x-1"
            } ${lastChecked === i ? "scale-[1.02]" : ""}`}
            onClick={() => handleToggle(i)}
          >
            <div className={`w-7 h-7 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
              checks[i] ? "border-emerald-500 bg-emerald-500 scale-110 rotate-0" : "border-amber-300 hover:border-amber-500"
            } ${lastChecked === i && checks[i] ? "animate-[bounceCheck_0.5s_ease]" : ""}`}>
              {checks[i] && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>}
            </div>
            <span className={`flex-1 text-sm font-medium transition-all duration-300 ${checks[i] ? "text-emerald-800 line-through opacity-70" : "text-gray-700"}`}>{item}</span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all duration-300 ${
              checks[i] ? "bg-emerald-100 text-emerald-600 scale-90" :
              impacts[i] === "Critical" ? "bg-red-50 text-red-600 border border-red-200 animate-pulse" :
              impacts[i] === "High" ? "bg-amber-50 text-amber-700 border border-amber-200" :
              "bg-blue-50 text-blue-600 border border-blue-200"
            }`}>
              {checks[i] ? "\u2713 Done" : impacts[i]}
            </span>
          </button>
        ))}
        {/* Completion message */}
        {score === 100 && (
          <div className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-lime-50 border-2 border-emerald-300 rounded-2xl text-center animate-[fadeSlideIn_0.5s_ease]">
            <div className="text-3xl mb-2">{"\u{1F389}\u{1F6E1}\u{FE0F}\u{1F389}"}</div>
            <p className="text-emerald-800 font-bold text-lg">Your site is fully secured!</p>
            <p className="text-emerald-600 text-sm mt-1">All critical, high, and medium items are addressed.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function DataProtectionBlog() {
  const chartSection = useInView(0.1);
  const [flowVisible, setFlowVisible] = useState(false);
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = flowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFlowVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-[#fffef5] text-gray-900">
      <ReadingProgress />

      {/* ============ HERO ============ */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Sumo Wrestler Banner Image - Full Width */}
        <div className="absolute inset-0 w-full h-full">
          <svg viewBox="0 0 1920 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {/* Background */}
            <rect width="1920" height="600" fill="url(#heroGradient)"/>
            <defs>
              <linearGradient id="heroGradient" x1="0" y1="0" x2="1920" y2="600">
                <stop offset="0%" stopColor="#FFFEF5"/>
                <stop offset="50%" stopColor="#FEF3C7"/>
                <stop offset="100%" stopColor="#FDE68A"/>
              </linearGradient>
            </defs>
            
            {/* Decorative circles */}
            <circle cx="150" cy="150" r="80" fill="#FCD34D" opacity="0.2"/>
            <circle cx="1750" cy="400" r="120" fill="#F59E0B" opacity="0.15"/>
            <circle cx="1600" cy="100" r="60" fill="#FBBF24" opacity="0.2"/>
            
            {/* Sumo Wrestler - Positioned on Left */}
            <g transform="translate(100, 50)">
              {/* Body */}
              <ellipse cx="200" cy="350" rx="120" ry="100" fill="#D97706" opacity="0.6"/>
              <ellipse cx="200" cy="340" rx="110" ry="90" fill="#F59E0B" opacity="0.8"/>
              {/* Belly */}
              <ellipse cx="200" cy="320" rx="85" ry="75" fill="#FDE68A" opacity="0.9"/>
              <ellipse cx="200" cy="315" rx="70" ry="60" fill="#FEF3C7"/>
              {/* Belt/Mawashi */}
              <rect x="110" y="350" width="180" height="40" rx="8" fill="#DC2626" opacity="0.9"/>
              <rect x="115" y="355" width="170" height="30" rx="6" fill="#EF4444"/>
              <circle cx="200" cy="370" r="8" fill="#FEF3C7"/>
              {/* Left Arm */}
              <ellipse cx="100" cy="280" rx="35" ry="55" fill="#F59E0B" opacity="0.8" transform="rotate(-25 100 280)"/>
              <circle cx="85" cy="320" r="28" fill="#FCD34D"/>
              {/* Right Arm */}
              <ellipse cx="300" cy="280" rx="35" ry="55" fill="#F59E0B" opacity="0.8" transform="rotate(25 300 280)"/>
              <circle cx="315" cy="320" r="28" fill="#FCD34D"/>
              {/* Head */}
              <circle cx="200" cy="200" r="60" fill="#FCD34D"/>
              <circle cx="200" cy="205" r="55" fill="#FEF3C7"/>
              {/* Topknot (Chonmage) */}
              <ellipse cx="200" cy="145" rx="25" ry="35" fill="#1F2937"/>
              <ellipse cx="200" cy="140" rx="20" ry="28" fill="#374151"/>
              {/* Face Features - Eyes */}
              <ellipse cx="180" cy="195" rx="8" ry="12" fill="#1F2937"/>
              <ellipse cx="220" cy="195" rx="8" ry="12" fill="#1F2937"/>
              <circle cx="182" cy="193" r="3" fill="#FFFFFF"/>
              <circle cx="222" cy="193" r="3" fill="#FFFFFF"/>
              {/* Nose */}
              <ellipse cx="200" cy="210" rx="6" ry="8" fill="#FBBF24" opacity="0.6"/>
              {/* Mouth */}
              <path d="M 185 225 Q 200 235 215 225" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* Eyebrows */}
              <path d="M 170 185 Q 180 180 190 183" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 210 183 Q 220 180 230 185" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* Left Leg */}
              <ellipse cx="160" cy="430" rx="40" ry="60" fill="#F59E0B" opacity="0.8"/>
              <ellipse cx="160" cy="470" rx="35" ry="25" fill="#FCD34D"/>
              {/* Right Leg */}
              <ellipse cx="240" cy="430" rx="40" ry="60" fill="#F59E0B" opacity="0.8"/>
              <ellipse cx="240" cy="470" rx="35" ry="25" fill="#FCD34D"/>
            </g>
            
            {/* Additional decorative elements */}
            <circle cx="500" cy="500" r="40" fill="#FDE68A" opacity="0.15"/>
            <circle cx="1400" cy="300" r="50" fill="#FBBF24" opacity="0.15"/>
          </svg>
        </div>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffef5]/40 via-[#fffef5]/60 to-[#fffef5]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fffef5]/30" />
        
        {/* Subtle glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-amber-300/10 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "4s" }} />
        </div>
        
        {/* Content - Centered and Overlaid on Banner */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl mx-auto md:mx-0">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50/90 backdrop-blur-sm border border-red-200 mb-6 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-semibold text-red-700 uppercase tracking-wider">Critical Security Report 2026</span>
              </div>
            </AnimateIn>
            
            <AnimateIn delay={100}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
                <span className="text-gray-900">Data Protection: </span>
                <span className="bg-gradient-to-r from-amber-600 via-lime-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-lg">
                  Why 68% of Websites Are Insecure
                </span>
              </h1>
            </AnimateIn>
            
            <AnimateIn delay={200}>
              <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed mb-6 font-semibold drop-shadow-sm bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                Every 39 seconds, a cyberattack occurs. Most websites have basic vulnerabilities that take less than an hour to fix. This guide shows you exactly what&apos;s wrong and how to protect your users.
              </p>
            </AnimateIn>
            
            <AnimateIn delay={300}>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-amber-50/90 backdrop-blur-sm text-amber-800 border border-amber-300 hover:scale-110 transition-transform cursor-default shadow-md">Security</span>
                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-lime-50/90 backdrop-blur-sm text-lime-800 border border-lime-300 hover:scale-110 transition-transform cursor-default shadow-md">Data Protection</span>
                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-50/90 backdrop-blur-sm text-emerald-800 border border-emerald-300 hover:scale-110 transition-transform cursor-default shadow-md">OWASP</span>
                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-yellow-50/90 backdrop-blur-sm text-yellow-800 border border-yellow-300 hover:scale-110 transition-transform cursor-default shadow-md">Encryption</span>
              </div>
            </AnimateIn>
            
            <AnimateIn delay={400}>
              <div className="flex items-center gap-4 text-sm text-gray-700 font-bold drop-shadow-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-flex">
                <span>May 26, 2026</span>
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                <span>12 min read</span>
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                <span>By Anup Singh</span>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ============ TEXT TO SPEECH ============ */}
      <section className="px-4 -mt-8 relative z-20 mb-8 md:mb-16">
        <div className="max-w-3xl mx-auto">
          <AnimateIn>
            <ArticleTTS />
          </AnimateIn>
        </div>
      </section>

      {/* ============ AI SECURITY CONCERNS ============ */}
      <section className="relative py-12 md:py-20 px-4 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-300 mb-4">
                <span className="text-2xl">🤖</span>
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Critical: AI Era Security</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                Why Security Fixes Are More Critical Than Ever in the AI Age
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                The explosive growth of AI and automation has fundamentally changed the cybersecurity landscape. Here&apos;s why protecting your data is no longer optional.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn>
            <p className="text-gray-700 leading-relaxed text-lg">
              <strong>AI-Powered Attacks Are Faster:</strong> Hackers use AI to scan millions of websites in minutes, finding vulnerabilities 100x faster than manual testing. <strong>Smarter Phishing & Social Engineering:</strong> AI-generated phishing emails bypass traditional filters with 60% higher success rates. <strong>Data Is the New Oil:</strong> Breaches expose customer data that trains billion-dollar AI models for competitors and malicious actors.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section ref={chartSection.ref} className="relative py-12 md:py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffef5] via-[#fefce8] to-[#fffef5]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-3 block">The Reality</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">How Insecure Is the Web?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Based on analysis of 1.2 million websites worldwide, these numbers reveal just how vulnerable most sites are to attacks.</p>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <DonutChart percentage={68} label="Websites with at least 1 vulnerability" color="#dc2626" delay={0} />
            <DonutChart percentage={43} label="Sites without HTTPS properly configured" color="#d97706" delay={200} />
            <DonutChart percentage={82} label="Use outdated software components" color="#7c3aed" delay={400} />
            <DonutChart percentage={57} label="No Content Security Policy headers" color="#0891b2" delay={600} />
          </div>
          {/* Bar chart */}
          <AnimateIn delay={200}>
            <div className="mt-20 bg-white border border-amber-200 rounded-3xl p-8 md:p-12 shadow-lg shadow-amber-50 hover:shadow-xl transition-shadow duration-500">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Most Common Vulnerabilities (OWASP Top 10)</h3>
            <div className="space-y-5">
              {[
                { label: "Broken Access Control", pct: 94, color: "#dc2626" },
                { label: "Cryptographic Failures", pct: 78, color: "#d97706" },
                { label: "Injection Attacks (SQL/XSS)", pct: 72, color: "#7c3aed" },
                { label: "Insecure Design", pct: 65, color: "#db2777" },
                { label: "Security Misconfiguration", pct: 61, color: "#0891b2" },
                { label: "Vulnerable Components", pct: 55, color: "#059669" },
                { label: "Authentication Failures", pct: 48, color: "#2563eb" },
              ].map((item, i) => (
                <div key={item.label} className="group cursor-default">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{item.label}</span>
                    <span className="text-sm font-bold transition-transform group-hover:scale-125" style={{ color: item.color }}>{chartSection.inView ? item.pct : 0}%</span>
                  </div>
                  <div className="h-3 bg-amber-50 rounded-full overflow-hidden border border-amber-100 group-hover:h-4 transition-all">
                    <div className="h-full rounded-full transition-all duration-[1.5s] ease-out" style={{ width: chartSection.inView ? `${item.pct}%` : "0%", background: `linear-gradient(90deg, ${item.color}, ${item.color}cc)`, transitionDelay: `${i * 100}ms` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-6">Source: OWASP Foundation, Web Security Report 2026</p>
          </div>
          </AnimateIn>
        </div>
      </section>

      {/* ============ FLOW DIAGRAM ============ */}
      <section className="py-12 md:py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffef5] via-[#fef9c3]/30 to-[#fffef5]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-red-600 uppercase tracking-[0.2em] mb-3 block">Attack Flow</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">How a Data Breach Happens</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Understanding the attack chain helps you know where to place your defenses.</p>
            </div>
          </AnimateIn>
          <div ref={flowRef} className={`transition-opacity duration-1000 ${flowVisible ? "opacity-100" : "opacity-0"}`}>
            <DataBreachFlowSVG />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { time: "0-2 hrs", desc: "Automated bots scan millions of sites for known vulnerabilities", color: "#dc2626", emoji: "\u{1F916}" },
              { time: "2-3 hrs", desc: "Exploit is deployed against weak points like unpatched plugins", color: "#d97706", emoji: "\u{1F4A3}" },
              { time: "3-4 hrs", desc: "Data is extracted including credentials and payment info", color: "#7c3aed", emoji: "\u{1F4E4}" },
              { time: "4+ hrs", desc: "Stolen data is sold on dark web or used for identity theft", color: "#374151", emoji: "\u{1F480}" },
            ].map((item, i) => (
              <AnimateIn key={item.time} delay={i * 100}>
                <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-2 hover:border-amber-300 transition-all duration-300 group cursor-default h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl md:text-lg group-hover:animate-wiggle">{item.emoji}</span>
                    <span className="text-sm md:text-sm font-bold" style={{ color: item.color }}>{item.time}</span>
                  </div>
                  <p className="text-sm md:text-xs text-gray-600 leading-relaxed flex-1">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 8 FIXES (Interactive cards) ============ */}
      <section className="py-12 md:py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffef5] via-[#ecfdf5]/30 to-[#fffef5]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] mb-3 block">Action Items</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">8 Essential Fixes for Your Website</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Click each card to reveal pro tips. These measures can prevent 90%+ of common attacks.</p>
            </div>
          </AnimateIn>
          <div className="grid sm:grid-cols-2 gap-5">
            <FixCard step={1} icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>} title="Enable HTTPS" description="Install SSL/TLS certificate. Encrypts all data in transit." color="#16a34a" tip="Use certbot with auto-renewal: certbot renew --dry-run. Set up cron job for automatic certificate renewal every 60 days." />
            <FixCard step={2} icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1"/></svg>} title="Strong Authentication" description="Enforce 2FA/MFA with bcrypt hashing." color="#0891b2" tip="Use bcrypt with minimum 12 salt rounds. Implement TOTP-based 2FA using libraries like speakeasy. Never store plain-text passwords." />
            <FixCard step={3} icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2"><path d="M4 4h16v16H4z"/><path d="M4 9h16"/><path d="M9 4v16"/></svg>} title="Security Headers" description="Add CSP, HSTS, X-Frame-Options." color="#7c3aed" tip="Start with: Content-Security-Policy: default-src 'self'; Strict-Transport-Security: max-age=31536000; includeSubDomains" />
            <FixCard step={4} icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>} title="Update Dependencies" description="Run npm audit weekly. Patch CVEs." color="#d97706" tip="Add 'npm audit --production' to your CI pipeline. Use Renovate or Dependabot for automated PR creation on vulnerable packages." />
            <FixCard step={5} icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 15h6"/><path d="M12 12v6"/></svg>} title="Input Validation" description="Validate ALL input server-side." color="#db2777" tip="Use zod or joi for schema validation. Always sanitize with DOMPurify before rendering user content. Never trust req.body directly." />
            <FixCard step={6} icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>} title="Rate Limiting" description="Block brute-force with rate limits." color="#2563eb" tip="Use express-rate-limit: windowMs: 15*60*1000, max: 100. For login: max 5 attempts per 15 min per IP. Add exponential backoff." />
            <FixCard step={7} icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>} title="Error Handling" description="Never expose stack traces to users." color="#dc2626" tip="In production: app.use((err, req, res, next) => res.status(500).json({ error: 'Something went wrong' })). Log full errors to Sentry/Datadog." />
            <FixCard step={8} icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9"/></svg>} title="CORS & Cookies" description="Strict origins + secure cookie flags." color="#0d9488" tip="Set: SameSite=Strict, HttpOnly, Secure on all auth cookies. CORS: origin: ['https://yourdomain.com']. Never use origin: '*' in production." />
          </div>
        </div>
      </section>

      {/* ============ REAL-WORLD CASE STUDIES ============ */}
      <section className="py-12 md:py-20 px-4 relative bg-gradient-to-b from-[#fffef5] via-slate-50 to-[#fffef5]">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <div className="mb-8">
              <span className="text-xs font-bold text-red-600 uppercase tracking-[0.2em] mb-3 block">Learn from Others&apos; Mistakes</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">Recent High-Profile Breaches</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                In 2024-2025, major organizations paid a heavy price for security gaps: A healthcare provider faced a <strong>$12.8M fine</strong> after 3.2M patient records were exposed through an unpatched SQL injection. An e-commerce platform lost <strong>$8.4M</strong> when AI-powered credential stuffing compromised 1.7M accounts—no 2FA enforcement. A university paid a <strong>$2.1M ransom</strong> after AI-generated phishing emails encrypted 890K student records, exploiting admin accounts without MFA. All three breaches were preventable with basic security hygiene, yet averaged <strong>127 days</strong> before detection. The 8 fixes above would have stopped every single attack.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ============ SECURITY IMPLEMENTATION TIMELINE ============ */}
      <section className="py-12 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffef5] via-blue-50/30 to-[#fffef5]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-3 block">Action Plan</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">30-Day Security Roadmap</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Follow the path to secure your application.</p>
            </div>
          </AnimateIn>

          {/* Desktop Snake Road */}
          <div className="hidden md:block relative w-full" style={{ minHeight: '800px' }}>
            {/* Road Path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              {/* Dashed center line */}
              <path 
                d="M 100 50 Q 300 50 350 150 Q 400 250 600 250 Q 700 250 700 350 Q 700 450 500 450 Q 300 450 250 550 Q 200 650 400 750 Q 500 800 600 850" 
                stroke="#FDE68A" 
                strokeWidth="60" 
                fill="none"
                strokeLinecap="round"
                opacity="0.3"
              />
              <path 
                d="M 100 50 Q 300 50 350 150 Q 400 250 600 250 Q 700 250 700 350 Q 700 450 500 450 Q 300 450 250 550 Q 200 650 400 750 Q 500 800 600 850" 
                stroke="white" 
                strokeWidth="3" 
                strokeDasharray="15,15"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Milestone Markers */}
            <div className="relative" style={{ height: '900px' }}>
              {/* START */}
              <AnimateIn delay={100}>
                <div className="absolute" style={{ left: '80px', top: '20px' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-2xl border-4 border-white">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-green-200 max-w-xs">
                      <h3 className="text-lg font-black text-gray-900 mb-1">START: Week 1</h3>
                      <p className="text-sm text-gray-600">SSL + Security Headers</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* Week 2 */}
              <AnimateIn delay={200}>
                <div className="absolute" style={{ left: '520px', top: '220px' }}>
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-2xl border-4 border-white">
                      <span className="text-3xl">🔐</span>
                    </div>
                    <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-blue-200 max-w-xs">
                      <h3 className="text-lg font-black text-gray-900 mb-1">Week 2</h3>
                      <p className="text-sm text-gray-600">Authentication + 2FA</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* Week 3 */}
              <AnimateIn delay={300}>
                <div className="absolute" style={{ left: '620px', top: '340px' }}>
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-2xl border-4 border-white">
                      <span className="text-3xl">🛡️</span>
                    </div>
                    <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-purple-200 max-w-xs">
                      <h3 className="text-lg font-black text-gray-900 mb-1">Week 3</h3>
                      <p className="text-sm text-gray-600">Input Validation + Rate Limiting</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* Week 4 */}
              <AnimateIn delay={400}>
                <div className="absolute" style={{ left: '180px', top: '520px' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-2xl border-4 border-white">
                      <span className="text-3xl">📊</span>
                    </div>
                    <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-orange-200 max-w-xs">
                      <h3 className="text-lg font-black text-gray-900 mb-1">Week 4</h3>
                      <p className="text-sm text-gray-600">Monitoring + Pen Testing</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* FINISH */}
              <AnimateIn delay={500}>
                <div className="absolute" style={{ left: '520px', top: '820px' }}>
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 flex items-center justify-center text-white shadow-2xl border-4 border-white animate-pulse">
                      <span className="text-4xl">🎯</span>
                    </div>
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-5 shadow-xl text-white max-w-xs">
                      <h3 className="text-xl font-black mb-1">SECURE! 🎉</h3>
                      <p className="text-sm text-amber-50">90% of attacks prevented</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>

          {/* Mobile Snake Road */}
          <div className="md:hidden relative w-full" style={{ minHeight: '1100px' }}>
            {/* Mobile Road Path - Vertical S-Curve */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 1100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              {/* Road Background */}
              <path 
                d="M 80 50 Q 80 150 200 200 Q 320 250 320 350 Q 320 450 200 500 Q 80 550 80 650 Q 80 750 200 800 Q 320 850 320 950 L 320 1050" 
                stroke="#FDE68A" 
                strokeWidth="50" 
                fill="none"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Dashed Center Line */}
              <path 
                d="M 80 50 Q 80 150 200 200 Q 320 250 320 350 Q 320 450 200 500 Q 80 550 80 650 Q 80 750 200 800 Q 320 850 320 950 L 320 1050" 
                stroke="white" 
                strokeWidth="2" 
                strokeDasharray="10,10"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Milestone Markers */}
            <div className="relative" style={{ height: '1100px' }}>
              {/* Week 1 - START */}
              <AnimateIn delay={100}>
                <div className="absolute" style={{ left: '20px', top: '30px', right: '20px' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-xl border-4 border-white relative z-10">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div className="flex-1 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-green-200">
                      <h3 className="text-base font-black text-gray-900 mb-1">Week 1</h3>
                      <p className="text-sm text-gray-600">SSL + Security Headers</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* Week 2 */}
              <AnimateIn delay={200}>
                <div className="absolute" style={{ left: '20px', top: '280px', right: '20px' }}>
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-xl border-4 border-white relative z-10">
                      <span className="text-2xl">🔐</span>
                    </div>
                    <div className="flex-1 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-blue-200">
                      <h3 className="text-base font-black text-gray-900 mb-1">Week 2</h3>
                      <p className="text-sm text-gray-600">Authentication + 2FA</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* Week 3 */}
              <AnimateIn delay={300}>
                <div className="absolute" style={{ left: '20px', top: '530px', right: '20px' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-xl border-4 border-white relative z-10">
                      <span className="text-2xl">🛡️</span>
                    </div>
                    <div className="flex-1 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-purple-200">
                      <h3 className="text-base font-black text-gray-900 mb-1">Week 3</h3>
                      <p className="text-sm text-gray-600">Input Validation + Rate Limiting</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* Week 4 */}
              <AnimateIn delay={400}>
                <div className="absolute" style={{ left: '20px', top: '780px', right: '20px' }}>
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-xl border-4 border-white relative z-10">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div className="flex-1 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-orange-200">
                      <h3 className="text-base font-black text-gray-900 mb-1">Week 4</h3>
                      <p className="text-sm text-gray-600">Monitoring + Pen Testing</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* FINISH */}
              <AnimateIn delay={500}>
                <div className="absolute" style={{ left: '20px', top: '1000px', right: '20px' }}>
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xl border-4 border-white relative z-10 animate-pulse">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-5 shadow-xl text-white">
                      <h3 className="text-lg font-black mb-1">SECURE! 🎉</h3>
                      <p className="text-sm text-amber-50">90% attacks prevented</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTERACTIVE SECURITY SCORE ============ */}
      <section className="py-12 md:py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffef5] to-[#fefce8]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-3 block">Interactive Tool</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Calculate Your Security Score</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Tap each item you&apos;ve implemented. Your score updates in real-time.</p>
            </div>
          </AnimateIn>
          <SecurityScoreCalculator />
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-12 md:py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fefce8] to-[#fffef5]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimateIn>
          <div className="bg-white border border-amber-200 rounded-3xl p-10 md:p-14 shadow-xl shadow-amber-100/50">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Security Is Not Optional</h2>
            <p className="text-gray-600 leading-relaxed mb-8">With data breaches costing an average of $4.45 million in 2025, security is not a feature - it&apos;s a foundation. Start with the basics above and build from there. Every fix you make protects real people&apos;s real data. Scan your site for free:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors shadow-md shadow-amber-200">
                SSL Labs Test <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>
              <a href="https://securityheaders.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors border-2 border-amber-200">
                Security Headers Scan <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>
              <a href="https://observatory.mozilla.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors border-2 border-amber-200">
                Mozilla Observatory <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </a>
            </div>
          </div>
          <p className="mt-10 text-sm text-gray-500">Written by <span className="text-gray-800 font-semibold">Anup Singh</span> - Senior Software Engineer with 9.5+ years of experience building secure, scalable web applications.</p>
          </AnimateIn>
        </div>
      </section>

      {/* ============ READ NEXT ============ */}
      <section className="py-12 md:py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fffef5] to-[#fefce8]/50" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-3 block">Continue Learning</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">Read Next</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 - React Performance */}
            <a href="/blog/how-i-optimized-react-app-performance-by-40-percent" className="group relative bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=340&fit=crop"
                  alt="Developer optimizing React app performance"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-400/90 text-white">React</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-400/90 text-white">Performance</span>
                </div>
                <h3 className="text-white font-bold text-base leading-snug mb-1 group-hover:text-amber-200 transition-colors">How I Optimized React App Performance by 40% at Enterprise Scale</h3>
                <p className="text-white/70 text-xs line-clamp-2">Deep dive into techniques that reduced Time to Interactive by 40% for millions of users.</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </div>
            </a>

            {/* Card 2 - Architecture Patterns */}
            <a href="/blog/frontend-architecture-patterns-senior-engineers" className="group relative bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop"
                  alt="Frontend architecture patterns and system design"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-violet-400/90 text-white">Architecture</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-400/90 text-white">Senior Engineer</span>
                </div>
                <h3 className="text-white font-bold text-base leading-snug mb-1 group-hover:text-amber-200 transition-colors">7 Frontend Architecture Patterns Every Senior Engineer Should Master</h3>
                <p className="text-white/70 text-xs line-clamp-2">Battle-tested patterns from micro-frontends to feature flags that will level up your engineering.</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
