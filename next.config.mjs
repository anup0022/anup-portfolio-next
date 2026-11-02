/** @type {import('next').NextConfig} */
const nextConfig = {
  // `npm run verify` sets this so a production build does not overwrite the
  // running dev server's .next, which leaves it serving 500s until restarted.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Allow images from WordPress.com and other common CDNs
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "*.wp.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
  // Security headers for better SEO signals
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
