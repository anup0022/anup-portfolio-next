import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllPosts,
  getAllCategories,
  calculateReadingTime,
  formatDate,
  stripToPlainText,
} from "@/lib/blog";
import TextToSpeech from "@/components/TextToSpeech";
import MarkdownContent from "@/components/MarkdownContent";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import BlogNav from "@/components/BlogNav";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = post.excerpt.slice(0, 160);

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `https://www.anup-singh.in/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `https://www.anup-singh.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: ["Anup Singh"],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.coverImage],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const categories = getAllCategories();
  const postCategories = categories.filter((c) =>
    post.categories.includes(c.slug)
  );
  const readingTime = calculateReadingTime(post.content);
  const plainContent = stripToPlainText(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: {
      "@type": "Person",
      name: "Anup Singh",
      url: "https://www.anup-singh.in",
      jobTitle: "Senior Software Engineer",
    },
    publisher: {
      "@type": "Person",
      name: "Anup Singh",
      url: "https://www.anup-singh.in",
    },
    datePublished: post.date,
    dateModified: post.modified,
    url: `https://www.anup-singh.in/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.anup-singh.in/blog/${post.slug}`,
    },
    wordCount: plainContent.split(/\s+/).length,
    inLanguage: "en",
    keywords: post.tags.join(", "),
    articleSection: postCategories.map((c) => c.name).join(", "),
  };

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.categories.some((c) => post.categories.includes(c))
    )
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogNav />

      <article className="pt-24 pb-10 md:pt-28 md:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <AnimateOnScroll animation="fadeIn">
            <nav className="mb-8 text-sm" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
                </li>
                <li>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-gray-700 transition-colors">Blog</Link>
                </li>
                <li>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </li>
                <li className="text-gray-600 truncate max-w-[250px]">{post.title}</li>
              </ol>
            </nav>
          </AnimateOnScroll>

          {/* Categories with animation */}
          <AnimateOnScroll animation="fadeUp" delay={100}>
            <div className="flex flex-wrap gap-2 mb-5">
              {postCategories.map((cat, i) => (
                <Link
                  key={cat.slug}
                  href={`/blog/category/${cat.slug}`}
                  className="text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-md"
                  style={{
                    color: cat.color,
                    backgroundColor: cat.color + "15",
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Animated Title */}
          <AnimateOnScroll animation="fadeUp" delay={200}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-[1.1] tracking-tight">
              {post.title}
            </h1>
          </AnimateOnScroll>

          {/* Meta Row with animated border */}
          <AnimateOnScroll animation="fadeUp" delay={300}>
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/photo.jpg"
                    alt="Anup Singh"
                    className="relative w-11 h-11 rounded-full object-cover object-center ring-2 ring-white"
                    width={44}
                    height={44}
                  />
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-900">Anup Singh</span>
                  <span className="text-xs text-gray-500">Senior Frontend Developer</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time dateTime={post.date} className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {formatDate(post.date)}
                </time>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {readingTime} min read
                </span>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Text to Speech - Animated entry */}
          <AnimateOnScroll animation="scale" delay={400}>
            <div className="mb-8">
              <TextToSpeech content={post.content} />
            </div>
          </AnimateOnScroll>

          {/* Cover Image with parallax-like effect */}
          <AnimateOnScroll animation="fadeUp" delay={500}>
            <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 group">
              <div className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </AnimateOnScroll>

          {/* Article Content */}
          <div className="mt-2">
            <MarkdownContent content={post.content} />
          </div>

          {/* Tags with hover animations */}
          <AnimateOnScroll animation="fadeUp">
            <div className="mt-14 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-gray-500 mr-2">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-100 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 cursor-default hover:scale-105 hover:shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Author Box - Animated & Fixed Image */}
          <AnimateOnScroll animation="fadeUp">
            <div className="mt-12 relative overflow-hidden rounded-3xl border border-gray-100 shadow-xl shadow-blue-100/30">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-violet-50 to-cyan-50 animate-gradient" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-200/20 rounded-full blur-3xl animate-pulse delay-1000" />

              <div className="relative p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Fixed author image - square with object-cover */}
                <div className="relative flex-shrink-0 group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-600 rounded-2xl opacity-50 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/photo.jpg"
                    alt="Anup Singh"
                    className="relative w-24 h-24 rounded-2xl object-cover object-top ring-4 ring-white shadow-lg"
                    width={96}
                    height={96}
                    style={{ objectPosition: "center 20%" }}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                    Written by
                  </p>
                  <h3 className="text-xl font-black text-gray-900 mb-1">
                    Anup Singh
                  </h3>
                  <p className="text-sm font-medium text-violet-600 mb-3">
                    Senior Software Engineer &amp; Frontend Developer
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    Building high-performance web applications with React, Next.js, and JavaScript for 9.5+ years at enterprise scale. Leading dev teams and mentoring engineers in Bangalore, India.
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <a
                      href="https://www.linkedin.com/in/00anup-singh/"
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 rounded-xl text-xs font-semibold border border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/anup0022"
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 rounded-xl text-xs font-semibold border border-gray-200 hover:border-gray-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl text-xs font-semibold hover:shadow-lg hover:shadow-blue-300/30 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      Hire Me
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Related Posts with card animations */}
          {relatedPosts.length > 0 && (
            <AnimateOnScroll animation="fadeUp">
              <div className="mt-16">
                <h2 className="text-2xl font-black text-gray-900 mb-6">
                  Continue Reading
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((related, i) => {
                    const relatedReadTime = calculateReadingTime(related.content);
                    return (
                      <AnimateOnScroll key={related.id} animation="fadeUp" delay={i * 150}>
                        <Link
                          href={`/blog/${related.slug}`}
                          className="group block p-5 border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 bg-gradient-to-br from-white to-gray-50/50"
                        >
                          <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={related.coverImage}
                                alt={related.coverImageAlt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 text-sm mb-2">
                                {related.title}
                              </h3>
                              <p className="text-xs text-gray-400 flex items-center gap-2">
                                <span>{formatDate(related.date)}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span>{relatedReadTime} min read</span>
                              </p>
                              <span className="inline-block mt-2 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                                Read article &rarr;
                              </span>
                            </div>
                          </div>
                        </Link>
                      </AnimateOnScroll>
                    );
                  })}
                </div>
              </div>
            </AnimateOnScroll>
          )}

          {/* Back to Blog */}
          <AnimateOnScroll animation="fadeIn">
            <div className="mt-10 pt-6 border-t border-gray-100">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-all duration-300 hover:-translate-x-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to all articles
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Anup Singh. Senior Frontend Developer &amp; React Engineer in Bangalore, India.
          </p>
        </div>
      </footer>
    </main>
  );
}
