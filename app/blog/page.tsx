import { Metadata } from "next";
import Link from "next/link";
import {
  getAllPosts,
  getAllCategories,
  calculateReadingTime,
  formatDate,
} from "@/lib/blog";
import BlogNav from "@/components/BlogNav";
import BlogHero from "@/components/BlogHero";
import BlogGrid from "@/components/BlogGrid";

export const metadata: Metadata = {
  title: "Blog - Frontend Development, React & JavaScript Insights",
  description:
    "Technical blog by Anup Singh covering React.js, Next.js, JavaScript, WordPress development, performance optimization, and frontend architecture. Practical insights from 9.5+ years of experience.",
  alternates: {
    canonical: "https://www.anup-singh.in/blog",
  },
  openGraph: {
    title: "Blog | Anup Singh - Frontend Development Insights",
    description:
      "Technical articles on React, Next.js, JavaScript, WordPress, and modern frontend development by a Senior Software Engineer.",
    url: "https://www.anup-singh.in/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  // Prepare posts data for client component
  const postsData = posts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.content),
    formattedDate: formatDate(post.date),
    postCategories: categories.filter((c) => post.categories.includes(c.slug)),
  }));

  return (
    <main className="min-h-screen bg-[#06080d] overflow-hidden">
      <BlogNav />
      <BlogHero />
      <BlogGrid posts={postsData} categories={categories} />

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#06080d] via-[#0a1628] to-[#06080d]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00d4ff]/10 blur-[120px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#00d4ff] font-['Outfit',sans-serif] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Open to Opportunities
          </p>
          <h2 className="text-3xl md:text-4xl font-['Outfit',sans-serif] font-extrabold text-white mb-5">
            Looking for a Senior
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a855f7]"> Frontend Developer</span>?
          </h2>
          <p className="text-[#8892a4] text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            9.5+ years building React applications at enterprise scale.
            Available for new challenges.
          </p>
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-full font-['Outfit',sans-serif] font-bold text-sm uppercase tracking-wider transition-all duration-500"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] transition-opacity duration-500" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#a855f7] to-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-[1px] bg-[#06080d] rounded-full group-hover:bg-transparent transition-all duration-500" />
            <span className="relative text-[#00d4ff] group-hover:text-white transition-colors duration-500">
              Get In Touch
            </span>
            <svg className="relative w-4 h-4 text-[#00d4ff] group-hover:text-white group-hover:translate-x-1 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 bg-[#06080d]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[#5a6477] text-sm font-['DM_Sans',sans-serif]">
            &copy; 2026 Anup Singh. Senior Frontend Developer &amp; React
            Engineer in Bangalore, India.
          </p>
        </div>
      </footer>
    </main>
  );
}
