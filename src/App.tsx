/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Grid3X3,
  Cpu,
  Bookmark,
  Mail,
  Instagram,
} from "lucide-react";

import ProfileLogo from "./assets/profile-logo.png";

import { projects, skills, certificates, aboutMe } from "./constants";
import ProjectCard from "./components/ProjectCard";
import SkillsSection from "./components/SkillsSection";
import CertificatesSection from "./components/CertificatesSection";
import AboutSection from "./components/AboutSection";

import "./app.css";

const MY_EMAIL = "dhashwinkennedy@hotmail.com";

const copyEmail = () => {
  navigator.clipboard.writeText(MY_EMAIL).catch(() => {});
};

type Tab = "projects" | "skills" | "certificates";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "projects", label: "Projects", icon: <Grid3X3 size={12} /> },
    { id: "certificates", label: "Certificates", icon: <Bookmark size={12} /> },
    { id: "skills", label: "Skills", icon: <Cpu size={12} /> },
  ];

  return (
    <div className="app-root">
      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-inner">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="avatar-wrap"
          >
            <div className="avatar-glow" />
            <img
              src={ProfileLogo}
              alt="Profile"
              className="avatar-img"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="hero-text">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hero-name"
            >
              R Dhashwin <span className="accent">Kennedy</span>
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hero-sub"
            >
              Building the future of the web with the{" "}
              <span className="accent">MERN</span> stack.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hero-btns"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-linkedin"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href="https://instagram.com"
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
          <div className="tab-bar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
        <div className="tab-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "projects" && (
                <div className="projects-list">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}

              {activeTab === "skills" && <SkillsSection skills={skills} />}

              {activeTab === "certificates" && (
                <CertificatesSection certificates={certificates} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CTA ── */}
        <section className="cta-section">
          <h2 className="cta-title">Ready to start a project?</h2>
          <p className="cta-sub">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, my inbox is always open!
          </p>
          <a
            href={`mailto:${MY_EMAIL}`}
            className="cta-btn"
            onClick={copyEmail}
          >
            <Mail size={22} /> Say Hello
          </a>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} Dhashwin Kennedy.
          </p>
          <div className="footer-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
