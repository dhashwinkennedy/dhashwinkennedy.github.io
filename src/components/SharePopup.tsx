import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

interface Props {
  projectTitle: string;
  projectQuery: string;
  onClose: () => void;
}

const CopyIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-6.4L6.46 22H3.34l7.25-8.3L2.94 2h6.4l4.43 5.86L18.9 2Zm-1.1 18h1.72L8.4 3.9H6.55L17.8 20Z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.5 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.4l1.4-4.8A8.4 8.4 0 1 1 20.5 11.5Z" />
    <path d="M9 7.5c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.6 1.4c.1.2.1.4 0 .6l-.4.6c.6 1.2 1.5 2.1 2.7 2.7l.6-.4c.2-.1.4-.1.6 0l1.4.6c.3.1.4.3.4.5v.4c0 .3 0 .5-.4.7-.5.2-1.2.3-2.2-.1-2.5-1-4.6-3.1-5.6-5.6-.4-1-.3-1.7-.1-2.2Z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9.04 15.42 8.9 19.7c.29 0 .42-.13.57-.28l2.05-1.96 4.25 3.11c.78.43 1.33.2 1.54-.72l2.79-13.07c.25-1.15-.42-1.6-1.18-1.32L2.53 11.76c-1.12.44-1.11 1.06-.19 1.34l4.19 1.31 9.73-6.14c.46-.28.88-.13.53.18L9.04 15.42Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M5.1 3.5A2.1 2.1 0 1 1 5.1 7.7a2.1 2.1 0 0 1 0-4.2ZM3.3 9h3.6v11.5H3.3V9Zm5.8 0h3.4v1.6h.1c.5-.9 1.6-2 3.8-2 4.1 0 4.8 2.7 4.8 6.2v5.7h-3.6v-5c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8v5.1H9.1V9Z" />
  </svg>
);

export default function SharePopup({ projectTitle, projectQuery, onClose }: Props) {
  const [notice, setNotice] = useState("");
  const url = new URL("https://dhashwinkennedy.me/");
  url.searchParams.set("project", projectQuery);
  const shareUrl = url.toString();
  const shareText = `Check out ${projectTitle}`;

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const copyLink = async (message = "Link copied!") => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setNotice(message);
    } catch {
      window.prompt("Copy this project link", shareUrl);
    }
  };

  const handleInstagram = () => {
    void copyLink("Link copied — paste it in Instagram.");
  };

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className="share-modal-backdrop" onClick={closeFromBackdrop}>
      <section className="share-modal-box" role="dialog" aria-modal="true" aria-labelledby="share-modal-title">
        <button type="button" className="share-modal-close" onClick={onClose} aria-label="Close share dialog">
          <CloseIcon />
        </button>
        <p className="share-modal-eyebrow">SHARE PROJECT</p>
        <h2 id="share-modal-title">Share {projectTitle}</h2>
        <p className="share-modal-description">Send this project directly to your network.</p>

        <div className="share-modal-options">
          <a className="share-modal-option share-modal-option--instagram" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" onClick={handleInstagram}>
            <span><InstagramIcon /></span>
            Instagram
          </a>
          <a className="share-modal-option share-modal-option--x" href={`https://x.com/intent/post?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">
            <span><XIcon /></span>
            X
          </a>
          <a className="share-modal-option share-modal-option--whatsapp" href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer">
            <span><WhatsAppIcon /></span>
            WhatsApp
          </a>
          <a className="share-modal-option share-modal-option--telegram" href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">
            <span><TelegramIcon /></span>
            Telegram
          </a>
          <a className="share-modal-option share-modal-option--linkedin" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
            <span><LinkedInIcon /></span>
            LinkedIn
          </a>
        </div>

        <div className="share-modal-copy">
          <label htmlFor="share-project-link">Project link</label>
          <div className="share-modal-copy-row">
            <input id="share-project-link" value={shareUrl} readOnly aria-label="Project link" />
            <button type="button" onClick={() => void copyLink()} aria-label="Copy project link">
              <CopyIcon />
              {notice || "Copy"}
            </button>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}
