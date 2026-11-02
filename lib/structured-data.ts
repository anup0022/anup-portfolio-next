/**
 * Typed JSON-LD builders. The three graphs cross-reference each other by
 * @id; break those and three strong entities become three weak orphans.
 * Output is byte-equivalent to the pre-redesign page.
 */
export const SITE = "https://www.anup-singh.in";
export const PERSON_ID = `${SITE}/#person`;

/**
 * Frozen at nineteen entries. Deliberately NOT derived from `stack` — a
 * future edit to the skill list would silently shrink a ranking signal.
 */
export const knowsAbout = [
  "React.js",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "WordPress",
  "PHP",
  "MySQL",
  "MongoDB",
  "Node.js",
  "GraphQL",
  "Redux",
  "Tailwind CSS",
  "Docker",
  "AWS",
  "REST APIs",
  "Frontend Development",
  "Full Stack Development",
  "Team Leadership",
  "Agile/Scrum",
] as const;

if (knowsAbout.length !== 19) {
  throw new Error(
    `knowsAbout must stay at 19 entries (got ${knowsAbout.length}) — it is a ranking signal.`
  );
}

/** Relaunch date. Must match app/sitemap.ts lastModified for the homepage. */
export const RELAUNCH_DATE = "2026-11-02";

export const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Anup Singh",
  givenName: "Anup",
  familyName: "Singh",
  url: SITE,
  image: {
    "@type": "ImageObject",
    url: `${SITE}/photo.jpg`,
    width: 600,
    height: 600,
  },
  jobTitle: "Senior Software Engineer",
  description:
    "Senior Software Engineer & Frontend Developer with 9.5+ years of experience in React, Next.js, JavaScript, WordPress, and PHP. Based in Bangalore, India.",
  worksFor: {
    "@type": "Organization",
    name: "GALE",
    url: "https://www.gale.agency",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  email: "anup0022@gmail.com",
  telephone: "+919008924503",
  nationality: { "@type": "Country", name: "India" },
  sameAs: [
    "https://www.linkedin.com/in/00anup-singh/",
    "https://github.com/anup0022",
  ],
  knowsAbout: [...knowsAbout],
  hasOccupation: {
    "@type": "Occupation",
    name: "Senior Software Engineer",
    occupationLocation: { "@type": "City", name: "Bangalore" },
    skills:
      "React.js, Next.js, JavaScript, WordPress, PHP, MySQL, Node.js, Team Leadership",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "M S Engineering College",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressCountry: "IN",
      },
    },
    {
      "@type": "CollegeOrUniversity",
      name: "GIIT Professional College",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jamshedpur",
        addressCountry: "IN",
      },
    },
  ],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Anup Singh - Senior Software Developer Portfolio",
  description:
    "Portfolio website of Anup Singh, a Senior Software Engineer and Frontend Developer based in Bangalore, India.",
  publisher: { "@id": PERSON_ID },
  inLanguage: "en-IN",
};

export const profilePageLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE}/#profilepage`,
  url: SITE,
  name: "Anup Singh | Senior Frontend Developer & React Engineer",
  description:
    "Professional portfolio of Anup Singh - Senior Software Engineer with expertise in React, JavaScript, WordPress and PHP.",
  mainEntity: { "@id": PERSON_ID },
  dateCreated: "2024-01-01",
  dateModified: RELAUNCH_DATE,
};

/** page.tsx maps over this so it cannot omit one. */
export const jsonLdBlocks = [personLd, websiteLd, profilePageLd];
