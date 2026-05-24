// WordPress REST API Client
// Replace WORDPRESS_API_URL with your WordPress.com site URL
// Example: https://anupsingh-blog.wordpress.com/wp-json/wp/v2

const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL ||
  "https://anupsingh-blog.wordpress.com/wp-json/wp/v2";

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
      };
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/**
 * Fetch all published blog posts
 */
export async function getPosts(
  page: number = 1,
  perPage: number = 10
): Promise<{ posts: WPPost[]; totalPages: number }> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/posts?page=${page}&per_page=${perPage}&_embed=true&status=publish`,
      { next: { revalidate: 3600 } } // Revalidate every hour (ISR)
    );

    if (!res.ok) {
      return { posts: [], totalPages: 0 };
    }

    const text = await res.text();
    // Check if response is valid JSON
    if (!text.startsWith("[") && !text.startsWith("{")) {
      return { posts: [], totalPages: 0 };
    }

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1");
    const posts: WPPost[] = JSON.parse(text);

    return { posts, totalPages };
  } catch {
    return { posts: [], totalPages: 0 };
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=true`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return null;
    }

    const text = await res.text();
    if (!text.startsWith("[") && !text.startsWith("{")) {
      return null;
    }

    const posts: WPPost[] = JSON.parse(text);
    return posts.length > 0 ? posts[0] : null;
  } catch {
    return null;
  }
}

/**
 * Fetch all post slugs (for generateStaticParams)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const slugs: string[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await fetch(
        `${WORDPRESS_API_URL}/posts?page=${page}&per_page=100&_fields=slug&status=publish`,
        { next: { revalidate: 3600 } }
      );

      if (!res.ok) break;

      const text = await res.text();
      if (!text.startsWith("[") && !text.startsWith("{")) break;

      const posts: Array<{ slug: string }> = JSON.parse(text);
      slugs.push(...posts.map((p) => p.slug));

      const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1");
      hasMore = page < totalPages;
      page++;
    }

    return slugs;
  } catch {
    return [];
  }
}

/**
 * Fetch categories
 */
export async function getCategories(): Promise<WPCategory[]> {
  try {
    const res = await fetch(
      `${WORDPRESS_API_URL}/categories?per_page=50&hide_empty=true`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];

    const text = await res.text();
    if (!text.startsWith("[") && !text.startsWith("{")) return [];

    return JSON.parse(text);
  } catch {
    return [];
  }
}

/**
 * Get featured image URL from embedded post data
 */
export function getFeaturedImage(post: WPPost): string | null {
  if (post._embedded?.["wp:featuredmedia"]?.[0]) {
    return post._embedded["wp:featuredmedia"][0].source_url;
  }
  return null;
}

/**
 * Get category names from embedded post data
 */
export function getPostCategories(post: WPPost): string[] {
  if (post._embedded?.["wp:term"]?.[0]) {
    return post._embedded["wp:term"][0].map((term) => term.name);
  }
  return [];
}

/**
 * Strip HTML tags from string (for excerpts in meta)
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
