import { useCallback, useEffect, useRef, useState } from "react";
import { localLogoUrl, type Project } from "../constants";
import useModalA11y from "../hooks/useModalA11y";
import HighlightedText from "./HighlightedText";
import ShareButton from "./ShareButton";

interface Props {
  project: Project;
  onClose: () => void;
}

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9.04 15.42 8.9 19.7c.29 0 .42-.13.57-.28l2.05-1.96 4.25 3.11c.78.43 1.33.2 1.54-.72l2.79-13.07c.25-1.15-.42-1.6-1.18-1.32L2.53 11.76c-1.12.44-1.11 1.06-.19 1.34l4.19 1.31 9.73-6.14c.46-.28.88-.13.53.18L9.04 15.42Z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function ProjectModal({ project, onClose }: Props) {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxOpenRef = useRef(lightboxOpen);
  useEffect(() => {
    lightboxOpenRef.current = lightboxOpen;
  }, [lightboxOpen]);

  const totalScreenshots = project.screenshots.length;

  const goPrev = useCallback(() => {
    if (totalScreenshots === 0) return;
    setActiveScreenshot((i) => (i - 1 + totalScreenshots) % totalScreenshots);
  }, [totalScreenshots]);

  const goNext = useCallback(() => {
    if (totalScreenshots === 0) return;
    setActiveScreenshot((i) => (i + 1) % totalScreenshots);
  }, [totalScreenshots]);

  const dialogRef = useModalA11y<HTMLDivElement>({
    initialFocusRef: closeButtonRef,
    onEscape: () => {
      if (lightboxOpenRef.current) {
        setLightboxOpen(false);
      } else {
        onClose();
      }
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext]);

  return (
    <>
      {/* ── PROJECT MODAL ── */}
      <div className="modal-backdrop" onClick={onClose}>
        <div
          ref={dialogRef}
          className="modal-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          tabIndex={-1}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close project details"
          >
            ✕
          </button>

          <div className="modal-body">
            {/* ── LEFT PANEL ── */}
            <div className="modal-left">
              <img
                src={project.image}
                alt={project.title}
                className="modal-img"
                width={320}
                height={320}
                decoding="async"
              />
              <h2 id="project-modal-title" className="modal-title">{project.title}</h2>
              <p className="modal-desc"><HighlightedText text={project.longDesc} /></p>

              {/* ── DEVELOPED ON ── */}
              {project.date && (
                <div className="modal-date">
                  <CalendarIcon />
                  <span>
                    <span className="modal-date-label">Developed on: </span>
                    {project.date}
                  </span>
                </div>
              )}

              <div className="modal-project-actions">
                <ShareButton projectTitle={project.title} projectQuery={project.query} />
                <div className="modal-project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-github-btn"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                  {project.telegram && (
                    <a
                      href={project.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-telegram-btn"
                    >
                      <TelegramIcon />
                      Telegram
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="modal-right">
              <h3 className="modal-section-title">Key Skills</h3>
              <div className="skills-wrap-container">
                {project.skills.map((skill, i) => (
                  <div key={i} className="skill-badge">
                    {skill.iconUrl && (
                      <img
                        src={localLogoUrl(skill.iconUrl)}
                        alt={skill.name}
                        className="skill-icon"
                        width={22}
                        height={22}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => event.currentTarget.remove()}
                      />
                    )}
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>

              {totalScreenshots > 0 && (
                <div className="modal-screenshots">
                  <h3 className="modal-section-title">Screenshots</h3>

                  {/* Main preview — click or press Enter to open the lightbox */}
                  <button
                    type="button"
                    className="screenshot-main screenshot-main--clickable"
                    onClick={() => setLightboxOpen(true)}
                    title="Click to enlarge"
                    aria-label={`Enlarge screenshot ${activeScreenshot + 1} of ${totalScreenshots}`}
                  >
                    <img
                      src={project.screenshots[activeScreenshot]}
                      alt={`Screenshot ${activeScreenshot + 1} of ${project.title}`}
                      className="screenshot-preview"
                      width={1600}
                      height={850}
                      decoding="async"
                    />
                    <span className="screenshot-zoom-hint" aria-hidden="true">
                      🔍 Click to enlarge
                    </span>
                  </button>

                  {totalScreenshots > 1 && (
                    <div className="screenshot-thumbs">
                      {project.screenshots.map((src, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`screenshot-thumb ${i === activeScreenshot ? "active" : ""}`}
                          onClick={() => setActiveScreenshot(i)}
                          aria-label={`Show screenshot ${i + 1}`}
                          aria-current={i === activeScreenshot ? "true" : undefined}
                        >
                          <img
                            src={src}
                            alt=""
                            width={72}
                            height={48}
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="modal-extra-section" />

              {/* Warning banner — only shown if project has a warning */}
              {project.warning && (
                <div className="modal-warning">
                  <span className="modal-warning-icon" aria-hidden="true">⚠️</span>
                  <p className="modal-warning-text">{project.warning}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded screenshot viewer"
        >
          <div className="lightbox-box" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close screenshot viewer"
            >
              ✕
            </button>

            {totalScreenshots > 1 && (
              <button
                type="button"
                className="lightbox-arrow lightbox-arrow--prev"
                onClick={goPrev}
                aria-label="Previous screenshot"
              >
                ‹
              </button>
            )}

            <img
              src={project.screenshots[activeScreenshot]}
              alt={`Screenshot ${activeScreenshot + 1} of ${project.title}`}
              className="lightbox-img"
              decoding="async"
            />

            {totalScreenshots > 1 && (
              <button
                type="button"
                className="lightbox-arrow lightbox-arrow--next"
                onClick={goNext}
                aria-label="Next screenshot"
              >
                ›
              </button>
            )}

            {totalScreenshots > 1 && (
              <div className="lightbox-counter">
                {activeScreenshot + 1} / {totalScreenshots}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
