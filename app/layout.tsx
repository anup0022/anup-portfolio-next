import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        <meta name="theme-color" content="#06080d" />
      </head>
      <body>
        {children}
        {/* Google Analytics 4 - Replace G-XXXXXXXXXX with your actual GA4 Measurement ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
