"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TextToSpeechProps {
  content: string;
}

export default function TextToSpeech({ content }: TextToSpeechProps) {
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

  const plainText = content
    .replace(/<[^>]*>/g, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#*`\[\]()>|]/g, "")
    .replace(/\-{2,}/g, " ")
    .replace(/\n+/g, ". ")
    .replace(/\s+/g, " ")
    .replace(/\.\s*\./g, ".")
    .trim();

  const totalWords = plainText.split(/\s+/).length;
  const estimatedDuration = Math.ceil(totalWords / 150);

  // Check if speech synthesis is supported
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setIsSupported(false);
    }
  }, []);

  // Split text into chunks for mobile compatibility (iOS cuts off long utterances)
  useEffect(() => {
    const sentences = plainText.match(/[^.!?]+[.!?]+/g) || [plainText];
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
  }, [plainText]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    // Prefer natural-sounding voices
    const preferred = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Samantha") ||
          v.name.includes("Daniel") ||
          v.name.includes("Google US") ||
          v.name.includes("Google UK") ||
          v.name.includes("Karen") ||
          v.name.includes("Moira"))
    );
    if (preferred) return preferred;
    // Fallback to any English voice
    const english = voices.find((v) => v.lang.startsWith("en"));
    return english || null;
  }, []);

  const speakChunk = useCallback(
    (index: number) => {
      if (index >= chunksRef.current.length) {
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(100);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setProgress(0), 2000);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunksRef.current[index]);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.lang = "en-US";

      const voice = getVoice();
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        currentChunkRef.current = index + 1;
        // Small delay between chunks for natural pacing
        setTimeout(() => {
          if (currentChunkRef.current < chunksRef.current.length) {
            speakChunk(currentChunkRef.current);
          } else {
            setIsPlaying(false);
            setIsPaused(false);
            setProgress(100);
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTimeout(() => setProgress(0), 2000);
          }
        }, 100);
      };

      utterance.onerror = (e) => {
        // Ignore 'interrupted' errors (caused by cancel() before new speech)
        if (e.error === "interrupted") return;
        setIsPlaying(false);
        setIsPaused(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [getVoice]
  );

  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const totalMs = estimatedDuration * 60 * 1000;
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = elapsedBeforePauseRef.current + (Date.now() - startTimeRef.current);
      const newProgress = Math.min((elapsed / totalMs) * 100, 99);
      setProgress(newProgress);
    }, 500);
  }, [estimatedDuration]);

  const handlePlay = () => {
    if (!isSupported) return;

    // Resume from pause — on mobile, we restart from current chunk since pause/resume is unreliable
    if (isPaused) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        // Mobile: restart from current chunk
        setIsPaused(false);
        setIsPlaying(true);
        startProgressTracking();
        speakChunk(currentChunkRef.current);
      } else {
        // Desktop: use native resume
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsPlaying(true);
        startProgressTracking();
      }
      return;
    }

    // Fresh start
    window.speechSynthesis.cancel();
    currentChunkRef.current = 0;
    elapsedBeforePauseRef.current = 0;
    setProgress(0);
    setIsPlaying(true);
    startProgressTracking();

    // Ensure voices are loaded (required on some mobile browsers)
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      // Wait for voices to load
      window.speechSynthesis.onvoiceschanged = () => {
        speakChunk(0);
        window.speechSynthesis.onvoiceschanged = null;
      };
      // Fallback: start anyway after 500ms
      setTimeout(() => {
        if (currentChunkRef.current === 0) {
          speakChunk(0);
        }
      }, 500);
    } else {
      speakChunk(0);
    }
  };

  const handlePause = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // On mobile, cancel and track position
      window.speechSynthesis.cancel();
    } else {
      window.speechSynthesis.pause();
    }
    elapsedBeforePauseRef.current += Date.now() - startTimeRef.current;
    setIsPaused(true);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    currentChunkRef.current = 0;
    elapsedBeforePauseRef.current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  if (!isSupported) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 p-5 shadow-sm">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-200/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-cyan-200/30 rounded-full blur-2xl animate-pulse delay-700" />
      </div>

      <div className="relative flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className={`relative flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            isPlaying
              ? "bg-gradient-to-br from-violet-600 to-blue-600 scale-110 shadow-violet-300/50"
              : isPaused
              ? "bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-300/50"
              : "bg-gradient-to-br from-blue-600 to-violet-600 hover:scale-105 shadow-blue-300/50"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {/* Ripple animation when playing */}
          {isPlaying && (
            <>
              <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
              <span className="absolute inset-1 rounded-full bg-white/10 animate-ping delay-300" />
            </>
          )}
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          )}
        </button>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {isPlaying ? "Now Playing" : isPaused ? "Paused" : "Listen to Article"}
              </span>
              {isPlaying && (
                <span className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="w-0.5 bg-violet-600 rounded-full animate-bounce"
                      style={{
                        height: `${8 + Math.random() * 12}px`,
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: "0.6s",
                      }}
                    />
                  ))}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {estimatedDuration} min
            </span>
          </div>

          {/* Animated waveform progress bar */}
          <div className="relative h-8 flex items-center">
            <div className="absolute inset-0 flex items-center gap-[2px]">
              {[...Array(50)].map((_, i) => {
                const isActive = (i / 50) * 100 <= progress;
                const height = 4 + Math.sin(i * 0.5) * 8 + Math.cos(i * 0.3) * 4;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-t from-violet-600 to-blue-500"
                        : "bg-gray-200"
                    } ${isPlaying && isActive ? "animate-pulse" : ""}`}
                    style={{
                      height: `${isPlaying && isActive ? height + 2 : height}px`,
                      animationDelay: `${i * 30}ms`,
                      animationDuration: "0.8s",
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Time indicator */}
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-400">
              {Math.floor((progress / 100) * estimatedDuration)}:
              {String(Math.floor(((progress / 100) * estimatedDuration * 60) % 60)).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-gray-400">
              {estimatedDuration}:00
            </span>
          </div>
        </div>

        {/* Stop button */}
        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all group shadow-sm"
            aria-label="Stop"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-gray-400 group-hover:text-red-500 transition-colors"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
