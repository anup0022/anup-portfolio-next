import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Anup Singh | Senior Frontend Developer & React Engineer | Bangalore, India",
  alternates: {
    canonical: "https://www.anup-singh.in/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Portfolio-specific stylesheet */}
      <link rel="stylesheet" href="/style.css" />

      {/* Structured Data: Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://www.anup-singh.in/#person",
            name: "Anup Singh",
            givenName: "Anup",
            familyName: "Singh",
            url: "https://www.anup-singh.in",
            image: {
              "@type": "ImageObject",
              url: "https://www.anup-singh.in/photo.jpg",
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
            knowsAbout: [
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
            ],
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
          }),
        }}
      />

      {/* Structured Data: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://www.anup-singh.in/#website",
            url: "https://www.anup-singh.in",
            name: "Anup Singh - Senior Software Developer Portfolio",
            description:
              "Portfolio website of Anup Singh, a Senior Software Engineer and Frontend Developer based in Bangalore, India.",
            publisher: { "@id": "https://www.anup-singh.in/#person" },
            inLanguage: "en-IN",
          }),
        }}
      />

      {/* Structured Data: ProfilePage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "@id": "https://www.anup-singh.in/#profilepage",
            url: "https://www.anup-singh.in",
            name: "Anup Singh | Senior Frontend Developer & React Engineer",
            description:
              "Professional portfolio of Anup Singh - Senior Software Engineer with expertise in React, JavaScript, WordPress and PHP.",
            mainEntity: { "@id": "https://www.anup-singh.in/#person" },
            dateCreated: "2024-01-01",
            dateModified: "2026-05-24",
          }),
        }}
      />

      {/* Noscript fallback */}
      <noscript>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .page-loader { display: none !important; }
              .hero-name, .hero-desc, .hero-greeting, .section, .about, .footer { opacity: 1 !important; transform: none !important; }
              .reveal { opacity: 1 !important; transform: none !important; }
            `,
          }}
        />
      </noscript>

      {/* PAGE LOADER */}
      <div className="page-loader" id="pageLoader">
        <div className="loader-content">
          <div className="loader-spinner"></div>
          <div className="loader-text">Loading</div>
        </div>
      </div>

      {/* CURSOR FOLLOWER */}
      <div className="cursor-follower" id="cursorFollower"></div>

      {/* PARTICLE CANVAS */}
      <canvas id="particles-canvas"></canvas>

      {/* NAVIGATION */}
      <nav className="nav" id="nav" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#" className="nav-logo" aria-label="Anup Singh - Home">
            A<span>.</span>Singh
          </a>
          <ul className="nav-links" id="navLinks">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#education">Education</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <div
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle navigation menu"
            role="button"
            tabIndex={0}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero" id="hero" aria-label="Introduction">
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-greeting">Hello, I&apos;m</div>
              <h1 className="hero-name">Anup Singh</h1>
              <div
                className="hero-title"
                aria-label="Senior Software Engineer, Frontend Developer, React Developer"
              >
                <span id="typedText"></span>
                <span className="typed-cursor"></span>
              </div>
              <p className="hero-desc">
                Senior Software Engineer and Frontend Developer with 9.5+ years
                of experience delivering high-performance web solutions using
                React, Next.js, and JavaScript. I transform business needs into
                robust technical solutions and lead engineering teams to deliver
                at scale.
              </p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Get In Touch
                </a>
                <a href="#experience" className="btn btn-outline">
                  View My Work
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-number">
                    <span className="counter" data-target="9">
                      0
                    </span>
                    +
                  </div>
                  <div className="hero-stat-label">Years Exp.</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">
                    <span className="counter" data-target="50">
                      0
                    </span>
                    +
                  </div>
                  <div className="hero-stat-label">Projects</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">
                    <span className="counter" data-target="5">
                      0
                    </span>
                    +
                  </div>
                  <div className="hero-stat-label">Mentored</div>
                </div>
              </div>
            </div>
            <div className="hero-photo-wrapper">
              <div className="hero-photo-container">
                <div className="hero-photo-glow"></div>
                <div className="hero-photo-ring"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photo.jpg"
                  alt="Anup Singh - Senior Frontend Developer and React Engineer based in Bangalore, India"
                  className="hero-photo"
                  id="heroPhoto"
                  width={400}
                  height={400}
                  loading="eager"
                />
                <div className="hero-photo-dots"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section about" id="about" aria-label="About Anup Singh">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">About Me</div>
            <h2 className="section-title">
              Crafting Digital <span>Experiences</span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-text reveal reveal-delay-1">
              <p>
                I&apos;m a{" "}
                <strong>Senior Software Engineer and Frontend Developer</strong>{" "}
                based in Bangalore, India, with over 9.5 years of hands-on
                experience delivering high-performance web solutions using{" "}
                <strong>
                  React.js, Next.js, WordPress, PHP, and MySQL
                </strong>
                .
              </p>
              <p>
                I have a proven track record in leading teams, architecting
                scalable systems, and driving full-cycle product development. As
                a <strong>React developer</strong> and{" "}
                <strong>JavaScript expert</strong>, I&apos;m passionate about
                transforming complex business needs into robust, elegant
                technical solutions.
              </p>
              <p>
                Currently at <strong>GALE</strong>, I lead a team of developers
                where I oversee sprint planning, code reviews, and delivery
                timelines. I love mentoring engineers and building strong
                engineering cultures that deliver excellence.
              </p>
              <div className="about-info-grid">
                <div className="about-info-item">
                  <div className="about-info-label">Location</div>
                  <div className="about-info-value">Bangalore, India</div>
                </div>
                <div className="about-info-item">
                  <div className="about-info-label">Email</div>
                  <div className="about-info-value">anup0022@gmail.com</div>
                </div>
                <div className="about-info-item">
                  <div className="about-info-label">Languages</div>
                  <div className="about-info-value">English, Hindi</div>
                </div>
                <div className="about-info-item">
                  <div className="about-info-label">Interests</div>
                  <div className="about-info-value">Tech, Cooking, Travel</div>
                </div>
              </div>
            </div>
            <div className="about-counters reveal reveal-delay-2">
              <div className="counter-card">
                <div className="counter-number">
                  <span className="counter" data-target="9">
                    0
                  </span>
                  <span className="counter-suffix">+</span>
                </div>
                <div className="counter-label">
                  Years of Professional Experience
                </div>
              </div>
              <div className="counter-card">
                <div className="counter-number">
                  <span className="counter" data-target="50">
                    0
                  </span>
                  <span className="counter-suffix">+</span>
                </div>
                <div className="counter-label">Successful Client Projects</div>
              </div>
              <div className="counter-card">
                <div className="counter-number">
                  <span className="counter" data-target="5">
                    0
                  </span>
                  <span className="counter-suffix">+</span>
                </div>
                <div className="counter-label">
                  Junior Developers Mentored
                </div>
              </div>
              <div className="counter-card">
                <div className="counter-number">
                  <span className="counter" data-target="95">
                    0
                  </span>
                  <span className="counter-suffix">%</span>
                </div>
                <div className="counter-label">
                  Cross-Browser UX Reliability
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        className="section"
        id="skills"
        aria-label="Technical skills and tools"
      >
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Skills &amp; Tools</div>
            <h2 className="section-title">
              My Technical <span>Arsenal</span>
            </h2>
          </div>
          <div className="skills-grid">
            <div className="skill-category reveal reveal-delay-1">
              <div className="skill-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-cyan)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3>Languages</h3>
              <div className="skill-tags">
                <span className="skill-tag">PHP</span>
                <span className="skill-tag">JavaScript (ES6+)</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
              </div>
            </div>
            <div className="skill-category reveal reveal-delay-2">
              <div className="skill-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-cyan)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3>Frontend</h3>
              <div className="skill-tags">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">Redux</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">jQuery</span>
                <span className="skill-tag">AJAX</span>
              </div>
            </div>
            <div className="skill-category reveal reveal-delay-3">
              <div className="skill-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-cyan)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              </div>
              <h3>Backend &amp; CMS</h3>
              <div className="skill-tags">
                <span className="skill-tag">WordPress</span>
                <span className="skill-tag">WooCommerce</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">GraphQL</span>
                <span className="skill-tag">Node.js</span>
              </div>
            </div>
            <div className="skill-category reveal reveal-delay-4">
              <div className="skill-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-cyan)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <h3>Database</h3>
              <div className="skill-tags">
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">MongoDB</span>
              </div>
            </div>
            <div className="skill-category reveal reveal-delay-5">
              <div className="skill-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-cyan)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
              </div>
              <h3>Cloud &amp; DevOps</h3>
              <div className="skill-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">GitHub Actions</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">AWS (S3, Lambda)</span>
                <span className="skill-tag">Apache</span>
                <span className="skill-tag">CI/CD</span>
              </div>
            </div>
            <div className="skill-category reveal reveal-delay-6">
              <div className="skill-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-cyan)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3>Other</h3>
              <div className="skill-tags">
                <span className="skill-tag">ACF</span>
                <span className="skill-tag">SEO Optimization</span>
                <span className="skill-tag">Agile/Scrum</span>
                <span className="skill-tag">Code Reviews</span>
                <span className="skill-tag">Mentoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section
        className="section experience"
        id="experience"
        aria-label="Professional work experience"
      >
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Career Journey</div>
            <h2 className="section-title">
              Professional <span>Experience</span>
            </h2>
          </div>
          <div className="timeline">
            <div className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Aug 2022 - Present</div>
              <div className="timeline-card">
                <div className="timeline-company">
                  GALE - Bengaluru, India
                </div>
                <div className="timeline-role">Senior Associate Developer</div>
                <ul className="timeline-desc">
                  <li>
                    Led and delivered user-centric, responsive web applications
                    using React, JavaScript (ES6+), PHP/MySQL, WordPress, and
                    Shopify
                  </li>
                  <li>
                    Improved page load times by 20-30% through asset/code
                    optimization, boosting user retention
                  </li>
                  <li>
                    Resolved cross-browser issues, increasing UX reliability by
                    95%
                  </li>
                  <li>
                    Enhanced UI responsiveness and reduced JS bundle size,
                    improving TTI by 15%
                  </li>
                  <li>
                    Mentored and led a team of developers, managing code reviews,
                    task delegation, and performance feedback
                  </li>
                </ul>
                <div className="timeline-tech">
                  <span>React</span>
                  <span>JavaScript</span>
                  <span>PHP</span>
                  <span>WordPress</span>
                  <span>Shopify</span>
                </div>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Apr 2019 - Aug 2022</div>
              <div className="timeline-card">
                <div className="timeline-company">
                  GALE - Bengaluru, India
                </div>
                <div className="timeline-role">Front End Associate</div>
                <ul className="timeline-desc">
                  <li>
                    Maintained and enhanced custom WordPress themes and plugins,
                    improving admin efficiency by 40%
                  </li>
                  <li>
                    Built reusable UI components using jQuery, Sass, Less, and
                    Bootstrap, cutting bug-fix time by 50%
                  </li>
                  <li>
                    Optimized markup/CSS structure to support SEO efforts,
                    resulting in a 10-15% rise in organic traffic
                  </li>
                </ul>
                <div className="timeline-tech">
                  <span>WordPress</span>
                  <span>jQuery</span>
                  <span>Sass</span>
                  <span>Bootstrap</span>
                </div>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Oct 2018 - Mar 2019</div>
              <div className="timeline-card">
                <div className="timeline-company">
                  Exito Media Concepts - Bengaluru, India
                </div>
                <div className="timeline-role">Frontend Developer</div>
                <ul className="timeline-desc">
                  <li>
                    Built WordPress-based microsites and landing pages with A/B
                    testing, boosting conversions by 20%
                  </li>
                  <li>
                    Optimized SQL queries and front-end assets (CSS/JS),
                    improving load speeds by 25%
                  </li>
                </ul>
                <div className="timeline-tech">
                  <span>WordPress</span>
                  <span>MySQL</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                </div>
              </div>
            </div>
            <div className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Jan 2017 - Oct 2018</div>
              <div className="timeline-card">
                <div className="timeline-company">
                  Radical Networks - Bengaluru, India
                </div>
                <div className="timeline-role">Junior Software Developer</div>
                <ul className="timeline-desc">
                  <li>
                    Developed modular JavaScript and CSS components for scalable,
                    maintainable web apps
                  </li>
                  <li>
                    Contributed to front-end builds and cross-team collaboration
                    for timely project delivery
                  </li>
                </ul>
                <div className="timeline-tech">
                  <span>JavaScript</span>
                  <span>CSS</span>
                  <span>HTML</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="section" id="projects" aria-label="Featured projects">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Notable Work</div>
            <h2 className="section-title">
              Featured <span>Projects</span>
            </h2>
          </div>
          <div className="projects-grid">
            <div className="project-card reveal reveal-delay-1">
              <div className="project-icon">&#x1F3E6;</div>
              <div className="project-name">
                <a href="https://cppib.com" target="_blank" rel="noopener">
                  Canada Pension Plan Investment Board
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
              <div className="project-org">cppib.com</div>
              <p className="project-desc">
                Built and maintained the web presence for one of the
                world&apos;s largest pension fund investment managers, ensuring
                high performance and accessibility across all platforms.
              </p>
              <a
                href="https://cppib.com"
                target="_blank"
                rel="noopener"
                className="project-link"
              >
                Visit Site &rarr;
              </a>
            </div>
            <div className="project-card reveal reveal-delay-2">
              <div className="project-icon">&#x1F525;</div>
              <div className="project-name">
                <a href="https://fogodechao.com" target="_blank" rel="noopener">
                  Fogo de Chao
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
              <div className="project-org">fogodechao.com</div>
              <p className="project-desc">
                Delivered the digital experience for the internationally
                acclaimed Brazilian steakhouse, featuring reservation systems,
                menu displays, and location finders.
              </p>
              <a
                href="https://fogodechao.com"
                target="_blank"
                rel="noopener"
                className="project-link"
              >
                Visit Site &rarr;
              </a>
            </div>
            <div className="project-card reveal reveal-delay-3">
              <div className="project-icon">&#x1F3E0;</div>
              <div className="project-name">
                <a href="https://enercare.ca" target="_blank" rel="noopener">
                  Enercare
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
              <div className="project-org">enercare.ca</div>
              <p className="project-desc">
                Built the web platform for Canada&apos;s leading home and
                commercial services company, powering customer acquisition and
                service management.
              </p>
              <a
                href="https://enercare.ca"
                target="_blank"
                rel="noopener"
                className="project-link"
              >
                Visit Site &rarr;
              </a>
            </div>
            <div className="project-card reveal reveal-delay-4">
              <div className="project-icon">&#x1F95B;</div>
              <div className="project-name">
                <a href="https://milkpep.org" target="_blank" rel="noopener">
                  Milk PEP
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
              <div className="project-org">milkpep.org</div>
              <p className="project-desc">
                Developed the digital platform for the Milk Processor Education
                Program, delivering engaging content and promotional campaigns to
                a nationwide audience.
              </p>
              <a
                href="https://milkpep.org"
                target="_blank"
                rel="noopener"
                className="project-link"
              >
                Visit Site &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section
        className="section education"
        id="education"
        aria-label="Education and credentials"
      >
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Academic Background</div>
            <h2 className="section-title">
              Education &amp; <span>Credentials</span>
            </h2>
          </div>
          <div className="edu-grid">
            <div className="edu-card reveal reveal-delay-1">
              <div className="edu-degree">
                Master of Computer Applications (MCA)
              </div>
              <div className="edu-school">M S Engineering College</div>
              <div className="edu-location">Bengaluru, India</div>
              <div className="edu-year">Graduated 2016</div>
              <div className="edu-badge">First Class</div>
            </div>
            <div className="edu-card reveal reveal-delay-2">
              <div className="edu-degree">
                Bachelor&apos;s Degree - Information Technology
              </div>
              <div className="edu-school">GIIT Professional College</div>
              <div className="edu-location">Jamshedpur, India</div>
              <div className="edu-year">Graduated 2013</div>
              <div className="edu-badge">First Class</div>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section className="section" id="achievements" aria-label="Key achievements">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-label">Accomplishments</div>
            <h2 className="section-title">
              Key <span>Achievements</span>
            </h2>
          </div>
          <div className="achievements-grid">
            <div className="achievement-card reveal reveal-delay-1">
              <div className="achievement-icon">&#x26A1;</div>
              <div className="achievement-title">Plugin Architecture</div>
              <div className="achievement-desc">
                Architected custom WordPress plugins including complex migration
                tools, reducing manual data entry effort by 70%
              </div>
            </div>
            <div className="achievement-card reveal reveal-delay-2">
              <div className="achievement-icon">&#x1F680;</div>
              <div className="achievement-title">Headless WordPress</div>
              <div className="achievement-desc">
                Delivered React/Next.js-based headless WordPress sites, improving
                site speed by 40% and SEO rankings
              </div>
            </div>
            <div className="achievement-card reveal reveal-delay-3">
              <div className="achievement-icon">&#x1F504;</div>
              <div className="achievement-title">Legacy Migration</div>
              <div className="achievement-desc">
                Migrated multiple legacy PHP systems to modern WordPress/React
                architecture, reducing maintenance costs by 50%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        className="section contact"
        id="contact"
        aria-label="Contact information"
      >
        <div className="contact-glow contact-glow-1"></div>
        <div className="container">
          <div className="contact-content">
            <div
              className="section-label"
              style={{ justifyContent: "center" }}
            >
              Get In Touch
            </div>
            <h2 className="contact-title reveal">
              Let&apos;s Build Something <span>Amazing</span>
            </h2>
            <p className="contact-subtitle reveal reveal-delay-1">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Let&apos;s connect and
              make it happen.
            </p>
            <div className="contact-links reveal reveal-delay-2">
              <a href="mailto:anup0022@gmail.com" className="contact-link">
                <svg
                  className="contact-link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="contact-link-text">anup0022@gmail.com</span>
              </a>
              <a href="tel:+919008924503" className="contact-link">
                <svg
                  className="contact-link-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="contact-link-text">+91-9008924503</span>
              </a>
            </div>
            <div className="contact-socials reveal reveal-delay-3">
              <a
                href="https://www.linkedin.com/in/00anup-singh/"
                target="_blank"
                rel="noopener me"
                className="social-link"
                title="Anup Singh on LinkedIn"
                aria-label="Visit Anup Singh LinkedIn profile"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://github.com/anup0022"
                target="_blank"
                rel="noopener me"
                className="social-link"
                title="Anup Singh on GitHub"
                aria-label="Visit Anup Singh GitHub profile"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <p className="footer-text">
            Designed &amp; Built with{" "}
            <span className="footer-heart">&hearts;</span> by{" "}
            <span>Anup Singh</span> &copy; 2026
          </p>
          <p
            className="footer-seo"
            style={{ fontSize: "0.75rem", color: "#888", marginTop: "0.5rem" }}
          >
            Anup Singh &mdash; Senior Software Engineer &amp; Frontend Developer
            in Bangalore, India | React.js, Next.js, JavaScript Expert |
            Available for new opportunities
          </p>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button
        className="back-to-top"
        id="backToTop"
        aria-label="Back to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* Portfolio Scripts */}
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
