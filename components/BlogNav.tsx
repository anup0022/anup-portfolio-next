"use client";

import { useState, useEffect, useCallback } from "react";
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-[1000] transition-[padding,background-color,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        scrolled
          ? "py-3 bg-[#06080d] border-b border-white/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
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

        {/* Mobile Toggle - min 44x44 touch target */}
        <button
          type="button"
          className="flex md:hidden items-center justify-center w-11 h-11 cursor-pointer touch-manipulation relative z-[1001] -mr-2"
          onClick={toggleMenu}
          onTouchEnd={(e) => {
            e.preventDefault();
            toggleMenu();
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block w-6 h-[2px] bg-[#e8edf5] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#e8edf5] rounded-full transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#e8edf5] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0c1019] border-b border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-[max-height,opacity] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${
          mobileOpen ? "max-h-[400px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
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
