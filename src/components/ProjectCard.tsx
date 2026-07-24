import { motion } from "motion/react";
import type { Project } from "../constants";
import HighlightedText from "./HighlightedText";
import ShareButton from "./ShareButton";

interface Props {
  project: Project;
  isHighlighted?: boolean;
  onOpen: (project: Project) => void;
}

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9.04 15.42 8.9 19.7c.29 0 .42-.13.57-.28l2.05-1.96 4.25 3.11c.78.43 1.33.2 1.54-.72l2.79-13.07c.25-1.15-.42-1.6-1.18-1.32L2.53 11.76c-1.12.44-1.11 1.06-.19 1.34l4.19 1.31 9.73-6.14c.46-.28.88-.13.53.18L9.04 15.42Z" />
  </svg>
);

export default function ProjectCard({ project, isHighlighted = false, onOpen }: Props) {
  return (
    <motion.div
      id={`project-${project.query}`}
      initial={false}
      animate={
        isHighlighted
          ? {
              scale: [1, 1.04, 1],
              filter: ["brightness(1)", "brightness(1.06)", "brightness(1)"],
              boxShadow: [
                "0 0 0 rgba(79, 70, 229, 0)",
                "0 0 0 3px rgba(79, 70, 229, 0.24), 0 18px 48px rgba(79, 70, 229, 0.24)",
                "0 0 0 rgba(79, 70, 229, 0)",
              ],
            }
          : { scale: 1, filter: "brightness(1)", boxShadow: "0 0 0 rgba(79, 70, 229, 0)" }
      }
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div
        className="current-grid"
        onClick={() => onOpen(project)}
      >
        <div className="hover-overlay">
          <span>View Details →</span>
        </div>
        <img src={project.image} alt={project.title} className="Prj-img-pic" />
        <div className="text-right-div">
          <h2 className="h2-tag">{project.title}</h2>
          <p className="p-tag"><HighlightedText text={project.shortDesc} /></p>
          <div className="prj-link-logo-div">
            <ShareButton projectTitle={project.title} projectQuery={project.query} />
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="card-github-btn"
            >
              <GitHubIcon />
              GitHub
            </a>
            {project.telegram && (
              <a
                href={project.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="card-telegram-btn"
              >
                <TelegramIcon />
                Telegram
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
