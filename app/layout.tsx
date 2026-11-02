import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";

/**
 * Self-hosted through next/font: the @font-face rules are inlined, the two
 * preconnects and the render-blocking stylesheet round trip are gone, and the
 * emitted size-adjust fallback removes font-swap CLS. Weight lists are trimmed
 * to what the design actually uses.
 */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

/**
 * The entry gate. Synchronous and blocking by design — it must run before the
 * first paint so `html.sv-js` (which arms the reveal animations) and
 * `data-sv-entry` (which decides whether the opening curtain plays) are already
 * correct on the first frame. React does not re-render these, so there is no
 * flash and no hydration mismatch. The outer try/catch matters: an uncaught
 * throw here would block first paint, and the fallback still sets `sv-js` so a
 * partial failure leaves content visible rather than hidden.
 */
const ENTRY_GATE = `try{var d=document.documentElement;d.classList.add('sv-js');var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var s=false;try{s=!!sessionStorage.getItem('sv.intro')}catch(e){}d.dataset.svEntry=(r||s)?'skip':'play'}catch(e){document.documentElement.className+=' sv-js'}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anup-singh.in"),
  title: {
    default:
      "Anup Singh | Senior Frontend Developer & React Engineer | Bangalore, India",
    template: "%s | Anup Singh",
  },
  description:
    "Anup Singh - Senior Software Engineer & Frontend Developer in Bangalore, India with 9.5+ years of experience in React.js, Next.js, JavaScript, WordPress, and PHP. Hire a skilled frontend developer and team lead for your next project.",
  keywords: [
    "Anup Singh",
    "Senior Software Engineer",
    "Senior Frontend Developer",
    "React Developer",
    "React.js Developer Bangalore",
    "JavaScript Developer",
    "Next.js Developer",
    "WordPress Developer",
    "Full Stack Developer",
    "Team Lead",
    "Frontend Engineer India",
    "hire frontend developer",
    "hire react developer Bangalore",
  ],
  authors: [{ name: "Anup Singh", url: "https://www.anup-singh.in" }],
  creator: "Anup Singh",
  openGraph: {
    type: "website",
    url: "https://www.anup-singh.in/",
    title: "Anup Singh | Senior Frontend Developer & React Engineer",
    description:
      "Senior Software Engineer with 9.5+ years of experience building high-performance web applications using React, Next.js, JavaScript, WordPress, and PHP. Based in Bangalore, India.",
    images: [
      {
        url: "/photo.jpg",
        width: 600,
        height: 600,
        alt: "Anup Singh - Senior Frontend Developer and React Engineer",
      },
    ],
    siteName: "Anup Singh - Software Developer Portfolio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anup Singh | Senior Frontend Developer & React Engineer",
    description:
      "Senior Software Engineer with 9.5+ years building high-performance web apps with React, Next.js, JavaScript, WordPress. Based in Bangalore, India.",
    images: ["/photo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.anup-singh.in/",
  },
  verification: {
    google: "google41a39252db2a8f7c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ENTRY_GATE }} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        <meta name="theme-color" content="#06080d" />
      </head>
      <body>
        {children}
        {/* Analytics intentionally omitted: the previous tag shipped the literal
            placeholder id G-XXXXXXXXXX, costing a DNS lookup, a connection and a
            script parse on every route for no data. Re-add a real GA4 (or other)
            measurement id here when one exists. */}
      </body>
    </html>
  );
}
