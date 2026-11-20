import {
  achievements,
  projects,
  type Achievement,
  type Project,
} from "../constants";

/** Portfolio sections that have a shareable hash URL. */
export type Section = "projects" | "achievements" | "skills" | "certificates";

export type Route =
  | { kind: "home" }
  | { kind: "section"; section: Section }
  | { kind: "project"; project: Project }
  | { kind: "achievement"; achievement: Achievement };

/** DOM id of the element each section URL scrolls to. */
export const SECTION_IDS: Record<Section, string> = {
  projects: "projects-section",
  achievements: "achievements-section",
  skills: "skills-section",
  certificates: "certificates-section",
};

/**
 * Accepted hash names. Singular forms are kept so hand-written links and
 * older aliases keep working; the canonical form is the plural section name.
 */
const SECTION_ALIASES: Record<string, Section> = {
  project: "projects",
  projects: "projects",
  achievement: "achievements",
  achievements: "achievements",
  skill: "skills",
  skills: "skills",
  certificate: "certificates",
  certificates: "certificates",
};

const PROJECT_PATH = /^\/projects\/([^/]+)\/?$/;
const ACHIEVEMENT_PATH = /^\/achievements\/([^/]+)\/?$/;

/** Absolute app path for a section, e.g. `/#skills`. */
export const sectionPath = (section: Section) => `/#${section}`;

/** Absolute app path for a project, e.g. `/projects/my-project`. */
export const projectPath = (slug: string) => `/projects/${encodeURIComponent(slug)}`;

/**
 * Absolute app path for an achievement, e.g. `/achievements/my-achievement`.
 * An achievement's `id` doubles as its permanent slug.
 */
export const achievementPath = (slug: string) =>
  `/achievements/${encodeURIComponent(slug)}`;

/** The current path including query string and hash. */
export const currentLocation = () =>
  `${window.location.pathname}${window.location.search}${window.location.hash}`;

/** Decodes a URL segment without throwing on malformed input. */
const decodeSegment = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

/**
 * Resolves a slug against the existing project data. Matching ignores case and
 * surrounding whitespace so a slightly mangled shared link still works.
 */
export const findProjectBySlug = (slug: string): Project | null => {
  const target = slug.trim().toLowerCase();
  if (!target) return null;
  return projects.find((project) => project.query.toLowerCase() === target) ?? null;
};

/**
 * Resolves an achievement slug against the existing achievement data. The
 * achievement `id` is the canonical slug, so no second identifier is stored.
 * Matching ignores case and surrounding whitespace.
 */
export const findAchievementBySlug = (slug: string): Achievement | null => {
  const target = slug.trim().toLowerCase();
  if (!target) return null;
  return (
    achievements.find(
      (achievement) => achievement.id.toLowerCase() === target,
    ) ?? null
  );
};

const readHashSection = (hash: string): Section | null => {
  const raw = decodeSegment(hash.replace(/^#/, "")).trim().toLowerCase();
  if (!raw) return null;

  // Accept the DOM id form too (`#skills-section`).
  const name = raw.endsWith("-section") ? raw.slice(0, -"-section".length) : raw;
  return SECTION_ALIASES[name] ?? null;
};

/**
 * Maps the legacy query-parameter URLs to a route plus its canonical path.
 * Returns null when the query string carries no routing intent, so unrelated
 * parameters are left untouched.
 *
 *   ?project=<slug> — individual project
 *   ?project        — projects section
 *   ?achievement=<slug> — individual achievement
 *   ?achievement    — achievements section
 *   ?skills         — skills section
 *   ?certificates   — certificates section
 *   ?section=<name> — explicit section form
 */
const readLegacyRoute = (
  search: string,
): { route: Route; path: string } | null => {
  if (!search) return null;
  const params = new URLSearchParams(search);

  if (params.has("project")) {
    const slug = params.get("project")?.trim() ?? "";
    const project = slug ? findProjectBySlug(slug) : null;

    return project
      ? { route: { kind: "project", project }, path: projectPath(project.query) }
      : { route: { kind: "section", section: "projects" }, path: sectionPath("projects") };
  }

  if (params.has("achievement")) {
    const slug = params.get("achievement")?.trim() ?? "";
    const achievement = slug ? findAchievementBySlug(slug) : null;

    return achievement
      ? {
          route: { kind: "achievement", achievement },
          path: achievementPath(achievement.id),
        }
      : {
          route: { kind: "section", section: "achievements" },
          path: sectionPath("achievements"),
        };
  }

  const rawSection = params.get("section")?.trim().toLowerCase();
  if (rawSection) {
    const section = SECTION_ALIASES[rawSection] ?? "projects";
    return { route: { kind: "section", section }, path: sectionPath(section) };
  }

  // Short forms: ?achievement, ?skills, ?certificates, ?projects, ...
  for (const [param, section] of Object.entries(SECTION_ALIASES)) {
    if (param === "project") continue;
    if (params.has(param)) {
      return { route: { kind: "section", section }, path: sectionPath(section) };
    }
  }

  return null;
};

const isHomePath = (pathname: string) =>
  pathname === "/" || pathname === "/index.html";

/**
 * Reads the current URL and returns the route it represents.
 *
 * Non-canonical URLs (legacy query links, wrong slug casing, unknown sections)
 * are rewritten with `replaceState` so they never add history entries and can
 * never redirect-loop: the function reads once, rewrites once, and returns the
 * matching route instead of re-reading the rewritten URL.
 */
export const resolveRoute = (): Route => {
  const { pathname, search, hash } = window.location;

  const legacy = readLegacyRoute(search);
  if (legacy) {
    window.history.replaceState(null, "", legacy.path);
    return legacy.route;
  }

  const projectMatch = PROJECT_PATH.exec(pathname);
  if (projectMatch) {
    const project = findProjectBySlug(decodeSegment(projectMatch[1]));

    if (!project) {
      window.history.replaceState(null, "", sectionPath("projects"));
      return { kind: "section", section: "projects" };
    }

    // Mark the entry so closing a directly-opened project can replace the URL
    // instead of walking back out of the site.
    window.history.replaceState(
      { portfolioProject: project.query },
      "",
      projectPath(project.query),
    );
    return { kind: "project", project };
  }

  const achievementMatch = ACHIEVEMENT_PATH.exec(pathname);
  if (achievementMatch) {
    const achievement = findAchievementBySlug(
      decodeSegment(achievementMatch[1]),
    );

    if (!achievement) {
      window.history.replaceState(null, "", sectionPath("achievements"));
      return { kind: "section", section: "achievements" };
    }

    // Mark the entry so closing a directly-opened achievement can replace the
    // URL instead of walking back out of the site.
    window.history.replaceState(
      { portfolioAchievement: achievement.id },
      "",
      achievementPath(achievement.id),
    );
    return { kind: "achievement", achievement };
  }

  if (isHomePath(pathname)) {
    if (!hash) return { kind: "home" };

    const section = readHashSection(hash);
    if (!section) {
      window.history.replaceState(null, "", "/");
      return { kind: "home" };
    }

    if (hash !== `#${section}`) {
      window.history.replaceState(null, "", sectionPath(section));
    }
    return { kind: "section", section };
  }

  // Unknown path: show the projects section instead of a blank screen.
  window.history.replaceState(null, "", sectionPath("projects"));
  return { kind: "section", section: "projects" };
};

/** Pushes (or replaces) a section URL. No-ops when already on that URL. */
export const navigateToSection = (section: Section, replace = false) => {
  const path = sectionPath(section);
  if (currentLocation() === path) return;
  window.history[replace ? "replaceState" : "pushState"](null, "", path);
};

/** Pushes a project URL, marking the entry as portfolio-owned. */
export const pushProjectUrl = (slug: string) => {
  window.history.pushState({ portfolioProject: slug }, "", projectPath(slug));
};

/** Pushes an achievement URL, marking the entry as portfolio-owned. */
export const pushAchievementUrl = (slug: string) => {
  window.history.pushState(
    { portfolioAchievement: slug },
    "",
    achievementPath(slug),
  );
};

/** Replaces the current entry with a section URL (used when closing a modal). */
export const replaceWithSection = (section: Section) => {
  window.history.replaceState(null, "", sectionPath(section));
};
