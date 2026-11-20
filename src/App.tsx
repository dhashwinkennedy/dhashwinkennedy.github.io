/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import {
  Github,
  Linkedin,
  Grid3X3,
  Cpu,
  Bookmark,
  Trophy,
  Mail,
  Instagram,
} from "lucide-react";
import ReactGA from "react-ga4";
import ProfileLogo from "./assets/profile-logo.jpg";
import { achievements, projects, skills, certificates, aboutMe, education } from "./constants";
import type { Achievement } from "./constants";
import AchievementsSection from "./components/AchievementsSection";
import AchievementModal from "./components/AchievementModal";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import SkillsSection from "./components/SkillsSection";
import CertificatesSection from "./components/CertificatesSection";
import AboutSection from "./components/AboutSection";
import EducationSection from "./components/EducationSection";
import LoadingScreen from "./components/LoadingScreen";
import {
  SECTION_IDS,
  currentLocation,
  navigateToSection,
  pushAchievementUrl,
  pushProjectUrl,
  replaceWithSection,
  resolveRoute,
  type Route,
  type Section,
} from "./lib/routing";

import "./app.css";

const MY_EMAIL = "dhashwinkennedy@hotmail.com";

/** Initialised once at module scope — never inside the render body. */
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (GA_MEASUREMENT_ID) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
}

const trackEvent = (action: string, label?: string) => {
  if (!GA_MEASUREMENT_ID) return;
  ReactGA.event({ category: "portfolio", action, label });
};

type Tab = Section;

const PREVIEW_COUNT = 5;

type Project = (typeof projects)[number];

const preloadImage = (source: string) =>
  new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = source;
  });

/**
 * Waits for a target to mount without guessing a delay. Frame-based instead of
 * time-based so a link opened in a background tab still scrolls once visible.
 */
const waitForElement = (
  id: string,
  maxFrames = 240,
): Promise<HTMLElement | null> =>
  new Promise((resolve) => {
    let frames = 0;

    const check = () => {
      const element = document.getElementById(id);
      if (element) {
        resolve(element);
        return;
      }
      if (frames >= maxFrames) {
        resolve(null);
        return;
      }
      frames += 1;
      requestAnimationFrame(check);
    };

    check();
  });

const scrollToElement = (element: HTMLElement, block: ScrollLogicalPosition) => {
  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  element.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block,
  });
};

export default function App() {
  const [initialRoute] = useState<Route>(resolveRoute);
  const [activeTab, setActiveTab] = useState<Tab>(
    initialRoute.kind === "section"
      ? initialRoute.section
      : initialRoute.kind === "achievement"
        ? "achievements"
        : "projects",
  );
  const [showAllProjects, setShowAllProjects] = useState(
    initialRoute.kind === "project",
  );
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [highlightedProjectQuery, setHighlightedProjectQuery] = useState<string | null>(null);
  const [isAppReady, setIsAppReady] = useState(false);
  const [emailNotice, setEmailNotice] = useState("");
  const routeTimers = useRef<number[]>([]);
  const routeToken = useRef(0);
  const copyTimer = useRef<number | undefined>(undefined);
  /** Route last applied, used to keep scroll position when a modal closes. */
  const lastAppliedRoute = useRef<Route | null>(null);
  /** URL our own code navigated to, so popstate/hashchange can ignore echoes. */
  const lastHandledLocation = useRef<string>(currentLocation());
  /** True only when the open project was pushed by `openProject`. */
  const projectPushed = useRef(false);
  /** True only when the open achievement was pushed by `openAchievement`. */
  const achievementPushed = useRef(false);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, PREVIEW_COUNT);
  const visibleCerts    = showAllCerts    ? certificates : certificates.slice(0, PREVIEW_COUNT);

  const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
    { id: "projects",     label: "Projects",     icon: <Grid3X3 size={12} /> },
    { id: "achievements", label: "Achievements", icon: <Trophy size={12} /> },
    { id: "certificates", label: "Certificates", icon: <Bookmark size={12} /> },
    { id: "skills",       label: "Skills",       icon: <Cpu size={12} /> },
  ];

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const minimumLoadTime = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 450);
    });
    const fontsReady = "fonts" in document ? document.fonts.ready : Promise.resolve();
    // Only above-the-fold art blocks first paint — project screenshots load lazily.
    const essentialAssets = [ProfileLogo];

    void Promise.all([
      Promise.all(essentialAssets.map(preloadImage)),
      fontsReady,
      minimumLoadTime,
    ]).then(() => {
      if (isMounted) setIsAppReady(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const clearRouteTimers = useCallback(() => {
    routeTimers.current.forEach((timer) => window.clearTimeout(timer));
    routeTimers.current = [];
  }, []);

  const cancelPendingRoute = useCallback(() => {
    routeToken.current += 1;
    clearRouteTimers();
  }, [clearRouteTimers]);

  /**
   * Activates the requested tab, waits for its DOM target to mount, then
   * scrolls. Project routes additionally highlight the card before opening it.
   */
  const applyRoute = useCallback(
    async (route: Route) => {
      const previous = lastAppliedRoute.current;
      lastAppliedRoute.current = route;

      const token = ++routeToken.current;
      clearRouteTimers();
      setSelectedProject(null);
      setSelectedAchievement(null);
      setHighlightedProjectQuery(null);
      projectPushed.current = false;
      achievementPushed.current = false;

      if (route.kind === "home") {
        setActiveTab("projects");
        return;
      }

      if (route.kind === "project") {
        const project = route.project;
        setShowAllProjects(true);
        setActiveTab("projects");

        const card = await waitForElement(`project-${project.query}`);
        if (!card || token !== routeToken.current) return;

        scrollToElement(card, "center");

        routeTimers.current.push(
          window.setTimeout(() => {
            if (token === routeToken.current) {
              setHighlightedProjectQuery(project.query);
            }
          }, 350),
          window.setTimeout(() => {
            if (token === routeToken.current) {
              setHighlightedProjectQuery(null);
              setSelectedProject(project);
            }
          }, 1_200),
        );
        return;
      }

      if (route.kind === "achievement") {
        const achievement = route.achievement;
        setActiveTab("achievements");

        const card = await waitForElement(`achievement-${achievement.id}`);
        if (!card || token !== routeToken.current) return;

        scrollToElement(card, "center");

        routeTimers.current.push(
          window.setTimeout(() => {
            if (token === routeToken.current) {
              setSelectedAchievement(achievement);
            }
          }, 350),
        );
        return;
      }

      setActiveTab(route.section);

      // Closing a project or achievement returns to the card the visitor was
      // viewing; the browser restores that scroll position, so skip the jump.
      if (previous?.kind === "project" || previous?.kind === "achievement") return;

      const target = await waitForElement(SECTION_IDS[route.section]);
      if (!target || token !== routeToken.current) return;
      scrollToElement(target, "start");
    },
    [clearRouteTimers],
  );

  // Apply the initial shareable URL once the app, fonts and layout are ready.
  useEffect(() => {
    if (!isAppReady || initialRoute.kind === "home") return;

    const frame = requestAnimationFrame(() => {
      void applyRoute(initialRoute);
    });

    return () => cancelAnimationFrame(frame);
  }, [isAppReady, initialRoute, applyRoute]);

  // Browser back/forward (and manual hash edits) re-read the URL.
  useEffect(() => {
    const handleLocationChange = () => {
      const route = resolveRoute();
      const location = currentLocation();

      if (location === lastHandledLocation.current) return;
      lastHandledLocation.current = location;
      void applyRoute(route);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, [applyRoute]);

  useEffect(
    () => () => {
      clearRouteTimers();
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    },
    [clearRouteTimers],
  );

  const selectTab = (tab: Tab) => {
    cancelPendingRoute();
    setHighlightedProjectQuery(null);
    setActiveTab(tab);
    navigateToSection(tab);
    lastHandledLocation.current = currentLocation();
    lastAppliedRoute.current = { kind: "section", section: tab };
    trackEvent("select_tab", tab);
  };

  const copyEmail = () => {
    const announce = (message: string) => {
      setEmailNotice(message);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setEmailNotice(""), 2_500);
    };

    navigator.clipboard
      .writeText(MY_EMAIL)
      .then(() => {
        announce("Email address copied");
        trackEvent("copy_email");
      })
      .catch(() => {
        announce("Couldn't copy — opening your mail app");
      });
  };

  const openProject = (project: Project) => {
    cancelPendingRoute();
    setHighlightedProjectQuery(null);
    setSelectedProject(project);
    pushProjectUrl(project.query);
    projectPushed.current = true;
    lastHandledLocation.current = currentLocation();
    lastAppliedRoute.current = { kind: "project", project };
    trackEvent("open_project", project.query);
  };

  const closeProject = () => {
    cancelPendingRoute();
    setSelectedProject(null);
    setHighlightedProjectQuery(null);

    if (projectPushed.current) {
      // Let the browser walk back to the entry that opened the project.
      projectPushed.current = false;
      window.history.back();
      return;
    }

    // Directly-opened project: replace the entry so Back still leaves the site.
    replaceWithSection("projects");
    lastHandledLocation.current = currentLocation();
    lastAppliedRoute.current = { kind: "section", section: "projects" };
  };

  const openAchievement = (achievement: Achievement) => {
    cancelPendingRoute();
    setSelectedAchievement(achievement);
    pushAchievementUrl(achievement.id);
    achievementPushed.current = true;
    lastHandledLocation.current = currentLocation();
    lastAppliedRoute.current = { kind: "achievement", achievement };
    trackEvent("open_achievement", achievement.id);
  };

  const closeAchievement = () => {
    cancelPendingRoute();
    setSelectedAchievement(null);

    if (achievementPushed.current) {
      // Let the browser walk back to the entry that opened the achievement.
      achievementPushed.current = false;
      window.history.back();
      return;
    }

    // Directly-opened achievement: replace the entry so Back leaves the site.
    replaceWithSection("achievements");
    lastHandledLocation.current = currentLocation();
    lastAppliedRoute.current = { kind: "section", section: "achievements" };
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!isAppReady && <LoadingScreen />}</AnimatePresence>
      <motion.div
        className="app-root"
        initial={{ y: 8 }}
        animate={{ y: isAppReady ? 0 : 8 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        aria-busy={!isAppReady}
      >
      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-inner">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="avatar-wrap"
          >
            <div className="avatar-glow" />
            <img
              src={ProfileLogo}
              alt="Profile"
              className="avatar-img"
              width={152}
              height={152}
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="hero-text">
            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              className="hero-name"
            >
              R Dhashwin <span className="accent">Kennedy</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
              className="hero-sub"
            >
              Turning Ideas into Automated Solutions with{" "}
              <span className="accent">Python</span> .
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
            className="hero-btns"
          >
            <a
              href="https://github.com/dhashwinkennedy/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/dhashwinkennedy/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-linkedin"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href="https://www.instagram.com/dhashwin._.kennedy/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-instagram"
            >
              <Instagram size={18} /> Instagram
            </a>
            <a
              href={`mailto:${MY_EMAIL}`}
              className="btn-mail"
              onClick={copyEmail}
            >
              <Mail size={16} />
              {MY_EMAIL}
            </a>
          </motion.div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="main-content">
        {/* About Me */}
        <AboutSection about={aboutMe} />

        {/* Tab bar */}
        <div className="tab-bar-wrap">
          <div className="tab-bar" role="tablist" aria-label="Portfolio sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="tab-panel"
                onClick={() => selectTab(tab.id)}
                className={`tab-btn ${activeTab === tab.id ? "tab-btn--active" : ""}`}
              >
                <div
                  className={`tab-indicator ${activeTab === tab.id ? "active" : ""}`}
                />
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="tab-content" id="tab-panel" role="tabpanel" aria-label={activeTab}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "projects" && (
                <div className="projects-list" id="projects-section">
                  {visibleProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isHighlighted={highlightedProjectQuery === project.query}
                      onOpen={openProject}
                    />
                  ))}
                  {projects.length > PREVIEW_COUNT && (
                    <button
                      type="button"
                      className="view-all-btn"
                      onClick={() => setShowAllProjects((v) => !v)}
                    >
                      {showAllProjects
                        ? "Show Less ↑"
                        : `View All Projects (${projects.length}) ↓`}
                    </button>
                  )}
                </div>
              )}

              {activeTab === "achievements" && (
                <AchievementsSection
                  achievements={achievements}
                  onOpen={openAchievement}
                />
              )}

              {activeTab === "skills" && (
                <div className="skills-education-layout" id="skills-section">
                  <section className="skills-education-section">
                    <h2 className="skills-education-heading">Skills</h2>
                    <SkillsSection skills={skills} />
                  </section>
                  <section className="skills-education-section">
                    <h2 className="skills-education-heading">Education</h2>
                    <EducationSection education={education} />
                  </section>
                </div>
              )}

              {activeTab === "certificates" && (
                <div id="certificates-section">
                  <CertificatesSection certificates={visibleCerts} />
                  {certificates.length > PREVIEW_COUNT && (
                    <button
                      type="button"
                      className="view-all-btn"
                      onClick={() => setShowAllCerts((v) => !v)}
                    >
                      {showAllCerts
                        ? "Show Less ↑"
                        : `View All Certificates (${certificates.length}) ↓`}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CTA ── */}
        <section className="cta-section">
          <h2 className="cta-title">Open for Opportunities</h2>
          <p className="cta-sub">
            I am currently seeking new projects and professional roles. Let's
            discuss how we can work together.
          </p>
          <a
            href={`mailto:${MY_EMAIL}`}
            className="cta-btn"
            onClick={copyEmail}
          >
            <Mail size={22} /> Contact Me
          </a>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} R Dhashwin Kennedy. All rights
            reserved.
          </p>
          <div className="footer-links">
            <a
              href="https://github.com/dhashwinkennedy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/dhashwinkennedy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/dhashwin._.kennedy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProject} />
      )}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementModal
            achievement={selectedAchievement}
            onClose={closeAchievement}
          />
        )}
      </AnimatePresence>
      </motion.div>

      <div className="copy-toast" role="status" aria-live="polite">
        {emailNotice}
      </div>
    </MotionConfig>
  );
}
