/**
 * Central portfolio data — Anup Singh.
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 * Nothing here should be added unless it appears on the resume.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Anup Singh',
  displayName: 'Anup Singh',
  firstName: 'ANUP',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'AN A.SINGH ORIGINAL',
  role: 'Senior Software Engineer',
  /** Short genre tag shown as a rating-style badge in the hero. */
  genreBadge: 'WEB',
  tagline: ['Senior Software Engineer', 'React & Next.js', 'Team Lead'],
  intro:
    'A Senior Software Engineer and Frontend Developer with 9.5+ years of experience delivering high-performance web solutions using React, Next.js, and JavaScript. I transform business needs into robust technical solutions and lead engineering teams to deliver at scale.',
  location: 'Bangalore, India',
  /** Where the Originals were produced. */
  studio: 'GALE',
  email: 'anup0022@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/00anup-singh/',
    github: 'https://github.com/anup0022',
  },
  /** No PDF on file — the resume renders inline and the download button hides itself. */
  resumePdf: '',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Anup Singh',
  },
  interests: ['Tech', 'Cooking', 'Travel'],
};

export const education = [
  {
    school: 'M S Engineering College',
    place: 'Bengaluru',
    degree: 'Master of Computer Applications (MCA)',
    period: 'Graduated 2016',
    score: 'First Class',
  },
  {
    school: 'GIIT Professional College',
    place: 'Jamshedpur',
    degree: "Bachelor's Degree — Information Technology",
    period: 'Graduated 2013',
    score: 'First Class',
  },
];

export const experience = [
  {
    company: 'GALE',
    role: 'Senior Associate Developer',
    place: 'Bengaluru, India',
    period: 'Aug 2022 – Present',
    points: [
      'Led and delivered user-centric, responsive web applications using React, JavaScript (ES6+), PHP/MySQL, WordPress, and Shopify.',
      'Improved page load times by 20-30% through asset/code optimization, boosting user retention.',
      'Resolved cross-browser issues, increasing UX reliability by 95%.',
      'Enhanced UI responsiveness and reduced JS bundle size, improving TTI by 15%.',
      'Mentored and led a team of developers, managing code reviews, task delegation, and performance feedback.',
    ],
  },
  {
    company: 'GALE',
    role: 'Front End Associate',
    place: 'Bengaluru, India',
    period: 'Apr 2019 – Aug 2022',
    points: [
      'Maintained and enhanced custom WordPress themes and plugins, improving admin efficiency by 40%.',
      'Built reusable UI components using jQuery, Sass, Less, and Bootstrap, cutting bug-fix time by 50%.',
      'Optimized markup/CSS structure to support SEO efforts, resulting in a 10-15% rise in organic traffic.',
    ],
  },
  {
    company: 'Exito Media Concepts',
    role: 'Frontend Developer',
    place: 'Bengaluru, India',
    period: 'Oct 2018 – Mar 2019',
    points: [
      'Built WordPress-based microsites and landing pages with A/B testing, boosting conversions by 20%.',
      'Optimized SQL queries and front-end assets (CSS/JS), improving load speeds by 25%.',
    ],
  },
  {
    company: 'Radical Networks',
    role: 'Junior Software Developer',
    place: 'Bengaluru, India',
    period: 'Jan 2017 – Oct 2018',
    points: [
      'Developed modular JavaScript and CSS components for scalable, maintainable web apps.',
      'Contributed to front-end builds and cross-team collaboration for timely project delivery.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Omit when the repository isn't public — the GitHub button is hidden instead of linking to a 404. */
  github?: string;
  /** Live site, for client work where there is no public repo. */
  site?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'cppib',
    title: 'CPPIB',
    year: '2022 – present',
    genre: 'Finance • Enterprise • Accessibility',
    logline: "The public web presence of one of the world's largest pension fund investment managers.",
    stack: ['React', 'WordPress', 'PHP', 'MySQL'],
    build: [
      "Built and maintained the web presence for one of the world's largest pension fund investment managers, ensuring high performance and accessibility across all platforms.",
      'Delivered at GALE as Senior Associate Developer, with page load times improved by 20-30% through asset and code optimization.',
    ],
    features: [
      'Enterprise content platform',
      'Accessibility across all platforms',
      'Performance-optimized asset delivery',
      'Cross-browser reliability programme',
    ],
    metrics: [
      { value: '20-30%', label: 'faster page loads' },
      { value: '95%', label: 'cross-browser reliability' },
      { value: '15%', label: 'better time to interactive' },
    ],
    site: 'https://cppib.com',
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'shield',
  },
  {
    id: 'fogodechao',
    title: 'Fogo de Chao',
    year: '2022 – present',
    genre: 'Hospitality • Commerce • Locations',
    logline: 'The digital experience for the internationally acclaimed Brazilian steakhouse.',
    stack: ['React', 'JavaScript', 'WordPress', 'Shopify'],
    build: [
      'Delivered the digital experience for the internationally acclaimed Brazilian steakhouse, featuring reservation systems, menu displays, and location finders.',
      'Built as responsive, user-centric web applications using React and JavaScript (ES6+).',
    ],
    features: [
      'Reservation systems',
      'Menu displays',
      'Location finders',
      'Responsive, user-centric UI',
    ],
    metrics: [
      { value: '3', label: 'booking surfaces' },
      { value: '15%', label: 'better time to interactive' },
    ],
    site: 'https://fogodechao.com',
    palette: { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' },
    motif: 'flow',
  },
  {
    id: 'enercare',
    title: 'Enercare',
    year: '2022 – present',
    genre: 'Utilities • Lead Gen • Service',
    logline: "The web platform for Canada's leading home and commercial services company.",
    stack: ['React', 'PHP', 'MySQL', 'WordPress'],
    build: [
      "Built the web platform for Canada's leading home and commercial services company, powering customer acquisition and service management.",
      'Resolved cross-browser issues across the platform, increasing UX reliability by 95%.',
    ],
    features: [
      'Customer acquisition journeys',
      'Service management',
      'Cross-browser hardening',
      'Lead generation flows',
    ],
    metrics: [
      { value: '95%', label: 'cross-browser reliability' },
      { value: '20-30%', label: 'faster page loads' },
    ],
    site: 'https://enercare.ca',
    palette: { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' },
    motif: 'tenants',
  },
  {
    id: 'milkpep',
    title: 'MilkPEP',
    year: '2022 – present',
    genre: 'Campaign • Content • National Reach',
    logline: 'The digital platform for the Milk Processor Education Program, reaching a nationwide audience.',
    stack: ['Next.js', 'Headless WordPress', 'GraphQL', 'React'],
    build: [
      'Developed the digital platform for the Milk Processor Education Program, delivering engaging content and promotional campaigns to a nationwide audience.',
      'Delivered as a React/Next.js headless WordPress build, improving site speed by 40% and SEO rankings.',
    ],
    features: [
      'Headless WordPress content model',
      'National promotional campaigns',
      'GraphQL content delivery',
      'SEO-optimized markup',
    ],
    metrics: [
      { value: '40%', label: 'faster headless builds' },
      { value: 'National', label: 'campaign reach' },
    ],
    site: 'https://milkpep.org',
    palette: { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' },
    motif: 'flow',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'plugin-architecture',
    title: 'Plugin Architecture',
    org: 'GALE',
    detail: 'Architected custom WordPress plugins including complex migration tools, reducing manual data entry effort by 70%.',
    laurel: '70% Less Manual Entry',
  },
  {
    id: 'headless-wordpress',
    title: 'Headless WordPress',
    org: 'GALE',
    detail: 'Delivered React/Next.js-based headless WordPress sites, improving site speed by 40% and SEO rankings.',
    laurel: '40% Faster',
  },
  {
    id: 'legacy-migration',
    title: 'Legacy Migration',
    org: 'GALE',
    detail: 'Migrated multiple legacy PHP systems to modern WordPress/React architecture, reducing maintenance costs by 50%.',
    laurel: '50% Lower Maintenance',
  },
  {
    id: 'team-leadership',
    title: 'Team Leadership',
    org: 'GALE',
    detail: 'Mentored and led a team of developers, managing code reviews, task delegation, and performance feedback.',
    laurel: '5+ Engineers Mentored',
  },
  {
    id: 'performance',
    title: 'Performance Programme',
    org: 'Across four client brands',
    detail: 'Improved page load times by 20-30% through asset and code optimization, and improved TTI by 15% by reducing JS bundle size.',
    laurel: '20-30% Faster',
  },
];

export type Certification = { issuer: string; name: string; link: string };

/** No certifications on the resume — every section that counts these handles an empty list. */
export const certifications: Certification[] = [];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'JavaScript and PHP are the primaries',
    skills: [
      { name: 'JavaScript (ES6+)', mono: 'Js', note: 'Primary' },
      { name: 'PHP', mono: 'Ph', note: 'Primary' },
      { name: 'SQL', mono: 'Sq' },
      { name: 'HTML5', mono: 'H5' },
      { name: 'CSS3', mono: 'C3' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Interfaces & the web platform',
    skills: [
      { name: 'React.js', mono: 'Re' },
      { name: 'Next.js', mono: 'Nx' },
      { name: 'Redux', mono: 'Rd' },
      { name: 'Tailwind CSS', mono: 'Tw' },
      { name: 'jQuery', mono: 'Jq' },
      { name: 'AJAX', mono: 'Ax' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & CMS',
    subtitle: 'Server-side logic & content',
    skills: [
      { name: 'WordPress', mono: 'Wp' },
      { name: 'WooCommerce', mono: 'Wc' },
      { name: 'REST APIs', mono: 'Rs' },
      { name: 'GraphQL', mono: 'Gq' },
      { name: 'Node.js', mono: 'Nd' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    subtitle: 'Queries & data modelling',
    skills: [
      { name: 'MySQL', mono: 'My' },
      { name: 'MongoDB', mono: 'Mg' },
    ],
  },
  {
    id: 'infra',
    title: 'Cloud & DevOps',
    subtitle: 'Shipping & pipelines',
    skills: [
      { name: 'Git', mono: 'Gt' },
      { name: 'GitHub Actions', mono: 'Ga' },
      { name: 'Docker', mono: 'Dk' },
      { name: 'AWS (S3, Lambda)', mono: 'Aw' },
      { name: 'Apache', mono: 'Ap' },
      { name: 'CI/CD', mono: 'Ci' },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    subtitle: 'How the work gets delivered',
    skills: [
      { name: 'ACF', mono: 'Ac' },
      { name: 'SEO Optimization', mono: 'Se' },
      { name: 'Agile/Scrum', mono: 'Ag' },
      { name: 'Code Reviews', mono: 'Cr' },
      { name: 'Mentoring', mono: 'Mn' },
    ],
  },
];

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears in the projects, experience or achievements on the resume.
 */
export const skillEvidence: Record<string, string[]> = {
  'JavaScript (ES6+)': ['All four Originals', 'Reduced bundle size — 15% better TTI'],
  PHP: ['CPPIB', 'Enercare', 'Legacy Migration — 50%'],
  SQL: ['Exito Media — 25% faster load speeds'],
  HTML5: ['Markup structured for SEO — +10-15% organic traffic'],
  CSS3: ['Radical Networks — modular CSS components'],
  'React.js': ['CPPIB', 'Fogo de Chao', 'Enercare', 'MilkPEP'],
  'Next.js': ['MilkPEP — headless', 'Headless WordPress — 40% faster'],
  Redux: ['Application state at GALE'],
  'Tailwind CSS': ['Component libraries at GALE'],
  jQuery: ['GALE — component library, -50% bug-fix time'],
  AJAX: ['GALE — component library'],
  WordPress: ['All four Originals', 'Plugin Architecture — 70%', 'Legacy Migration — 50%'],
  WooCommerce: ['Commerce builds at GALE'],
  'REST APIs': ['Headless integrations'],
  GraphQL: ['MilkPEP — headless content'],
  'Node.js': ['Build tooling & headless APIs'],
  MySQL: ['CPPIB', 'Exito Media — query optimization'],
  MongoDB: ['Document-store services'],
  Git: ['Every project listed here'],
  'GitHub Actions': ['CI for headless builds'],
  Docker: ['Local parity for PHP/MySQL stacks'],
  'AWS (S3, Lambda)': ['Asset delivery & serverless endpoints'],
  Apache: ['Legacy PHP hosting'],
  'CI/CD': ['Deployment pipelines at GALE'],
  ACF: ['Editor tooling — +40% admin efficiency'],
  'SEO Optimization': ['+10-15% organic traffic', 'Headless WordPress — SEO rankings'],
  'Agile/Scrum': ['Sprint planning at GALE'],
  'Code Reviews': ['Leading a team of developers'],
  Mentoring: ['5+ engineers mentored'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Beginning',
    period: '2013 – 2016',
    synopsis: 'Information Technology at GIIT Professional College, then a Master of Computer Applications in Bengaluru.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Foundation',
        description: "Bachelor's Degree in Information Technology at GIIT Professional College, Jamshedpur — First Class.",
        tags: ['B.IT', 'First Class'],
        runtime: 'Graduated 2013',
        palette: amber,
      },
      {
        code: 'S01 E02',
        title: 'The Masters',
        description: 'Master of Computer Applications at M S Engineering College, Bengaluru — First Class.',
        tags: ['MCA', 'First Class'],
        runtime: 'Graduated 2016',
        palette: violet,
      },
    ],
  },
  {
    number: 2,
    title: 'Learning to Ship',
    period: '2017 – 2019',
    synopsis: 'Two years writing components other people had to maintain, then six months where the number at the end was the point.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'Modular by Default',
        description: 'Developed modular JavaScript and CSS components for scalable, maintainable web apps at Radical Networks.',
        tags: ['JavaScript', 'CSS', 'HTML'],
        runtime: 'Jan 2017 – Oct 2018',
        palette: ocean,
      },
      {
        code: 'S02 E02',
        title: 'The A/B Test',
        description: 'Built WordPress-based microsites and landing pages with A/B testing at Exito Media Concepts, boosting conversions by 20%.',
        tags: ['WordPress', 'A/B Testing', 'CRO'],
        runtime: 'Oct 2018 – Mar 2019',
        palette: crimson,
      },
      {
        code: 'S02 E03',
        title: 'Twenty-Five Percent',
        description: 'Optimized SQL queries and front-end assets (CSS/JS), improving load speeds by 25%.',
        tags: ['MySQL', 'CSS', 'JavaScript'],
        runtime: '+25% load speed',
        palette: jade,
      },
    ],
  },
  {
    number: 3,
    title: 'Enter: GALE',
    period: '2019 – 2022',
    synopsis: 'Three years at GALE turning one-off builds into a component library, and markup into organic traffic.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'Themes and Plugins',
        description: 'Maintained and enhanced custom WordPress themes and plugins, improving admin efficiency by 40%.',
        tags: ['WordPress', 'PHP', 'ACF'],
        runtime: '+40% admin efficiency',
        palette: amber,
      },
      {
        code: 'S03 E02',
        title: 'The Component Library',
        description: 'Built reusable UI components using jQuery, Sass, Less, and Bootstrap, cutting bug-fix time by 50%.',
        tags: ['jQuery', 'Sass', 'Bootstrap'],
        runtime: '-50% bug-fix time',
        palette: violet,
      },
      {
        code: 'S03 E03',
        title: 'Markup That Ranks',
        description: 'Optimized markup/CSS structure to support SEO efforts, resulting in a 10-15% rise in organic traffic.',
        tags: ['SEO', 'HTML', 'CSS'],
        runtime: '+10-15% organic traffic',
        palette: jade,
      },
    ],
  },
  {
    number: 4,
    title: 'The Senior Years',
    period: '2022 – Present',
    synopsis: 'Promoted to Senior Associate Developer. Four named brands, a team to lead, and the numbers to show for it.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'Delivery Lead',
        description: 'Led and delivered user-centric, responsive web applications using React, JavaScript (ES6+), PHP/MySQL, WordPress, and Shopify.',
        tags: ['React', 'JavaScript', 'PHP', 'WordPress', 'Shopify'],
        runtime: 'Aug 2022 – Present',
        palette: crimson,
      },
      {
        code: 'S04 E02',
        title: 'Twenty to Thirty',
        description: 'Improved page load times by 20-30% through asset/code optimization, boosting user retention.',
        tags: ['Performance', 'Core Web Vitals'],
        runtime: '+20-30% faster',
        palette: amber,
      },
      {
        code: 'S04 E03',
        title: 'Ninety-Five Percent',
        description: 'Resolved cross-browser issues across four client platforms, increasing UX reliability by 95%.',
        tags: ['Cross-browser', 'QA'],
        runtime: '95% reliability',
        palette: ocean,
      },
      {
        code: 'S04 E04',
        title: 'Less JavaScript',
        description: 'Enhanced UI responsiveness and reduced JS bundle size, improving TTI by 15%.',
        tags: ['Bundle size', 'TTI'],
        runtime: '+15% TTI',
        palette: jade,
      },
      {
        code: 'S04 E05',
        title: 'The Mentor',
        description: 'Mentored and led a team of developers, managing code reviews, task delegation, and performance feedback.',
        tags: ['Mentoring', 'Code Review', 'Agile'],
        runtime: '5+ engineers',
        palette: violet,
      },
    ],
  },
  {
    number: 5,
    title: "What's Next",
    period: 'Now streaming',
    synopsis: 'Architecting at scale, headless platforms, and building engineering cultures that deliver.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'The Next Chapter',
        description: 'Architecting scalable systems, driving full-cycle product development, and building strong engineering cultures.',
        tags: ['Architecture', 'Headless', 'Leadership'],
        runtime: 'In production',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Years shipping', title: '9.5+', detail: 'Production web since 2017 • Four studios', palette: amber },
  { label: 'Projects delivered', title: '50+', detail: 'From microsites to enterprise platforms', palette: crimson },
  { label: 'The enterprise Original', title: 'CPPIB', detail: "One of the world's largest pension funds", palette: ocean },
  { label: 'Cross-browser', title: '95%', detail: 'UX reliability after a sustained fix programme', palette: jade },
  { label: 'Performance', title: '20-30%', detail: 'Faster page loads through asset & code optimization', palette: violet },
  { label: 'Plugin architecture', title: '70%', detail: 'Manual data entry effort removed', palette: amber },
  { label: 'Headless builds', title: '40%', detail: 'Faster sites and better SEO rankings', palette: crimson },
  { label: 'Admin efficiency', title: '40%', detail: 'Custom themes and plugins rebuilt for editors', palette: ocean },
  { label: 'Team led', title: '5+', detail: 'Engineers mentored, reviewed and developed', palette: jade },
  { label: 'Current role', title: 'Senior', detail: 'Associate Developer at GALE, Bengaluru', palette: violet },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Now',
    title: 'Senior Associate Developer',
    lines: ['GALE · Bengaluru, India', 'August 2022 – Present'],
    chips: ['9.5+ years'],
  },
  {
    kicker: 'Skills',
    title: 'React and WordPress.',
    lines: ['JavaScript (ES6+), PHP, SQL · React, Next.js, Redux', 'MySQL, MongoDB · Docker, AWS, CI/CD'],
    chips: ['React', 'Next.js', 'WordPress', 'PHP', 'MySQL', 'Docker'],
  },
  {
    kicker: 'Career',
    title: 'Four Tenures',
    lines: ['Radical Networks · Jan 2017 – Oct 2018', 'Exito Media Concepts · Oct 2018 – Mar 2019', 'GALE · Apr 2019 – Present, promoted to Senior in 2022'],
  },
  {
    kicker: 'Projects',
    title: 'Four Originals',
    lines: ['CPPIB — enterprise finance, accessible at scale', 'Fogo de Chao — reservations, menus, locations', 'Enercare — customer acquisition & service', 'MilkPEP — headless, national campaign reach'],
  },
  {
    kicker: 'Achievements',
    title: 'Measured Outcomes',
    lines: ['Plugin Architecture — 70% less manual entry', 'Headless WordPress — 40% faster', 'Legacy Migration — 50% lower maintenance'],
  },
  {
    kicker: 'Leadership',
    title: 'The Team',
    lines: ['Sprint planning, code reviews and delivery timelines', '5+ engineers mentored'],
  },
  {
    kicker: 'Current mission',
    title: 'Now exploring',
    lines: ['Architecture at scale · Headless platforms · Engineering culture'],
  },
];

export type ProfileId = 'anup' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'anup',
    name: 'Anup',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & career', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • Produced at GALE`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 from the resume', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: {
    nav: 'Moments',
    card: 'My Achievements',
    meta: certifications.length
      ? `${achievements.length} Moments • ${certifications.length} Certifications`
      : `${achievements.length} Moments • Measured outcomes`,
    palette: crimson,
  },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • Education, career & projects', palette: violet },
};
