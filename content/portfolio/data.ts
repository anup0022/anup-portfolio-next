/**
 * The single data module. Every fact on the page lives here exactly once.
 * No React, no next/*, no fs, no 'use client' — consts and derived
 * expressions only.
 *
 * Strings marked "indexed copy" are reproduced verbatim from the pre-redesign
 * page. They currently rank; do not reword, reorder or drop them.
 */
import type {
  Credential,
  ExperienceRow,
  Highlight,
  NumberPick,
  Original,
  Palette,
  Profile,
  SkillGroup,
  Volume,
} from "./types";

/* -------------------------------------------------------------------------
   Palettes — every `to` is pinned to the page background so a poster's
   bottom edge dissolves into the page instead of ending on a seam.
   ------------------------------------------------------------------------- */
export const palettes = {
  cppib: { from: "#03141f", via: "#0a4a6b", to: "#06080d", accent: "#00d4ff" },
  fogodechao: { from: "#1e0a05", via: "#7a2a10", to: "#06080d", accent: "#ff8a4c" },
  enercare: { from: "#04150f", via: "#0d5a42", to: "#06080d", accent: "#3ddc97" },
  milkpep: { from: "#100a24", via: "#3b2a86", to: "#06080d", accent: "#a855f7" },
  current: { from: "#1a1403", via: "#6b5208", to: "#06080d", accent: "#f0c040" },
  cool: { from: "#04101a", via: "#0a3650", to: "#06080d", accent: "#00d4ff" },
} satisfies Record<string, Palette>;

/* ------------------------------------------------------------------------- */
export const profile: Profile = {
  fullName: "Anup Singh",
  firstName: "Anup",
  lastName: "Singh",
  role: "Senior Software Engineer",
  // These five strings previously lived only in public/script.js and were
  // therefore absent from the rendered document entirely.
  roleRotation: [
    "Senior Software Engineer",
    "React & JavaScript Engineer",
    "Next.js & Headless WordPress",
    "Team Lead & Mentor",
    "Frontend Architect",
  ],
  studio: "GALE",
  studioUrl: "https://www.gale.agency",
  location: "Bangalore, India",
  region: "Karnataka",
  country: "IN",
  email: "anup0022@gmail.com",
  phone: "+91-9008924503",
  // indexed copy — the current hero-desc, verbatim
  intro:
    "Senior Software Engineer and Frontend Developer with 9.5+ years of experience delivering high-performance web solutions using React, Next.js, and JavaScript. I transform business needs into robust technical solutions and lead engineering teams to deliver at scale.",
  // indexed copy — the three current about paragraphs, verbatim
  summary: [
    "I'm a Senior Software Engineer and Frontend Developer based in Bangalore, India, with over 9.5 years of hands-on experience delivering high-performance web solutions using React.js, Next.js, WordPress, PHP, and MySQL.",
    "I have a proven track record in leading teams, architecting scalable systems, and driving full-cycle product development. As a React developer and JavaScript expert, I'm passionate about transforming complex business needs into robust, elegant technical solutions.",
    "Currently at GALE, I lead a team of developers where I oversee sprint planning, code reviews, and delivery timelines. I love mentoring engineers and building strong engineering cultures that deliver excellence.",
  ],
  experienceYears: "9.5+",
  careerStart: "2017",
  languages: ["English", "Hindi"],
  interests: ["Tech", "Cooking", "Travel"],
  links: {
    linkedin: "https://www.linkedin.com/in/00anup-singh/",
    github: "https://github.com/anup0022",
    blog: "/blog",
  },
  portrait: {
    src: "/photo.jpg",
    alt: "Anup Singh - Senior Frontend Developer and React Engineer based in Bangalore, India",
    width: 600,
    height: 600,
  },
};

/* -------------------------------------------------------------------------
   Originals — the four named client brands. Each `build[]` splits the
   existing project-desc paragraph into its component claims; nothing new
   is asserted.
   ------------------------------------------------------------------------- */
export const originals: Original[] = [
  {
    id: "cppib",
    title: "Canada Pension Plan Investment Board",
    brand: "CPPIB",
    domain: "cppib.com",
    url: "https://cppib.com",
    years: "2022 - present",
    studio: "GALE",
    credit: "Senior Associate Developer, GALE",
    genre: "Finance · Enterprise · Accessibility",
    logline:
      "The public web presence of one of the world's largest pension fund investment managers.",
    build: [
      "Built and maintained the web presence for one of the world's largest pension fund investment managers",
      "Ensured high performance and accessibility across all platforms",
    ],
    metrics: [
      { value: "20-30%", label: "faster page loads" },
      { value: "95%", label: "cross-browser reliability" },
    ],
    stack: ["React", "WordPress", "PHP", "MySQL"],
    palette: palettes.cppib,
    motif: "finance",
  },
  {
    id: "fogodechao",
    title: "Fogo de Chao",
    brand: "Fogo de Chao",
    domain: "fogodechao.com",
    url: "https://fogodechao.com",
    years: "2022 - present",
    studio: "GALE",
    credit: "Senior Associate Developer, GALE",
    genre: "Hospitality · Commerce · Locations",
    logline:
      "The digital experience for the internationally acclaimed Brazilian steakhouse.",
    build: [
      "Delivered the digital experience for the internationally acclaimed Brazilian steakhouse",
      "Featuring reservation systems, menu displays, and location finders",
    ],
    metrics: [
      { value: "3", label: "booking surfaces" },
      { value: "15%", label: "better time to interactive" },
    ],
    stack: ["React", "JavaScript", "WordPress", "Shopify"],
    palette: palettes.fogodechao,
    motif: "hospitality",
  },
  {
    id: "enercare",
    title: "Enercare",
    brand: "Enercare",
    domain: "enercare.ca",
    url: "https://enercare.ca",
    years: "2022 - present",
    studio: "GALE",
    credit: "Senior Associate Developer, GALE",
    genre: "Utilities · Lead Gen · Service",
    logline:
      "The web platform for Canada's leading home and commercial services company.",
    build: [
      "Built the web platform for Canada's leading home and commercial services company",
      "Powering customer acquisition and service management",
    ],
    metrics: [
      { value: "20-30%", label: "faster page loads" },
      { value: "95%", label: "cross-browser reliability" },
    ],
    stack: ["React", "PHP", "MySQL", "WordPress"],
    palette: palettes.enercare,
    motif: "utility",
  },
  {
    id: "milkpep",
    title: "MilkPEP",
    brand: "MilkPEP",
    domain: "milkpep.org",
    url: "https://milkpep.org",
    years: "2022 - present",
    studio: "GALE",
    credit: "Senior Associate Developer, GALE",
    genre: "Campaign · Content · National Reach",
    logline:
      "The digital platform for the Milk Processor Education Program, reaching a nationwide audience.",
    build: [
      "Developed the digital platform for the Milk Processor Education Program",
      "Delivering engaging content and promotional campaigns to a nationwide audience",
    ],
    metrics: [
      { value: "National", label: "campaign reach" },
      { value: "40%", label: "faster headless builds" },
    ],
    stack: ["Next.js", "Headless WordPress", "GraphQL", "React"],
    palette: palettes.milkpep,
    motif: "campaign",
  },
];

/* -------------------------------------------------------------------------
   Volumes — four tenures, oldest first. Every resume bullet maps to exactly
   one Episode, so nothing is invented. The GALE promotion is the volume
   break: same studio, two volumes.
   ------------------------------------------------------------------------- */
export const volumes: Volume[] = [
  {
    number: 1,
    label: "V01",
    company: "Radical Networks",
    role: "Junior Software Developer",
    place: "Bengaluru, India",
    period: "Jan 2017 - Oct 2018",
    synopsis: "Learning to write components other people have to maintain.",
    palette: palettes.cool,
    episodes: [
      {
        code: "V01·E01",
        title: "Modular by Default",
        body: "Developed modular JavaScript and CSS components for scalable, maintainable web apps",
        runtime: "Jan 2017 - Oct 2018",
        tags: ["JavaScript", "CSS", "HTML"],
      },
      {
        code: "V01·E02",
        title: "Shipping With a Team",
        body: "Contributed to front-end builds and cross-team collaboration for timely project delivery",
        runtime: "22 months",
        tags: ["Collaboration", "Delivery"],
      },
    ],
  },
  {
    number: 2,
    label: "V02",
    company: "Exito Media Concepts",
    role: "Frontend Developer",
    place: "Bengaluru, India",
    period: "Oct 2018 - Mar 2019",
    synopsis: "Six months of landing pages where the number at the end was the point.",
    palette: palettes.cool,
    episodes: [
      {
        code: "V02·E01",
        title: "The A/B Test",
        body: "Built WordPress-based microsites and landing pages with A/B testing, boosting conversions by 20%",
        runtime: "6 months",
        tags: ["WordPress", "A/B testing", "CRO"],
      },
      {
        code: "V02·E02",
        title: "Twenty-Five Percent",
        body: "Optimized SQL queries and front-end assets (CSS/JS), improving load speeds by 25%",
        runtime: "+25% load speed",
        tags: ["MySQL", "CSS", "JavaScript"],
      },
    ],
  },
  {
    number: 3,
    label: "V03",
    company: "GALE",
    role: "Front End Associate",
    place: "Bengaluru, India",
    period: "Apr 2019 - Aug 2022",
    synopsis: "Three years turning one-off builds into a component library.",
    palette: palettes.cool,
    episodes: [
      {
        code: "V03·E01",
        title: "Themes and Plugins",
        body: "Maintained and enhanced custom WordPress themes and plugins, improving admin efficiency by 40%",
        runtime: "+40% admin efficiency",
        tags: ["WordPress", "PHP"],
      },
      {
        code: "V03·E02",
        title: "The Component Library",
        body: "Built reusable UI components using jQuery, Sass, Less, and Bootstrap, cutting bug-fix time by 50%",
        runtime: "-50% bug-fix time",
        tags: ["jQuery", "Sass", "Bootstrap"],
      },
      {
        code: "V03·E03",
        title: "Markup That Ranks",
        body: "Optimized markup/CSS structure to support SEO efforts, resulting in a 10-15% rise in organic traffic",
        runtime: "+10-15% organic traffic",
        tags: ["SEO", "HTML", "CSS"],
      },
    ],
  },
  {
    number: 4,
    label: "V04",
    company: "GALE",
    role: "Senior Associate Developer",
    place: "Bengaluru, India",
    period: "Aug 2022 - Present",
    synopsis: "Four named brands, a team to lead, and the numbers to show for it.",
    palette: palettes.current,
    episodes: [
      {
        code: "V04·E01",
        title: "Delivery Lead",
        body: "Led and delivered user-centric, responsive web applications using React, JavaScript (ES6+), PHP/MySQL, WordPress, and Shopify",
        runtime: "Aug 2022 - Present",
        tags: ["React", "JavaScript", "PHP", "WordPress", "Shopify"],
        originals: ["cppib", "fogodechao", "enercare", "milkpep"],
      },
      {
        code: "V04·E02",
        title: "Twenty to Thirty",
        body: "Improved page load times by 20-30% through asset/code optimization, boosting user retention",
        runtime: "+20-30% faster",
        tags: ["Performance", "Core Web Vitals"],
      },
      {
        code: "V04·E03",
        title: "Ninety-Five Percent",
        body: "Resolved cross-browser issues, increasing UX reliability by 95%",
        runtime: "95% reliability",
        tags: ["Cross-browser", "QA"],
      },
      {
        code: "V04·E04",
        title: "Less JavaScript",
        body: "Enhanced UI responsiveness and reduced JS bundle size, improving TTI by 15%",
        runtime: "+15% TTI",
        tags: ["Bundle size", "TTI"],
      },
      {
        code: "V04·E05",
        title: "The Mentor",
        body: "Mentored and led a team of developers, managing code reviews, task delegation, and performance feedback",
        runtime: "5+ engineers",
        tags: ["Mentoring", "Code review", "Agile"],
      },
    ],
  },
];

/* -------------------------------------------------------------------------
   The machine-readable resume mirror. Deliberately duplicated: it feeds
   hasOccupation in the JSON-LD, so the Volumes retelling above can be
   edited freely without corrupting machine-readable facts.
   ------------------------------------------------------------------------- */
export const experience: ExperienceRow[] = [
  {
    company: "GALE",
    role: "Senior Associate Developer",
    place: "Bengaluru, India",
    period: "Aug 2022 - Present",
    points: volumes[3].episodes.map((e) => e.body),
  },
  {
    company: "GALE",
    role: "Front End Associate",
    place: "Bengaluru, India",
    period: "Apr 2019 - Aug 2022",
    points: volumes[2].episodes.map((e) => e.body),
  },
  {
    company: "Exito Media Concepts",
    role: "Frontend Developer",
    place: "Bengaluru, India",
    period: "Oct 2018 - Mar 2019",
    points: volumes[1].episodes.map((e) => e.body),
  },
  {
    company: "Radical Networks",
    role: "Junior Software Developer",
    place: "Bengaluru, India",
    period: "Jan 2017 - Oct 2018",
    points: volumes[0].episodes.map((e) => e.body),
  },
];

/* -------------------------------------------------------------------------
   The Numbers — exactly eight, ranked. Eight rather than ten because every
   entry is a real verifiable metric and there is no two-digit numeral to
   special-case.
   ------------------------------------------------------------------------- */
export const numbers: NumberPick[] = [
  { rank: 1, value: "9.5", title: "Years shipping production web", detail: "Since 2017, across four studios.", palette: palettes.cool },
  { rank: 2, value: "50+", title: "Client projects delivered", detail: "From microsites to enterprise platforms.", palette: palettes.cppib },
  { rank: 3, value: "95%", title: "Cross-browser UX reliability", detail: "Measured after a sustained cross-browser fix programme.", palette: palettes.enercare },
  { rank: 4, value: "30%", title: "Faster page loads", detail: "20-30% through asset and code optimization.", palette: palettes.cool },
  { rank: 5, value: "70%", title: "Manual data entry removed", detail: "Custom WordPress plugins including migration tooling.", palette: palettes.milkpep },
  { rank: 6, value: "40%", title: "Admin efficiency gained", detail: "Custom themes and plugins rebuilt around the editors.", palette: palettes.current },
  { rank: 7, value: "5+", title: "Engineers mentored", detail: "Code reviews, delegation and performance feedback.", palette: palettes.fogodechao },
  { rank: 8, value: "4", title: "Named brands at GALE", detail: "CPPIB, Fogo de Chao, Enercare and MilkPEP.", palette: palettes.cppib },
];

/* -------------------------------------------------------------------------
   The Stack — the six existing groups, skill strings copied verbatim.
   These exact strings are indexed.
   ------------------------------------------------------------------------- */
export const stack: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "PHP", mono: "Ph" },
      { name: "JavaScript (ES6+)", mono: "Js" },
      { name: "SQL", mono: "Sq" },
      { name: "HTML5", mono: "H5" },
      { name: "CSS3", mono: "C3" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React.js", mono: "Re" },
      { name: "Next.js", mono: "Nx" },
      { name: "Redux", mono: "Rd" },
      { name: "Tailwind CSS", mono: "Tw" },
      { name: "jQuery", mono: "Jq" },
      { name: "AJAX", mono: "Ax" },
    ],
  },
  {
    id: "backend",
    title: "Backend & CMS",
    skills: [
      { name: "WordPress", mono: "Wp" },
      { name: "WooCommerce", mono: "Wc" },
      { name: "REST APIs", mono: "Rs" },
      { name: "GraphQL", mono: "Gq" },
      { name: "Node.js", mono: "Nd" },
    ],
  },
  {
    id: "database",
    title: "Database",
    skills: [
      { name: "MySQL", mono: "My" },
      { name: "MongoDB", mono: "Mg" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    skills: [
      { name: "Git", mono: "Gt" },
      { name: "GitHub Actions", mono: "Ga" },
      { name: "Docker", mono: "Dk" },
      { name: "AWS (S3, Lambda)", mono: "Aw" },
      { name: "Apache", mono: "Ap" },
      { name: "CI/CD", mono: "Ci" },
    ],
  },
  {
    id: "other",
    title: "Other",
    skills: [
      { name: "ACF", mono: "Ac" },
      { name: "SEO Optimization", mono: "Se" },
      { name: "Agile/Scrum", mono: "Ag" },
      { name: "Code Reviews", mono: "Cr" },
      { name: "Mentoring", mono: "Mn" },
    ],
  },
];

/**
 * Evidence — maps a skill to where it actually shows up elsewhere in this
 * data, turning an unverifiable tag cloud into a claim with receipts.
 * Keyed by the exact `name` above.
 */
export const evidence: Record<string, string[]> = {
  "React.js": ["CPPIB", "Fogo de Chao", "V04·E01 - delivery lead"],
  "Next.js": ["MilkPEP - headless", "Headless WordPress - 40% faster"],
  Redux: ["V04·E01 - application state"],
  "Tailwind CSS": ["This site", "Component libraries at GALE"],
  jQuery: ["V03·E02 - -50% bug-fix time"],
  AJAX: ["V03·E02 - component library"],
  "JavaScript (ES6+)": ["All four Originals", "V04·E04 - +15% TTI"],
  PHP: ["CPPIB", "Legacy Migration - 50%"],
  SQL: ["V02·E02 - +25% load speed"],
  HTML5: ["V03·E03 - +10-15% organic traffic"],
  CSS3: ["V01·E01 - modular components"],
  WordPress: ["All four Originals", "Plugin Architecture - 70%", "Legacy Migration - 50%"],
  WooCommerce: ["Commerce builds at GALE"],
  "REST APIs": ["Headless integrations"],
  GraphQL: ["MilkPEP - headless content"],
  "Node.js": ["Build tooling and headless APIs"],
  MySQL: ["CPPIB", "V02·E02 - query optimization"],
  MongoDB: ["Document-store services"],
  Git: ["Every project listed here"],
  "GitHub Actions": ["CI for headless builds"],
  Docker: ["Local parity for PHP/MySQL stacks"],
  "AWS (S3, Lambda)": ["Asset delivery and serverless endpoints"],
  Apache: ["Legacy PHP hosting"],
  "CI/CD": ["Deployment pipelines at GALE"],
  ACF: ["Editor tooling - +40% admin efficiency"],
  "SEO Optimization": ["V03·E03 - +10-15% organic traffic", "Headless WordPress - SEO rankings"],
  "Agile/Scrum": ["V04·E05 - sprint planning"],
  "Code Reviews": ["V04·E05 - 5+ engineers"],
  Mentoring: ["V04·E05 - 5+ engineers"],
};

/* ------------------------------------------------------------------------- */
export const highlights: Highlight[] = [
  {
    id: "plugin-architecture",
    title: "Plugin Architecture",
    laurel: "70% less manual entry",
    body: "Architected custom WordPress plugins including complex migration tools, reducing manual data entry effort by 70%",
    metric: { value: "70%", label: "manual effort removed" },
  },
  {
    id: "headless-wordpress",
    title: "Headless WordPress",
    laurel: "40% faster",
    body: "Delivered React/Next.js-based headless WordPress sites, improving site speed by 40% and SEO rankings",
    metric: { value: "40%", label: "faster sites" },
  },
  {
    id: "legacy-migration",
    title: "Legacy Migration",
    laurel: "50% lower maintenance",
    body: "Migrated multiple legacy PHP systems to modern WordPress/React architecture, reducing maintenance costs by 50%",
    metric: { value: "50%", label: "lower maintenance cost" },
  },
];

export const credentials: Credential[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "M S Engineering College",
    place: "Bengaluru, India",
    year: "Graduated 2016",
    badge: "First Class",
  },
  {
    degree: "Bachelor's Degree - Information Technology",
    school: "GIIT Professional College",
    place: "Jamshedpur, India",
    year: "Graduated 2013",
    badge: "First Class",
  },
];

/* -------------------------------------------------------------------------
   Derived counts — expressions, so they can never drift from the data.
   ------------------------------------------------------------------------- */
export const episodeCount = volumes.reduce((n, v) => n + v.episodes.length, 0);
export const volumeMeta = `${volumes.length} VOLUMES · ${episodeCount} EPISODES`;
export const originalsMeta = `${originals.length} ORIGINALS · PRODUCED AT GALE`;
