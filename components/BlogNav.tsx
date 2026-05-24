"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/#experience", label: "Experience" },
    { href: "/#projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        scrolled
          ? "py-3 bg-[#06080d]/85 backdrop-blur-[20px] border-b border-white/[0.06]"
          : "py-5 bg-[#06080d]"
      }`}
    >
      <div className="flex items-center justify-between max-w-[1200px] mx-auto px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-['Outfit',sans-serif] font-extrabold text-2xl text-[#e8edf5] tracking-[-0.02em] hover:text-white transition-colors duration-300"
        >
          A<span className="text-[#00d4ff]">.</span>Singh
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = link.href === "/blog"
              ? pathname.startsWith("/blog")
              : false;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-['Outfit',sans-serif] font-medium text-[0.875rem] tracking-[0.04em] uppercase py-1 transition-colors duration-300 group ${
                  isActive
                    ? "text-[#00d4ff]"
                    : "text-[#8892a4] hover:text-[#00d4ff]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#00d4ff] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="flex md:hidden flex-col gap-[5px] cursor-pointer p-2 relative z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-6 h-[2px] bg-[#e8edf5] rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[#e8edf5] rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              mobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[#e8edf5] rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0c1019]/98 backdrop-blur-[20px] border-b border-white/[0.06] transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col py-4 px-6">
          {navLinks.map((link, i) => {
            const isActive = link.href === "/blog"
              ? pathname.startsWith("/blog")
              : false;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-3 font-['Outfit',sans-serif] font-medium text-[0.9rem] tracking-[0.04em] uppercase border-b border-white/[0.04] transition-all duration-300 ${
                  isActive ? "text-[#00d4ff]" : "text-[#8892a4] hover:text-[#00d4ff]"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
