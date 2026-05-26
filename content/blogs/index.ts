import { BlogPost, BlogCategory } from "./types";

export const categories: BlogCategory[] = [
  {
    id: "react",
    name: "React.js",
    slug: "react",
    description: "React development tips, patterns, and performance optimization",
    color: "#61DAFB",
  },
  {
    id: "performance",
    name: "Performance",
    slug: "performance",
    description: "Web performance optimization techniques and Core Web Vitals",
    color: "#FF6B6B",
  },
  {
    id: "wordpress",
    name: "WordPress",
    slug: "wordpress",
    description: "WordPress development, headless CMS, and custom solutions",
    color: "#21759B",
  },
  {
    id: "architecture",
    name: "Architecture",
    slug: "architecture",
    description: "Frontend architecture patterns and system design",
    color: "#7C3AED",
  },
  {
    id: "javascript",
    name: "JavaScript",
    slug: "javascript",
    description: "Modern JavaScript techniques and best practices",
    color: "#F7DF1E",
  },
  {
    id: "career",
    name: "Career",
    slug: "career",
    description: "Engineering leadership, mentoring, and career growth",
    color: "#10B981",
  },
  {
    id: "security",
    name: "Security",
    slug: "security",
    description: "Web security, data protection, and cybersecurity best practices",
    color: "#EF4444",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "4",
    slug: "data-protection-web-security-essentials",
    title: "Data Protection: Why 68% of Websites Are Insecure & How to Fix Yours",
    excerpt:
      "A comprehensive visual guide to understanding web security vulnerabilities, data protection fundamentals, and the essential steps every developer must take to protect user data in 2026.",
    coverImage: "https://www.livelaw.in/h-upload/2025/02/18/587418-digital-personal-data-protection-rules.jpg",
    coverImageAlt: "Data protection shield with lock icon representing web security",
    date: "2026-05-26",
    modified: "2026-05-26",
    author: "Anup Singh",
    categories: ["security", "architecture"],
    tags: ["Security", "Data Protection", "HTTPS", "OWASP", "Encryption", "Privacy", "Web Security"],
    featured: true,
    layout: "full-width",
    content: "full-width-custom",
  },
  {
    id: "1",
    slug: "how-i-optimized-react-app-performance-by-40-percent",
    title: "How I Optimized React App Performance by 40% at Enterprise Scale",
    excerpt:
      "A deep dive into the exact techniques I used to dramatically improve React application performance on a large-scale project, reducing Time to Interactive by 40% for millions of users.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop",
    coverImageAlt: "Developer working on laptop with code on screen optimizing web application performance",
    date: "2026-05-20",
    modified: "2026-05-24",
    author: "Anup Singh",
    categories: ["react", "performance", "javascript"],
    tags: ["React", "Performance", "Web Vitals", "Optimization", "Memoization", "Code Splitting"],
    featured: true,
    content: `
## The Problem: A Sluggish Enterprise Application

When I took over as frontend lead on a major enterprise web platform, the application was suffering from severe performance issues. Users were experiencing:

- **Time to Interactive (TTI):** 8.2 seconds on average
- **First Contentful Paint (FCP):** 3.8 seconds
- **Largest Contentful Paint (LCP):** 5.6 seconds
- **Bundle size:** 2.4MB (uncompressed JavaScript)

The client was losing users. Analytics showed a 35% bounce rate increase over 3 months. Something had to change — fast.

<div style="margin: 2.5rem 0; padding: 2rem; border-radius: 1.5rem; background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f5f3ff 100%); border: 1px solid #e2e8f0;">
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #6366f1;">Performance Snapshot</span>
    <h4 style="font-size: 1.125rem; font-weight: 800; color: #1e293b; margin: 0.25rem 0 0 0;">Before Optimization</h4>
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
    <div class="blog-metric-card" style="background: white; border-radius: 1rem; padding: 1.25rem; text-align: center; border: 1px solid #fee2e2; animation-delay: 0.1s;">
      <div style="font-size: 2rem; font-weight: 900; color: #dc2626;">8.2s</div>
      <div style="font-size: 0.75rem; color: #6b7280; font-weight: 600;">Time to Interactive</div>
      <div style="margin-top: 0.5rem; height: 4px; border-radius: 2px; background: #fecaca; overflow: hidden;">
        <div class="blog-chart-bar-h" style="--bar-width: 85%; height: 100%; background: #dc2626; border-radius: 2px; animation-delay: 0.3s;"></div>
      </div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 1rem; padding: 1.25rem; text-align: center; border: 1px solid #fee2e2; animation-delay: 0.2s;">
      <div style="font-size: 2rem; font-weight: 900; color: #dc2626;">3.8s</div>
      <div style="font-size: 0.75rem; color: #6b7280; font-weight: 600;">First Contentful Paint</div>
      <div style="margin-top: 0.5rem; height: 4px; border-radius: 2px; background: #fecaca; overflow: hidden;">
        <div class="blog-chart-bar-h" style="--bar-width: 65%; height: 100%; background: #dc2626; border-radius: 2px; animation-delay: 0.5s;"></div>
      </div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 1rem; padding: 1.25rem; text-align: center; border: 1px solid #fee2e2; animation-delay: 0.3s;">
      <div style="font-size: 2rem; font-weight: 900; color: #dc2626;">5.6s</div>
      <div style="font-size: 0.75rem; color: #6b7280; font-weight: 600;">Largest Contentful Paint</div>
      <div style="margin-top: 0.5rem; height: 4px; border-radius: 2px; background: #fecaca; overflow: hidden;">
        <div class="blog-chart-bar-h" style="--bar-width: 75%; height: 100%; background: #dc2626; border-radius: 2px; animation-delay: 0.7s;"></div>
      </div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 1rem; padding: 1.25rem; text-align: center; border: 1px solid #fee2e2; animation-delay: 0.4s;">
      <div style="font-size: 2rem; font-weight: 900; color: #dc2626;">2.4MB</div>
      <div style="font-size: 0.75rem; color: #6b7280; font-weight: 600;">Bundle Size</div>
      <div style="margin-top: 0.5rem; height: 4px; border-radius: 2px; background: #fecaca; overflow: hidden;">
        <div class="blog-chart-bar-h" style="--bar-width: 95%; height: 100%; background: #dc2626; border-radius: 2px; animation-delay: 0.9s;"></div>
      </div>
    </div>
  </div>
</div>

In this article, I'll walk you through the exact optimization strategy I implemented that reduced TTI by 40%, brought LCP under 2.5 seconds, and cut the bundle size by 60%.

---

## My 6-Step Optimization Process

<div style="margin: 2rem 0; padding: 1.5rem; border-radius: 1.5rem; background: linear-gradient(135deg, #f8fafc, #f0f9ff); border: 1px solid #e0f2fe;">
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
    <div class="blog-metric-card" style="background: white; border-radius: 1rem; padding: 1.25rem; border-left: 4px solid #3b82f6; animation-delay: 0.1s;">
      <div style="font-size: 1.5rem; font-weight: 900; color: #3b82f6; margin-bottom: 0.25rem;">01</div>
      <div style="font-weight: 700; color: #1e293b; font-size: 0.875rem;">Profile & Identify</div>
      <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">2 days of deep profiling with React DevTools + Lighthouse</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 1rem; padding: 1.25rem; border-left: 4px solid #8b5cf6; animation-delay: 0.2s;">
      <div style="font-size: 1.5rem; font-weight: 900; color: #8b5cf6; margin-bottom: 0.25rem;">02</div>
      <div style="font-weight: 700; color: #1e293b; font-size: 0.875rem;">Fix Re-renders</div>
      <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">Granular selectors + React.memo eliminated 60% of wasted renders</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 1rem; padding: 1.25rem; border-left: 4px solid #06b6d4; animation-delay: 0.3s;">
      <div style="font-size: 1.5rem; font-weight: 900; color: #06b6d4; margin-bottom: 0.25rem;">03</div>
      <div style="font-weight: 700; color: #1e293b; font-size: 0.875rem;">Code Splitting</div>
      <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">Route + component-level splitting reduced bundle by 63%</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 1rem; padding: 1.25rem; border-left: 4px solid #10b981; animation-delay: 0.4s;">
      <div style="font-size: 1.5rem; font-weight: 900; color: #10b981; margin-bottom: 0.25rem;">04</div>
      <div style="font-weight: 700; color: #1e293b; font-size: 0.875rem;">Image Optimization</div>
      <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">WebP + lazy loading + responsive sizes cut images by 82%</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 1rem; padding: 1.25rem; border-left: 4px solid #f59e0b; animation-delay: 0.5s;">
      <div style="font-size: 1.5rem; font-weight: 900; color: #f59e0b; margin-bottom: 0.25rem;">05</div>
      <div style="font-weight: 700; color: #1e293b; font-size: 0.875rem;">Script Management</div>
      <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">Defer + lazy strategies saved 800ms render-blocking time</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 1rem; padding: 1.25rem; border-left: 4px solid #ec4899; animation-delay: 0.6s;">
      <div style="font-size: 1.5rem; font-weight: 900; color: #ec4899; margin-bottom: 0.25rem;">06</div>
      <div style="font-weight: 700; color: #1e293b; font-size: 0.875rem;">Caching & Prefetch</div>
      <div style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">Service worker + route prefetching for instant navigation</div>
    </div>
  </div>
</div>

---

## Step 1: Profiling — Finding the Real Bottlenecks

Before writing a single line of optimized code, I spent two full days profiling. This is the most important step — **never optimize blindly**.

### Tools I Used:
- **React DevTools Profiler** — to identify unnecessary re-renders
- **Chrome DevTools Performance tab** — to find long tasks blocking the main thread
- **Lighthouse CI** — for automated performance scoring in our pipeline
- **Bundle Analyzer** — to visualize what's actually in the bundle

### What I Found:

| Issue | Impact | Priority |
|-------|--------|----------|
| Entire Redux store re-rendering on every action | 45% of unnecessary renders | Critical |
| No code splitting — single monolithic bundle | 2.4MB initial load | Critical |
| Unoptimized images (PNG, no lazy loading) | 1.8MB additional payload | High |
| Synchronous third-party scripts | 800ms render blocking | High |
| Inline styles causing layout thrashing | Poor CLS score | Medium |

> **Pro Tip:** Never optimize blindly. Always profile first. The bottlenecks are rarely where you think they are.

---

## Step 2: Eliminating Unnecessary Re-renders

This was the **single biggest win**. The Redux store was structured poorly, causing the entire component tree to re-render on every state change.

<div style="margin: 2rem 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <div style="padding: 1.5rem; border-radius: 1rem; background: #fef2f2; border: 1px solid #fecaca;">
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
      <span style="font-size: 1.25rem;">&#10060;</span>
      <span style="font-weight: 800; color: #dc2626; font-size: 0.875rem;">Before</span>
    </div>
    <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; color: #7f1d1d;">
      <li style="padding: 0.4rem 0; border-bottom: 1px solid #fecaca;">Selecting entire store object</li>
      <li style="padding: 0.4rem 0; border-bottom: 1px solid #fecaca;">Every component re-renders on any change</li>
      <li style="padding: 0.4rem 0; border-bottom: 1px solid #fecaca;">No memoization anywhere</li>
      <li style="padding: 0.4rem 0;">500+ item lists rendered directly in DOM</li>
    </ul>
  </div>
  <div style="padding: 1.5rem; border-radius: 1rem; background: #f0fdf4; border: 1px solid #bbf7d0;">
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
      <span style="font-size: 1.25rem;">&#9989;</span>
      <span style="font-weight: 800; color: #16a34a; font-size: 0.875rem;">After</span>
    </div>
    <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; color: #14532d;">
      <li style="padding: 0.4rem 0; border-bottom: 1px solid #bbf7d0;">Granular selectors with createSelector</li>
      <li style="padding: 0.4rem 0; border-bottom: 1px solid #bbf7d0;">Only affected components re-render</li>
      <li style="padding: 0.4rem 0; border-bottom: 1px solid #bbf7d0;">React.memo on 23 expensive components</li>
      <li style="padding: 0.4rem 0;">Virtualized lists with react-window (~20 DOM nodes)</li>
    </ul>
  </div>
</div>

**The techniques in detail:**

1. **Granular Redux Selectors** — Instead of selecting the entire store, we created pinpoint selectors using createSelector that only trigger re-renders when the specific piece of data changes.

2. **React.memo on 23 components** — Wrapped expensive components that were pure but re-rendering due to parent updates.

3. **useMemo for computed values** — Identified 15 places where expensive filtering/sorting ran on every render.

4. **Virtualization** — Replaced a 500+ item product list with react-window, reducing DOM nodes from 2000+ to ~20 visible.

### Result: 60% reduction in unnecessary re-renders

---

## Step 3: Aggressive Code Splitting

The monolithic 2.4MB bundle was killing initial load time. I split it at two levels:

<div style="margin: 2rem 0; padding: 2rem; border-radius: 1.5rem; background: linear-gradient(135deg, #faf5ff, #f0f9ff); border: 1px solid #e9d5ff;">
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7c3aed;">Bundle Reduction</span>
    <h4 style="font-size: 1.125rem; font-weight: 800; color: #1e293b; margin: 0.25rem 0 0 0;">From 2.4MB to 890KB</h4>
  </div>
  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
    <div style="background: white; border-radius: 0.75rem; padding: 1rem; border: 1px solid #e2e8f0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="font-weight: 700; color: #1e293b; font-size: 0.8rem;">Route-Level Splitting</span>
        <span style="font-size: 0.7rem; font-weight: 700; color: #7c3aed;">-45%</span>
      </div>
      <div style="height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden;">
        <div class="blog-chart-bar-h" style="--bar-width: 45%; height: 100%; background: linear-gradient(90deg, #7c3aed, #a855f7); border-radius: 4px; animation-delay: 0.2s;"></div>
      </div>
      <div style="font-size: 0.7rem; color: #6b7280; margin-top: 0.4rem;">Lazy-loaded each route with React.lazy + Suspense</div>
    </div>
    <div style="background: white; border-radius: 0.75rem; padding: 1rem; border: 1px solid #e2e8f0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="font-weight: 700; color: #1e293b; font-size: 0.8rem;">Component-Level Splitting</span>
        <span style="font-size: 0.7rem; font-weight: 700; color: #06b6d4;">-12%</span>
      </div>
      <div style="height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden;">
        <div class="blog-chart-bar-h" style="--bar-width: 12%; height: 100%; background: linear-gradient(90deg, #06b6d4, #22d3ee); border-radius: 4px; animation-delay: 0.4s;"></div>
      </div>
      <div style="font-size: 0.7rem; color: #6b7280; margin-top: 0.4rem;">Heavy chart library loaded only on analytics page</div>
    </div>
    <div style="background: white; border-radius: 0.75rem; padding: 1rem; border: 1px solid #e2e8f0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="font-weight: 700; color: #1e293b; font-size: 0.8rem;">Vendor Chunk Optimization</span>
        <span style="font-size: 0.7rem; font-weight: 700; color: #10b981;">-6%</span>
      </div>
      <div style="height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden;">
        <div class="blog-chart-bar-h" style="--bar-width: 6%; height: 100%; background: linear-gradient(90deg, #10b981, #34d399); border-radius: 4px; animation-delay: 0.6s;"></div>
      </div>
      <div style="font-size: 0.7rem; color: #6b7280; margin-top: 0.4rem;">Separated vendor chunks for better caching</div>
    </div>
  </div>
</div>

### Result: Bundle reduced from 2.4MB to 890KB initial load (63% reduction)

---

## Step 4: Image Optimization

Images accounted for 1.8MB of the page weight. Three changes made all the difference:

1. **WebP format** — 40% smaller than PNG with same quality
2. **Responsive sizes** — Serve device-appropriate images (640px for mobile, 1920px for desktop)
3. **Smart loading** — Hero image loads eager with high priority, everything else lazy loads

### Result: Image payload reduced from 1.8MB to 320KB (82% reduction)

---

## Step 5: Third-Party Script Management

Third-party scripts were blocking rendering for 800ms. The fix was simple — proper loading strategies:

| Script | Strategy | Savings |
|--------|----------|---------|
| Google Analytics | Load after first interaction | 200ms |
| Chat Widget | Load only when user scrolls | 350ms |
| Marketing Pixels | Offload to web worker | 250ms |

### Result: 800ms saved in render-blocking time

---

## Step 6: Caching & Prefetching

The final layer — making repeat visits and navigation instant:

- **API Response Caching** — SessionStorage cache with 5-minute TTL for frequently accessed data
- **Route Prefetching** — Prefetch likely next pages on hover
- **Static Asset Caching** — Aggressive service worker caching for CSS, JS, and images

---

## The Final Results

<div style="margin: 2.5rem 0; padding: 2rem; border-radius: 1.5rem; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #eff6ff 100%); border: 1px solid #d1fae5;">
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #059669;">Results Achieved</span>
    <h4 style="font-size: 1.125rem; font-weight: 800; color: #1e293b; margin: 0.25rem 0 0 0;">Before vs After Optimization</h4>
  </div>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div class="blog-metric-card" style="display: flex; align-items: center; gap: 1rem; background: white; border-radius: 0.75rem; padding: 1rem 1.25rem; border: 1px solid #e2e8f0; animation-delay: 0.1s;">
      <span style="font-size: 0.75rem; font-weight: 700; color: #6b7280; width: 40px;">TTI</span>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div class="blog-chart-bar-h" style="--bar-width: 82%; height: 8px; background: #fca5a5; border-radius: 4px; animation-delay: 0.2s;"></div>
          <span style="font-size: 0.7rem; color: #dc2626; font-weight: 700;">8.2s</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div class="blog-chart-bar-h" style="--bar-width: 49%; height: 8px; background: #34d399; border-radius: 4px; animation-delay: 0.5s;"></div>
          <span style="font-size: 0.7rem; color: #059669; font-weight: 700;">4.9s</span>
        </div>
      </div>
      <span style="font-size: 0.875rem; font-weight: 900; color: #059669; background: #d1fae5; padding: 0.25rem 0.75rem; border-radius: 1rem;">-40%</span>
    </div>
    <div class="blog-metric-card" style="display: flex; align-items: center; gap: 1rem; background: white; border-radius: 0.75rem; padding: 1rem 1.25rem; border: 1px solid #e2e8f0; animation-delay: 0.2s;">
      <span style="font-size: 0.75rem; font-weight: 700; color: #6b7280; width: 40px;">LCP</span>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div class="blog-chart-bar-h" style="--bar-width: 75%; height: 8px; background: #fca5a5; border-radius: 4px; animation-delay: 0.3s;"></div>
          <span style="font-size: 0.7rem; color: #dc2626; font-weight: 700;">5.6s</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div class="blog-chart-bar-h" style="--bar-width: 30%; height: 8px; background: #34d399; border-radius: 4px; animation-delay: 0.6s;"></div>
          <span style="font-size: 0.7rem; color: #059669; font-weight: 700;">2.3s</span>
        </div>
      </div>
      <span style="font-size: 0.875rem; font-weight: 900; color: #059669; background: #d1fae5; padding: 0.25rem 0.75rem; border-radius: 1rem;">-59%</span>
    </div>
    <div class="blog-metric-card" style="display: flex; align-items: center; gap: 1rem; background: white; border-radius: 0.75rem; padding: 1rem 1.25rem; border: 1px solid #e2e8f0; animation-delay: 0.3s;">
      <span style="font-size: 0.75rem; font-weight: 700; color: #6b7280; width: 40px;">Size</span>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div class="blog-chart-bar-h" style="--bar-width: 95%; height: 8px; background: #fca5a5; border-radius: 4px; animation-delay: 0.4s;"></div>
          <span style="font-size: 0.7rem; color: #dc2626; font-weight: 700;">2.4MB</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div class="blog-chart-bar-h" style="--bar-width: 35%; height: 8px; background: #34d399; border-radius: 4px; animation-delay: 0.7s;"></div>
          <span style="font-size: 0.7rem; color: #059669; font-weight: 700;">890KB</span>
        </div>
      </div>
      <span style="font-size: 0.875rem; font-weight: 900; color: #059669; background: #d1fae5; padding: 0.25rem 0.75rem; border-radius: 1rem;">-63%</span>
    </div>
  </div>
  <div style="text-align: center; margin-top: 1.5rem;">
    <div class="blog-pulse" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.25rem; background: #ecfdf5; border-radius: 2rem; border: 1px solid #a7f3d0;">
      <span style="font-size: 1.5rem;">&#9889;</span>
      <span style="font-size: 0.875rem; font-weight: 800; color: #047857;">Lighthouse: 42 &#8594; 91</span>
    </div>
  </div>
</div>

---

## Key Takeaways

1. **Always profile before optimizing** — Don't guess where the bottlenecks are
2. **Re-renders are the silent killer** — Use React DevTools Profiler religiously
3. **Code splitting is non-negotiable** — No user should download code they won't use
4. **Images are usually the biggest payload** — WebP + lazy loading = instant wins
5. **Third-party scripts add up** — Audit and defer everything that's not critical
6. **Measure continuously** — Set up Lighthouse CI to catch regressions early

---

## Tools and Resources

- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [Web Vitals Chrome Extension](https://chrome.google.com/webstore/detail/web-vitals)
- [Bundle Analyzer for Webpack/Next.js](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

*Have questions about React performance optimization? Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/00anup-singh/) or [email me](mailto:anup0022@gmail.com).*
    `,
  },
  {
    id: "2",
    slug: "complete-guide-wordpress-to-headless-migration-nextjs",
    title: "WordPress to Headless: The Complete Migration Guide with Next.js (2026)",
    excerpt:
      "A step-by-step guide to migrating traditional WordPress sites to a headless architecture using Next.js. Based on real-world enterprise migrations I've delivered for clients like CPPIB and Enercare.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop",
    coverImageAlt: "Headless WordPress architecture - modern code editor with WordPress and Next.js",
    date: "2026-05-15",
    modified: "2026-05-24",
    author: "Anup Singh",
    categories: ["wordpress", "react", "architecture"],
    tags: ["WordPress", "Headless CMS", "Next.js", "Migration", "WPGraphQL", "REST API", "SSG", "ISR"],
    featured: true,
    content: `
## Why Go Headless? The Business Case

After migrating 5+ enterprise WordPress sites to headless architecture across different projects, I can tell you the results are consistently impressive:

- **40-60% improvement in page load speed**
- **Better SEO rankings** (Core Web Vitals improvement)
- **Improved developer experience** (React/Next.js frontend)
- **Enhanced security** (WordPress not exposed to public)
- **Infinite scalability** via CDN-delivered static pages

But migration is complex. Done wrong, you can lose SEO rankings, break existing functionality, and frustrate your content team.

<div style="margin: 2.5rem 0; padding: 2rem; border-radius: 1.5rem; background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 50%, #fdf4ff 100%); border: 1px solid #e0e7ff;">
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7c3aed;">Architecture</span>
    <h4 style="font-size: 1.125rem; font-weight: 800; color: #1e293b; margin: 0.25rem 0 0 0;">Headless WordPress Flow</h4>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <div class="blog-arch-box" style="width: 100%; max-width: 320px; padding: 1rem 1.5rem; background: linear-gradient(135deg, #1e40af, #3b82f6); border-radius: 1rem; text-align: center; color: white; font-weight: 700; font-size: 0.875rem; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); animation-delay: 0.1s;">
      <div style="font-size: 1.25rem; margin-bottom: 0.25rem;">&#9997;</div>
      WordPress CMS (Content)
    </div>
    <div class="blog-flow-arrow" style="font-size: 1.5rem; color: #6366f1;">&#8595;</div>
    <div class="blog-arch-box" style="width: 100%; max-width: 320px; padding: 1rem 1.5rem; background: linear-gradient(135deg, #7c3aed, #a855f7); border-radius: 1rem; text-align: center; color: white; font-weight: 700; font-size: 0.875rem; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3); animation-delay: 0.3s;">
      <div style="font-size: 1.25rem; margin-bottom: 0.25rem;">&#128268;</div>
      REST API / WPGraphQL
    </div>
    <div class="blog-flow-arrow" style="font-size: 1.5rem; color: #6366f1;">&#8595;</div>
    <div class="blog-arch-box" style="width: 100%; max-width: 320px; padding: 1rem 1.5rem; background: linear-gradient(135deg, #0f766e, #14b8a6); border-radius: 1rem; text-align: center; color: white; font-weight: 700; font-size: 0.875rem; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3); animation-delay: 0.5s;">
      <div style="font-size: 1.25rem; margin-bottom: 0.25rem;">&#9889;</div>
      Next.js Frontend (SSG/ISR)
    </div>
    <div class="blog-flow-arrow" style="font-size: 1.5rem; color: #6366f1;">&#8595;</div>
    <div class="blog-arch-box" style="width: 100%; max-width: 320px; padding: 1rem 1.5rem; background: linear-gradient(135deg, #b45309, #f59e0b); border-radius: 1rem; text-align: center; color: white; font-weight: 700; font-size: 0.875rem; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3); animation-delay: 0.7s;">
      <div style="font-size: 1.25rem; margin-bottom: 0.25rem;">&#127757;</div>
      CDN Edge (Global Delivery)
    </div>
  </div>
  <div style="text-align: center; margin-top: 1.25rem;">
    <span style="font-size: 0.7rem; color: #6b7280; font-style: italic;">Content flows from WordPress through API to static pages on CDN</span>
  </div>
</div>

---

## Migration Timeline: 4-Week Plan

<div style="margin: 2rem 0; padding: 0; display: flex; flex-direction: column; gap: 0;">
  <div class="blog-metric-card" style="display: flex; gap: 1rem; padding: 1.5rem; border-left: 4px solid #3b82f6; background: linear-gradient(90deg, #eff6ff, transparent); border-radius: 0 1rem 1rem 0; animation-delay: 0.1s;">
    <div style="flex-shrink: 0; width: 60px; text-align: center;">
      <div style="font-size: 1.5rem; font-weight: 900; color: #3b82f6;">W1</div>
    </div>
    <div>
      <div style="font-weight: 800; color: #1e293b; margin-bottom: 0.25rem;">Audit & Planning</div>
      <div style="font-size: 0.8rem; color: #6b7280;">Content audit, URL mapping, taxonomy structure, redirect plan, technical requirements</div>
    </div>
  </div>
  <div class="blog-metric-card" style="display: flex; gap: 1rem; padding: 1.5rem; border-left: 4px solid #8b5cf6; background: linear-gradient(90deg, #f5f3ff, transparent); border-radius: 0 1rem 1rem 0; animation-delay: 0.2s;">
    <div style="flex-shrink: 0; width: 60px; text-align: center;">
      <div style="font-size: 1.5rem; font-weight: 900; color: #8b5cf6;">W2</div>
    </div>
    <div>
      <div style="font-weight: 800; color: #1e293b; margin-bottom: 0.25rem;">WordPress API Setup</div>
      <div style="font-size: 0.8rem; color: #6b7280;">Install WPGraphQL, configure custom fields exposure, set up authentication, create API endpoints</div>
    </div>
  </div>
  <div class="blog-metric-card" style="display: flex; gap: 1rem; padding: 1.5rem; border-left: 4px solid #06b6d4; background: linear-gradient(90deg, #ecfeff, transparent); border-radius: 0 1rem 1rem 0; animation-delay: 0.3s;">
    <div style="flex-shrink: 0; width: 60px; text-align: center;">
      <div style="font-size: 1.5rem; font-weight: 900; color: #06b6d4;">W3</div>
    </div>
    <div>
      <div style="font-weight: 800; color: #1e293b; margin-bottom: 0.25rem;">Next.js Frontend Build</div>
      <div style="font-size: 0.8rem; color: #6b7280;">Build pages with SSG/ISR, integrate API, image optimization, SEO metadata, preview mode</div>
    </div>
  </div>
  <div class="blog-metric-card" style="display: flex; gap: 1rem; padding: 1.5rem; border-left: 4px solid #10b981; background: linear-gradient(90deg, #ecfdf5, transparent); border-radius: 0 1rem 1rem 0; animation-delay: 0.4s;">
    <div style="flex-shrink: 0; width: 60px; text-align: center;">
      <div style="font-size: 1.5rem; font-weight: 900; color: #10b981;">W4</div>
    </div>
    <div>
      <div style="font-weight: 800; color: #1e293b; margin-bottom: 0.25rem;">Launch & Monitor</div>
      <div style="font-size: 0.8rem; color: #6b7280;">301 redirects, DNS cutover, Search Console monitoring, performance validation, rollback plan</div>
    </div>
  </div>
</div>

---

## Phase 1: Audit and Planning

Before touching any code, audit your existing WordPress site completely.

### Content Audit Checklist:

- [ ] Total number of pages and posts
- [ ] Custom Post Types (CPTs) in use
- [ ] Advanced Custom Fields (ACF) structure
- [ ] Taxonomy structure (categories, tags, custom)
- [ ] Menu structures and navigation hierarchy
- [ ] Forms and their submission handling
- [ ] Third-party integrations (payment, CRM, etc.)
- [ ] URL structure and existing redirects

### SEO Preservation Plan:

This is **critical**. I've seen migrations tank SEO because teams skip this step.

- Map every existing URL to its new equivalent
- Prepare 301 redirects for any URL changes
- Export all meta titles, descriptions, and OG data
- Document canonical URLs and hreflang tags
- Set up Google Search Console before migration

---

## Phase 2: WordPress API Configuration

Two main options for exposing WordPress data:

<div style="margin: 2rem 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <div style="padding: 1.5rem; border-radius: 1rem; background: white; border: 2px solid #3b82f6; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.1);">
    <div style="font-size: 1.5rem; text-align: center; margin-bottom: 0.5rem;">&#128640;</div>
    <div style="font-weight: 800; color: #1e40af; text-align: center; margin-bottom: 0.75rem;">WPGraphQL</div>
    <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; color: #374151;">
      <li style="padding: 0.3rem 0;">&#9989; Fetch only what you need</li>
      <li style="padding: 0.3rem 0;">&#9989; Single request for related data</li>
      <li style="padding: 0.3rem 0;">&#9989; Type-safe with codegen</li>
      <li style="padding: 0.3rem 0;">&#9989; Better for complex queries</li>
      <li style="padding: 0.3rem 0; color: #dc2626;">&#10060; Steeper learning curve</li>
    </ul>
    <div style="margin-top: 0.75rem; text-align: center; font-size: 0.7rem; font-weight: 700; color: #3b82f6; background: #eff6ff; padding: 0.4rem; border-radius: 0.5rem;">RECOMMENDED</div>
  </div>
  <div style="padding: 1.5rem; border-radius: 1rem; background: white; border: 2px solid #e2e8f0;">
    <div style="font-size: 1.5rem; text-align: center; margin-bottom: 0.5rem;">&#128230;</div>
    <div style="font-weight: 800; color: #374151; text-align: center; margin-bottom: 0.75rem;">REST API</div>
    <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.8rem; color: #374151;">
      <li style="padding: 0.3rem 0;">&#9989; Built into WordPress core</li>
      <li style="padding: 0.3rem 0;">&#9989; Familiar REST patterns</li>
      <li style="padding: 0.3rem 0;">&#9989; Well-documented</li>
      <li style="padding: 0.3rem 0;">&#9989; Easy to get started</li>
      <li style="padding: 0.3rem 0; color: #dc2626;">&#10060; Over-fetching issues</li>
    </ul>
    <div style="margin-top: 0.75rem; text-align: center; font-size: 0.7rem; font-weight: 700; color: #6b7280; background: #f8fafc; padding: 0.4rem; border-radius: 0.5rem;">SIMPLER OPTION</div>
  </div>
</div>

---

## Phase 3: Next.js Frontend

The frontend is where the magic happens. Key implementation decisions:

**Rendering Strategy:**
- **Static Generation (SSG)** for pages that rarely change (About, Services)
- **Incremental Static Regeneration (ISR)** for blog posts (revalidate every hour)
- **On-Demand Revalidation** triggered by WordPress webhooks when content updates

**Critical Features:**
- Preview mode for editors to see drafts before publishing
- Image optimization via Next.js Image component
- Automatic sitemap generation
- SEO metadata from WordPress Yoast/RankMath fields

---

## Phase 4: SEO-Safe Launch

The launch is where most teams mess up. Here's my battle-tested checklist:

<div style="margin: 2rem 0; padding: 1.5rem; border-radius: 1rem; background: #fffbeb; border: 1px solid #fde68a;">
  <div style="font-weight: 800; color: #92400e; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
    <span style="font-size: 1.25rem;">&#9888;&#65039;</span> Critical Launch Steps
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.8rem;">
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; border: 1px solid #fde68a;">&#9989; All 301 redirects configured and tested</div>
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; border: 1px solid #fde68a;">&#9989; XML sitemap submitted to Search Console</div>
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; border: 1px solid #fde68a;">&#9989; Robots.txt verified (no accidental noindex)</div>
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; border: 1px solid #fde68a;">&#9989; Canonical URLs pointing to correct domain</div>
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; border: 1px solid #fde68a;">&#9989; OG tags and structured data intact</div>
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; border: 1px solid #fde68a;">&#9989; Core Web Vitals passing on new frontend</div>
  </div>
</div>

---

## Performance Results: Real Client Data

<div style="margin: 2rem 0; padding: 2rem; border-radius: 1.5rem; background: linear-gradient(135deg, #f0fdf4, #ecfdf5); border: 1px solid #bbf7d0;">
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #059669;">CPPIB Migration Results</span>
  </div>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
    <div class="blog-metric-card" style="text-align: center; background: white; border-radius: 1rem; padding: 1.25rem; animation-delay: 0.1s;">
      <div style="font-size: 1.75rem; font-weight: 900; color: #059669;">96%</div>
      <div style="font-size: 0.7rem; color: #6b7280; font-weight: 600;">Faster TTFB</div>
      <div style="font-size: 0.65rem; color: #9ca3af; margin-top: 0.25rem;">1.2s &#8594; 45ms</div>
    </div>
    <div class="blog-metric-card" style="text-align: center; background: white; border-radius: 1rem; padding: 1.25rem; animation-delay: 0.2s;">
      <div style="font-size: 1.75rem; font-weight: 900; color: #059669;">63%</div>
      <div style="font-size: 0.7rem; color: #6b7280; font-weight: 600;">Faster LCP</div>
      <div style="font-size: 0.65rem; color: #9ca3af; margin-top: 0.25rem;">4.8s &#8594; 1.8s</div>
    </div>
    <div class="blog-metric-card" style="text-align: center; background: white; border-radius: 1rem; padding: 1.25rem; animation-delay: 0.3s;">
      <div style="font-size: 1.75rem; font-weight: 900; color: #059669;">87%</div>
      <div style="font-size: 0.7rem; color: #6b7280; font-weight: 600;">Smaller Page</div>
      <div style="font-size: 0.65rem; color: #9ca3af; margin-top: 0.25rem;">3.2MB &#8594; 420KB</div>
    </div>
  </div>
</div>

---

## Conclusion

Migrating to headless WordPress isn't just a technical upgrade — it's a competitive advantage. The performance gains directly translate to better SEO rankings, lower bounce rates, and higher conversions.

**The key to a successful migration:**
1. **Plan thoroughly** — audit everything before starting
2. **Preserve SEO** — redirects and metadata are non-negotiable
3. **Keep editors happy** — preview and publishing workflows must work seamlessly
4. **Monitor post-launch** — watch Search Console like a hawk for the first month

---

*Need help with your WordPress to headless migration? I've done this 5+ times at enterprise scale. [Let's talk](mailto:anup0022@gmail.com).*
    `,
  },
  {
    id: "3",
    slug: "frontend-architecture-patterns-senior-engineers",
    title: "7 Frontend Architecture Patterns Every Senior Engineer Should Master",
    excerpt:
      "Battle-tested architecture patterns I use daily as a Senior Frontend Developer leading teams at enterprise scale. From micro-frontends to feature flags, these patterns will level up your engineering.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop",
    coverImageAlt: "Frontend architecture patterns - network of connected nodes representing system design",
    date: "2026-05-10",
    modified: "2026-05-24",
    author: "Anup Singh",
    categories: ["architecture", "react", "career"],
    tags: ["Architecture", "Design Patterns", "Micro-Frontends", "State Management", "Senior Engineer", "System Design"],
    featured: true,
    content: `
## Why Architecture Matters More Than Code

After 9.5+ years of building web applications and the last 3 years leading engineering teams, I've learned one truth: **the quality of your architecture determines the ceiling of your application**.

You can write the cleanest code in the world, but if your architecture is wrong, you'll hit walls — scaling issues, developer friction, impossible refactors, and mounting technical debt.

In this article, I'll share 7 architecture patterns that I use (and teach my team) on enterprise-scale frontend applications. These aren't theoretical — they're battle-tested in production serving millions of users.

<div style="margin: 2.5rem 0; padding: 2rem; border-radius: 1.5rem; background: linear-gradient(135deg, #f8fafc, #f0f9ff, #f5f3ff); border: 1px solid #e0e7ff;">
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7c3aed;">Overview</span>
    <h4 style="font-size: 1.125rem; font-weight: 800; color: #1e293b; margin: 0.25rem 0 0 0;">The 7 Patterns</h4>
  </div>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
    <div class="blog-metric-card" style="background: white; border-radius: 0.75rem; padding: 1rem; display: flex; align-items: center; gap: 0.75rem; border: 1px solid #e2e8f0; animation-delay: 0.1s;">
      <div style="width: 36px; height: 36px; border-radius: 0.5rem; background: linear-gradient(135deg, #3b82f6, #1d4ed8); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 0.8rem; flex-shrink: 0;">1</div>
      <div style="font-size: 0.8rem; font-weight: 700; color: #1e293b;">Feature-Based Structure</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 0.75rem; padding: 1rem; display: flex; align-items: center; gap: 0.75rem; border: 1px solid #e2e8f0; animation-delay: 0.15s;">
      <div style="width: 36px; height: 36px; border-radius: 0.5rem; background: linear-gradient(135deg, #8b5cf6, #6d28d9); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 0.8rem; flex-shrink: 0;">2</div>
      <div style="font-size: 0.8rem; font-weight: 700; color: #1e293b;">API Layer Abstraction</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 0.75rem; padding: 1rem; display: flex; align-items: center; gap: 0.75rem; border: 1px solid #e2e8f0; animation-delay: 0.2s;">
      <div style="width: 36px; height: 36px; border-radius: 0.5rem; background: linear-gradient(135deg, #06b6d4, #0891b2); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 0.8rem; flex-shrink: 0;">3</div>
      <div style="font-size: 0.8rem; font-weight: 700; color: #1e293b;">State Machine UI</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 0.75rem; padding: 1rem; display: flex; align-items: center; gap: 0.75rem; border: 1px solid #e2e8f0; animation-delay: 0.25s;">
      <div style="width: 36px; height: 36px; border-radius: 0.5rem; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 0.8rem; flex-shrink: 0;">4</div>
      <div style="font-size: 0.8rem; font-weight: 700; color: #1e293b;">Compound Components</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 0.75rem; padding: 1rem; display: flex; align-items: center; gap: 0.75rem; border: 1px solid #e2e8f0; animation-delay: 0.3s;">
      <div style="width: 36px; height: 36px; border-radius: 0.5rem; background: linear-gradient(135deg, #f59e0b, #d97706); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 0.8rem; flex-shrink: 0;">5</div>
      <div style="font-size: 0.8rem; font-weight: 700; color: #1e293b;">Micro-Frontends</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 0.75rem; padding: 1rem; display: flex; align-items: center; gap: 0.75rem; border: 1px solid #e2e8f0; animation-delay: 0.35s;">
      <div style="width: 36px; height: 36px; border-radius: 0.5rem; background: linear-gradient(135deg, #ec4899, #db2777); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 0.8rem; flex-shrink: 0;">6</div>
      <div style="font-size: 0.8rem; font-weight: 700; color: #1e293b;">Feature Flags</div>
    </div>
    <div class="blog-metric-card" style="background: white; border-radius: 0.75rem; padding: 1rem; display: flex; align-items: center; gap: 0.75rem; border: 1px solid #e2e8f0; grid-column: span 2; animation-delay: 0.4s;">
      <div style="width: 36px; height: 36px; border-radius: 0.5rem; background: linear-gradient(135deg, #ef4444, #dc2626); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 0.8rem; flex-shrink: 0;">7</div>
      <div style="font-size: 0.8rem; font-weight: 700; color: #1e293b;">Error Boundary Architecture</div>
    </div>
  </div>
</div>

---

## Pattern 1: Feature-Based Folder Structure

### The Problem:
Most React projects start with a "type-based" structure — all components in one folder, all hooks in another. This falls apart at scale when you have 200+ components.

### The Solution: Feature Modules

<div style="margin: 1.5rem 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <div style="padding: 1.5rem; border-radius: 1rem; background: #fef2f2; border: 1px solid #fecaca;">
    <div style="font-weight: 800; color: #dc2626; font-size: 0.8rem; margin-bottom: 0.75rem;">&#10060; Type-Based (Breaks at Scale)</div>
    <div style="font-family: monospace; font-size: 0.7rem; color: #7f1d1d; line-height: 1.6;">
      src/<br/>
      &nbsp;&nbsp;components/ &larr; 200+ files<br/>
      &nbsp;&nbsp;hooks/<br/>
      &nbsp;&nbsp;utils/<br/>
      &nbsp;&nbsp;services/<br/>
      &nbsp;&nbsp;pages/
    </div>
  </div>
  <div style="padding: 1.5rem; border-radius: 1rem; background: #f0fdf4; border: 1px solid #bbf7d0;">
    <div style="font-weight: 800; color: #16a34a; font-size: 0.8rem; margin-bottom: 0.75rem;">&#9989; Feature-Based (Scales Well)</div>
    <div style="font-family: monospace; font-size: 0.7rem; color: #14532d; line-height: 1.6;">
      src/features/<br/>
      &nbsp;&nbsp;auth/<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;components/<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;hooks/<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;services/<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;index.ts &larr; Public API<br/>
      &nbsp;&nbsp;dashboard/<br/>
      &nbsp;&nbsp;payments/
    </div>
  </div>
</div>

**Why this works:**
- Each feature is self-contained with its own components, hooks, services, and types
- Public API via index.ts controls what's exported — prevents tight coupling
- Teams can own features independently
- Delete a feature = delete a folder

---

## Pattern 2: API Layer Abstraction

Never call APIs directly from components. Create an abstraction layer that handles:

<div style="margin: 1.5rem 0; padding: 1.5rem; border-radius: 1rem; background: linear-gradient(135deg, #eff6ff, #f5f3ff); border: 1px solid #e0e7ff;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <div class="blog-arch-box" style="padding: 0.75rem 2rem; background: #3b82f6; border-radius: 0.75rem; color: white; font-weight: 700; font-size: 0.8rem; text-align: center; animation-delay: 0.1s;">UI Components</div>
    <div class="blog-flow-arrow" style="color: #6366f1;">&#8595;</div>
    <div class="blog-arch-box" style="padding: 0.75rem 2rem; background: #8b5cf6; border-radius: 0.75rem; color: white; font-weight: 700; font-size: 0.8rem; text-align: center; animation-delay: 0.2s;">Custom Hooks (useUsers, useProducts)</div>
    <div class="blog-flow-arrow" style="color: #6366f1;">&#8595;</div>
    <div class="blog-arch-box" style="padding: 0.75rem 2rem; background: #06b6d4; border-radius: 0.75rem; color: white; font-weight: 700; font-size: 0.8rem; text-align: center; animation-delay: 0.3s;">API Service Layer (transforms, error handling)</div>
    <div class="blog-flow-arrow" style="color: #6366f1;">&#8595;</div>
    <div class="blog-arch-box" style="padding: 0.75rem 2rem; background: #10b981; border-radius: 0.75rem; color: white; font-weight: 700; font-size: 0.8rem; text-align: center; animation-delay: 0.4s;">HTTP Client (axios/fetch wrapper)</div>
  </div>
</div>

**Benefits:**
- Swap backend APIs without touching UI code
- Centralized error handling and retry logic
- Response transformation in one place
- Easy to mock for testing

---

## Pattern 3: State Machine for Complex UI

Instead of managing complex UI states with boolean flags (isLoading, isError, isSuccess), use explicit state machines:

<div style="margin: 1.5rem 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <div style="padding: 1.5rem; border-radius: 1rem; background: #fef2f2; border: 1px solid #fecaca;">
    <div style="font-weight: 800; color: #dc2626; font-size: 0.8rem; margin-bottom: 0.75rem;">&#10060; Boolean Flags (Buggy)</div>
    <div style="font-size: 0.75rem; color: #7f1d1d; line-height: 1.8;">
      isLoading: true<br/>
      isError: false<br/>
      isSuccess: false<br/>
      isEmpty: false<br/>
      <br/>
      <em>Can be loading AND error at same time?</em><br/>
      <em>8 possible combinations, most invalid!</em>
    </div>
  </div>
  <div style="padding: 1.5rem; border-radius: 1rem; background: #f0fdf4; border: 1px solid #bbf7d0;">
    <div style="font-weight: 800; color: #16a34a; font-size: 0.8rem; margin-bottom: 0.75rem;">&#9989; State Machine (Predictable)</div>
    <div style="font-size: 0.75rem; color: #14532d; line-height: 1.8;">
      state: "idle"<br/>
      state: "loading"<br/>
      state: "success"<br/>
      state: "error"<br/>
      <br/>
      <em>Only ONE state at a time.</em><br/>
      <em>Impossible to be in invalid state!</em>
    </div>
  </div>
</div>

---

## Pattern 4: Compound Components

Build components that work together with shared implicit state, like native HTML select + option:

<div style="margin: 1.5rem 0; padding: 1.5rem; border-radius: 1rem; background: linear-gradient(135deg, #fef3c7, #fffbeb); border: 1px solid #fde68a;">
  <div style="font-weight: 800; color: #92400e; margin-bottom: 1rem; text-align: center;">Compound Component Pattern</div>
  <div style="display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
    <div style="padding: 0.5rem 1rem; background: white; border-radius: 0.5rem; border: 2px solid #f59e0b; font-size: 0.75rem; font-weight: 700; color: #92400e;">Tab.Group</div>
    <div style="padding: 0.5rem 1rem; background: white; border-radius: 0.5rem; border: 1px solid #fde68a; font-size: 0.75rem; color: #92400e;">Tab.List</div>
    <div style="padding: 0.5rem 1rem; background: white; border-radius: 0.5rem; border: 1px solid #fde68a; font-size: 0.75rem; color: #92400e;">Tab.Item</div>
    <div style="padding: 0.5rem 1rem; background: white; border-radius: 0.5rem; border: 1px solid #fde68a; font-size: 0.75rem; color: #92400e;">Tab.Panel</div>
  </div>
  <div style="font-size: 0.75rem; color: #78350f; text-align: center; margin-top: 1rem;">Components share state via Context without prop drilling. Flexible API for consumers.</div>
</div>

**Use this when:**
- Components logically belong together
- You want flexible composition
- Prop drilling gets out of hand
- Examples: Tabs, Accordions, Dropdowns, Form Groups

---

## Pattern 5: Micro-Frontends

For large organizations with multiple teams, micro-frontends let each team deploy independently:

<div style="margin: 1.5rem 0; padding: 1.5rem; border-radius: 1rem; background: linear-gradient(135deg, #fef2f2, #fff1f2); border: 1px solid #fecdd3;">
  <div style="text-align: center; font-weight: 800; color: #9f1239; margin-bottom: 1rem;">When to Use Micro-Frontends</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.8rem;">
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; color: #16a34a; font-weight: 600;">&#9989; 3+ teams on same app</div>
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; color: #16a34a; font-weight: 600;">&#9989; Independent deploy cycles needed</div>
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; color: #16a34a; font-weight: 600;">&#9989; Different tech stacks per team</div>
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; color: #dc2626; font-weight: 600;">&#10060; Small team (< 5 devs)</div>
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; color: #dc2626; font-weight: 600;">&#10060; Simple CRUD application</div>
    <div style="padding: 0.75rem; background: white; border-radius: 0.5rem; color: #dc2626; font-weight: 600;">&#10060; No clear domain boundaries</div>
  </div>
</div>

**Implementation options:** Module Federation (Webpack 5), Single-SPA, or iframe-based (simplest but limited).

---

## Pattern 6: Feature Flags

Ship code to production without exposing it to users. Decouple deployments from releases:

<div style="margin: 1.5rem 0; padding: 1.5rem; border-radius: 1rem; background: linear-gradient(135deg, #f0fdf4, #ecfdf5); border: 1px solid #bbf7d0;">
  <div style="text-align: center; font-weight: 800; color: #065f46; margin-bottom: 1rem;">Feature Flag Lifecycle</div>
  <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
    <div class="blog-arch-box" style="padding: 0.5rem 1rem; background: #3b82f6; border-radius: 2rem; color: white; font-size: 0.7rem; font-weight: 700; animation-delay: 0.1s;">Deploy Hidden</div>
    <span class="blog-flow-arrow" style="color: #10b981;">&#8594;</span>
    <div class="blog-arch-box" style="padding: 0.5rem 1rem; background: #f59e0b; border-radius: 2rem; color: white; font-size: 0.7rem; font-weight: 700; animation-delay: 0.2s;">Test Internally</div>
    <span class="blog-flow-arrow" style="color: #10b981;">&#8594;</span>
    <div class="blog-arch-box" style="padding: 0.5rem 1rem; background: #8b5cf6; border-radius: 2rem; color: white; font-size: 0.7rem; font-weight: 700; animation-delay: 0.3s;">% Rollout</div>
    <span class="blog-flow-arrow" style="color: #10b981;">&#8594;</span>
    <div class="blog-arch-box" style="padding: 0.5rem 1rem; background: #10b981; border-radius: 2rem; color: white; font-size: 0.7rem; font-weight: 700; animation-delay: 0.4s;">Full Release</div>
  </div>
  <div style="font-size: 0.75rem; color: #065f46; text-align: center; margin-top: 1rem;">Gradually expose features to users. Instant rollback if issues arise.</div>
</div>

**Tools I recommend:** LaunchDarkly for enterprise, Unleash for self-hosted, or a simple JSON config for small projects.

---

## Pattern 7: Error Boundary Architecture

Don't let one broken component crash your entire app. Layer error boundaries strategically:

<div style="margin: 1.5rem 0; padding: 1.5rem; border-radius: 1rem; background: linear-gradient(135deg, #fef2f2, #fef9c3); border: 1px solid #fecaca;">
  <div style="text-align: center; font-weight: 800; color: #991b1b; margin-bottom: 1rem;">Error Boundary Layers</div>
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <div class="blog-arch-box" style="padding: 0.75rem; border: 2px solid #ef4444; border-radius: 0.75rem; text-align: center; font-size: 0.8rem; font-weight: 700; color: #991b1b; background: white; animation-delay: 0.1s;">
      App-Level Boundary (Full-page error, "Something went wrong")
    </div>
    <div class="blog-arch-box" style="padding: 0.75rem; border: 2px solid #f59e0b; border-radius: 0.75rem; text-align: center; font-size: 0.8rem; font-weight: 700; color: #92400e; background: white; margin: 0 2rem; animation-delay: 0.2s;">
      Route-Level Boundary (Page-specific fallback)
    </div>
    <div class="blog-arch-box" style="padding: 0.75rem; border: 2px solid #10b981; border-radius: 0.75rem; text-align: center; font-size: 0.8rem; font-weight: 700; color: #065f46; background: white; margin: 0 4rem; animation-delay: 0.3s;">
      Widget-Level Boundary (Component graceful degradation)
    </div>
  </div>
  <div style="font-size: 0.75rem; color: #6b7280; text-align: center; margin-top: 1rem;">A failing widget shouldn't crash the entire page. Isolate failures at the right level.</div>
</div>

---

## When to Apply Which Pattern

| Project Size | Recommended Patterns |
|---|---|
| Small (1-2 devs) | Feature folders, API layer, Error boundaries |
| Medium (3-8 devs) | All above + State machines, Compound components, Feature flags |
| Large (8+ devs) | All above + Micro-frontends |

---

## Key Takeaways

1. **Architecture is about tradeoffs** — There's no perfect architecture, only appropriate ones
2. **Start simple, evolve with scale** — Don't over-engineer day one
3. **Feature boundaries = team boundaries** — Align architecture with org structure
4. **Invest in the API layer** — It's the most underrated pattern
5. **Error isolation saves user experience** — Layer boundaries strategically
6. **Feature flags decouple deploy from release** — Ship faster with confidence

---

*Want to discuss architecture patterns for your project? Connect with me on [LinkedIn](https://www.linkedin.com/in/00anup-singh/) or [email me](mailto:anup0022@gmail.com).*
    `,
  },
];
