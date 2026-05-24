"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BlogCategory } from "@/content/blogs/types";

interface PostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  date: string;
  author: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  readingTime: number;
  formattedDate: string;
  postCategories: BlogCategory[];
}

interface BlogGridProps {
  posts: PostData[];
  categories?: BlogCategory[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPosts = posts;

  // Intersection observer for staggered card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = new Set(Array.from(prev));
                next.add(idx);
                return next;
              });
            }, idx * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20px" }
    );

    const cards = gridRef.current?.querySelectorAll("[data-idx]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredPosts]);

  // Animate cards on mount
  useEffect(() => {
    setVisibleCards(new Set());
    const timer = setTimeout(() => {
      filteredPosts.forEach((_, i) => {
        setTimeout(() => {
          setVisibleCards((prev) => {
            const updated = new Set(Array.from(prev));
            updated.add(i);
            return updated;
          });
        }, i * 120);
      });
    }, 50);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPosts.length]);

  return (
    <section className="relative py-20">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06080d] via-[#080d16] to-[#06080d]" />

      <div className="relative max-w-6xl mx-auto px-6">


        {/* Featured Post - Large Card */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <Link
              href={`/blog/${filteredPosts[0].slug}`}
              className="group relative block rounded-3xl overflow-hidden border border-white/[0.06] hover:border-[#00d4ff]/20 transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,212,255,0.08)]"
              onMouseEnter={() => setHoveredCard(filteredPosts[0].id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={filteredPosts[0].coverImage}
                    alt={filteredPosts[0].coverImageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#06080d]/80 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080d]/90 to-transparent md:hidden" />

                  {/* Featured badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#00d4ff]/90 text-[#06080d] text-[10px] font-['Outfit',sans-serif] font-bold uppercase tracking-wider rounded-full backdrop-blur-sm">
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-8 md:p-10 flex flex-col justify-center bg-[#0a0f18]">
                  {/* Animated bg on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-transparent transition-opacity duration-500 ${hoveredCard === filteredPosts[0].id ? "opacity-100" : "opacity-0"}`} />

                  <div className="relative">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {filteredPosts[0].postCategories.map((cat) => (
                        <span
                          key={cat.slug}
                          className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                          style={{
                            color: cat.color,
                            borderColor: cat.color + "30",
                            backgroundColor: cat.color + "10",
                          }}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-['Outfit',sans-serif] text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#00d4ff] transition-colors duration-300">
                      {filteredPosts[0].title}
                    </h3>

                    <p className="text-[#8892a4] text-sm leading-relaxed mb-6 line-clamp-3">
                      {filteredPosts[0].excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/photo.jpg"
                          alt="Anup Singh"
                          className="w-8 h-8 rounded-full ring-2 ring-white/10 object-cover"
                          style={{ objectPosition: "center 20%" }}
                        />
                        <span className="text-white text-xs font-semibold">Anup Singh</span>
                      </div>
                      <span className="text-[#5a6477] text-xs">{filteredPosts[0].formattedDate}</span>
                      <span className="flex items-center gap-1 text-[#00d4ff] text-xs font-semibold">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {filteredPosts[0].readingTime} min
                      </span>
                    </div>

                    {/* Read arrow */}
                    <div className="mt-6 flex items-center gap-2 text-[#00d4ff] text-sm font-['Outfit',sans-serif] font-semibold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-500">
                      Read Article
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post, i) => (
            <article
              key={post.id}
              data-idx={i}
              className={`group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0f18] transition-all duration-500 hover:border-[#00d4ff]/20 hover:shadow-[0_0_40px_rgba(0,212,255,0.06)] hover:-translate-y-1 ${
                visibleCards.has(i)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setHoveredCard(post.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-b from-[#00d4ff]/5 via-transparent to-transparent transition-opacity duration-500 ${hoveredCard === post.id ? "opacity-100" : "opacity-0"}`} />

              <Link href={`/blog/${post.slug}`} className="relative block">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-transparent to-transparent" />

                  {/* Reading time badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-[#06080d]/80 backdrop-blur-sm rounded-full text-[10px] font-semibold text-[#00d4ff] border border-[#00d4ff]/20">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {post.readingTime} min
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-5">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.postCategories.slice(0, 2).map((cat) => (
                      <span
                        key={cat.slug}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          color: cat.color,
                          backgroundColor: cat.color + "15",
                        }}
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-[#00d4ff] transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#5a6477] text-sm line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/photo.jpg"
                        alt="Anup Singh"
                        className="w-6 h-6 rounded-full ring-1 ring-white/10 object-cover"
                        style={{ objectPosition: "center 20%" }}
                      />
                      <span className="text-[#8892a4] text-xs font-medium">
                        {post.formattedDate}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[#00d4ff] text-xs font-semibold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                      Read
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>

              {/* Corner glow on hover */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-[#00d4ff]/10 rounded-full blur-3xl transition-opacity duration-700 ${hoveredCard === post.id ? "opacity-100" : "opacity-0"}`} />
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#5a6477] text-lg">No articles in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
