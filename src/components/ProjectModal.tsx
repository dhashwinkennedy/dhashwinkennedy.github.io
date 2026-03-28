import { useState } from "react";

interface Skill {
  name: string;
  iconUrl: string;
}

interface Project {
  id: number;
  image: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  github: string;
  live: string;
  screenshots: string[];
  skills: Skill[];
}

interface Props {
  project: Project;
  onClose: () => void;
}

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function ProjectModal({ project, onClose }: Props) {
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="modal-body">
          {/* ── LEFT PANEL ── */}
          <div className="modal-left">
            <img
              src={project.image}
              alt={project.title}
              className="modal-img"
            />
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-desc">{project.longDesc}</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-github-btn"
            >
              <GitHubIcon />
              View on GitHub
            </a>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="modal-right">
            <h3 className="modal-section-title">Key Skills</h3>
            <div className="skills-wrap-container">
              {project.skills.map((skill, i) => (
                <div key={i} className="skill-badge">
                  {skill.iconUrl && (
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="skill-icon"
                    />
                  )}
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>

            {project.screenshots && project.screenshots.length > 0 && (
              <div className="modal-screenshots">
                <h3 className="modal-section-title">Screenshots</h3>
                <div className="screenshot-main">
                  <img
                    src={project.screenshots[activeScreenshot]}
                    alt={`Screenshot ${activeScreenshot + 1}`}
                    className="screenshot-preview"
                  />
                </div>
                {project.screenshots.length > 1 && (
                  <div className="screenshot-thumbs">
                    {project.screenshots.map((src, i) => (
                      <button
                        key={i}
                        className={`screenshot-thumb ${i === activeScreenshot ? "active" : ""}`}
                        onClick={() => setActiveScreenshot(i)}
                      >
                        <img src={src} alt={`Thumb ${i + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="modal-extra-section" />
          </div>
        </div>
      </div>
    </div>
  );
}
