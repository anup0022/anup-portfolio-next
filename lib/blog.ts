import { blogPosts, categories } from "@/content/blogs";
import { BlogPost, BlogCategory } from "@/content/blogs/types";

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  const textOnly = content.replace(/<[^>]*>/g, "").replace(/[#*`\-\[\]()]/g, "");
  const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Get posts by category slug
 */
export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllPosts().filter((post) => post.categories.includes(categorySlug));
}

/**
 * Get all categories
 */
export function getAllCategories(): BlogCategory[] {
  return categories;
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return categories.find((cat) => cat.slug === slug);
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.featured);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Strip markdown/html to plain text (for meta descriptions)
 */
export function stripToPlainText(content: string): string {
  return content
    .replace(/<[^>]*>/g, "")
    .replace(/[#*`\-\[\]()>|]/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
