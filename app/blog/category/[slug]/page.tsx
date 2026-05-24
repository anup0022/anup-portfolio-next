import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostsByCategory,
  getCategoryBySlug,
  getAllCategories,
  calculateReadingTime,
  formatDate,
} from "@/lib/blog";
import BlogNav from "@/components/BlogNav";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Articles - Frontend Development Blog`,
    description: category.description,
    alternates: {
      canonical: `https://www.anup-singh.in/blog/category/${category.slug}`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(params.slug);
  const allCategories = getAllCategories();

  return (
    <main className="min-h-screen bg-white">
      <BlogNav />

      {/* Category Hero */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-4 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            All Articles
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {category.name}
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            {category.description}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Link
              href="/blog"
              className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200 transition-colors"
            >
              All Posts
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  cat.slug === params.slug
                    ? "text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={
                  cat.slug === params.slug
                    ? { backgroundColor: cat.color }
                    : undefined
                }
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No articles in this category yet.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 mt-4 text-blue-600 font-medium"
              >
                View all articles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const readingTime = calculateReadingTime(post.content);
                const postCategories = allCategories.filter((c) =>
                  post.categories.includes(c.slug)
                );

                return (
                  <article
                    key={post.id}
                    className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.coverImage}
                          alt={post.coverImageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {postCategories.slice(0, 2).map((cat) => (
                          <span
                            key={cat.slug}
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            style={{
                              color: cat.color,
                              backgroundColor: cat.color + "15",
                            }}
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <time
                          dateTime={post.date}
                          className="text-xs text-gray-400"
                        >
                          {formatDate(post.date)}
                        </time>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {readingTime} min
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Anup Singh. Senior Frontend Developer &amp; React
            Engineer in Bangalore, India.
          </p>
        </div>
      </footer>
    </main>
  );
}
