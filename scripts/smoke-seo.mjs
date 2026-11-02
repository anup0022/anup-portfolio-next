/**
 * Post-build SEO/content gate for the home page.
 *
 * The redesign put a cinematic layer on top of a page that ranks. This
 * asserts the layer never swallowed the content: run `npm run build`, then
 * `node scripts/smoke-seo.mjs`. Exits non-zero on any regression.
 */
import { readFileSync } from "node:fs";

const DIST = process.env.NEXT_DIST_DIR || ".next";
const FILE = `${DIST}/server/app/index.html`;
let html;
try {
  html = readFileSync(FILE, "utf8");
} catch {
  console.error(`Cannot read ${FILE}. Run \`npm run verify\` (or \`npm run build\`) first.`);
  process.exit(1);
}

const text = html
  .replace(/<[^>]+>/g, " ")
  .replace(/&#x27;|&apos;/g, "'")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, " ");

const fails = [];
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  -- ${detail}` : ""}`);
  if (!ok) fails.push(name);
};

// Structure
check("exactly one <h1>", (html.match(/<h1[ >]/g) || []).length === 1);
check("exactly nine <h2>", (html.match(/<h2[ >]/g) || []).length === 9);
check(
  "three JSON-LD blocks",
  (html.match(/<script type="application\/ld\+json">/g) || []).length === 3
);
for (const id of ["about","experience","projects","numbers","skills","achievements","education","notes","contact"]) {
  check(`section id="${id}"`, html.includes(`id="${id}"`));
}
check("canonical tag", html.includes('rel="canonical"'));
check("skip link precedes the h1", html.indexOf("sv-skip") < html.indexOf("<h1"));

// The cinematic layer must never reach server HTML
check("no opacity:0 serialised", !html.replace(/\s/g, "").includes("opacity:0"));
check("no curtain in server HTML", !html.includes("aria-modal"));
check("all four volume panels present", (html.match(/role="tabpanel"/g) || []).length === 4);
check("old stylesheet gone", !html.includes("style.css"));
check("old script gone", !html.includes("script.js"));

// Entity graph
for (const id of ["/#person", "/#website", "/#profilepage"]) {
  check(`JSON-LD @id ${id}`, html.includes(id));
}
check(
  "publisher -> person",
  html.includes('"publisher":{"@id":"https://www.anup-singh.in/#person"}')
);
check(
  "mainEntity -> person",
  html.includes('"mainEntity":{"@id":"https://www.anup-singh.in/#person"}')
);
const ka = html.match(/"knowsAbout":\[(.*?)\]/);
check("knowsAbout has 19 entries", !!ka && ka[1].split('","').length === 19);

// Indexed copy — these strings currently rank; none may be reworded or dropped
const copy = [
  "9.5+ years of experience delivering high-performance web solutions",
  "Mentored and led a team of developers",
  "increasing UX reliability by 95%",
  "improving admin efficiency by 40%",
  "cutting bug-fix time by 50%",
  "10-15% rise in organic traffic",
  "boosting conversions by 20%",
  "reducing manual data entry effort by 70%",
  "reducing maintenance costs by 50%",
  "Master of Computer Applications",
  "M S Engineering College",
  "GIIT Professional College",
];
const missingCopy = copy.filter((c) => !text.includes(c));
check("indexed copy verbatim", missingCopy.length === 0, missingCopy.join(" | "));

const skills = ["PHP","JavaScript (ES6+)","SQL","HTML5","CSS3","React.js","Next.js","Redux","Tailwind CSS","jQuery","AJAX","WordPress","WooCommerce","REST APIs","GraphQL","Node.js","MySQL","MongoDB","Git","GitHub Actions","Docker","AWS (S3, Lambda)","Apache","CI/CD","ACF","SEO Optimization","Agile/Scrum","Code Reviews","Mentoring"];
const missingSkills = skills.filter((s) => !text.includes(s));
check("all 29 skill strings", missingSkills.length === 0, missingSkills.join(" | "));

const roles = ["Senior Software Engineer","React & JavaScript Engineer","Next.js & Headless WordPress","Team Lead & Mentor","Frontend Architect"];
check("five role strings server-rendered", roles.every((r) => text.includes(r)));
check("twelve episodes rendered", (text.match(/V0\d.E0\d/g) || []).length >= 12);
check(
  "four Originals linked",
  ["cppib.com", "fogodechao.com", "enercare.ca", "milkpep.org"].every((d) => html.includes(d))
);

console.log();
if (fails.length) {
  console.error(`FAILED (${fails.length}): ${fails.join(", ")}`);
  process.exit(1);
}
console.log("All checks passed.");
