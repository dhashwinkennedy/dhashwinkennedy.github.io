import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import useModalA11y from "../hooks/useModalA11y";
import { projectPath } from "../lib/routing";

interface Props {
  projectTitle: string;
  projectQuery: string;
  onClose: () => void;
}

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="8" y="8" width="12" height="12" rx="2.5" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 13 4 4L19 7" />
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

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.05-.52-.1-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.89 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.49-8.42Z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.25 6.93 6.06-6.93Zm-1.29 19.49h2.04L6.49 3.24H4.3l13.31 17.4Z" />
  </svg>
);

export default function SharePopup({ projectTitle, projectQuery, onClose }: Props) {
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const copyResetTimer = useRef<number | undefined>(undefined);

  const shareUrl = useMemo(
    () => new URL(projectPath(projectQuery), window.location.origin).toString(),
    [projectQuery],
  );

  const shareText = `Check out ${projectTitle}`;
  const whatsappText = `${shareText} ${shareUrl}`;
  const xShareUrl = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

  const dialogRef = useModalA11y<HTMLElement>({
    initialFocusRef: closeButtonRef,
    onEscape: onClose,
  });

  useEffect(
    () => () => {
      if (copyResetTimer.current) window.clearTimeout(copyResetTimer.current);
    },
    [],
  );

  const copyLink = async (message = "Link copied!") => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setNotice(message);
      setCopied(true);
      if (copyResetTimer.current) window.clearTimeout(copyResetTimer.current);
      copyResetTimer.current = window.setTimeout(() => setCopied(false), 2_000);
    } catch {
      // Clipboard permission can be denied; let the visitor copy manually.
      setCopied(false);
      const input = document.getElementById("share-project-link") as HTMLInputElement | null;
      input?.focus();
      input?.select();
      setNotice("Copy failed — select the link and press Ctrl+C.");
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
      <section
        ref={dialogRef}
        className="share-modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        tabIndex={-1}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="share-modal-close"
          onClick={onClose}
          aria-label="Close share dialog"
        >
          <CloseIcon />
        </button>
        <p className="share-modal-eyebrow">SHARE PROJECT</p>
        <h2 id="share-modal-title">Share {projectTitle}</h2>
        <p className="share-modal-description">Send this project directly to your network.</p>

        <div className="share-modal-options">
          <a
            className="share-modal-option share-modal-option--instagram"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleInstagram}
          >
            <span><InstagramIcon /></span>
            Instagram
          </a>
          <a
            className="share-modal-option share-modal-option--whatsapp"
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span><WhatsAppIcon /></span>
            WhatsApp
          </a>
          <a
            className="share-modal-option share-modal-option--telegram"
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span><TelegramIcon /></span>
            Telegram
          </a>
          <a
            className="share-modal-option share-modal-option--x"
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span><XIcon /></span>
            X
          </a>
          <a
            className="share-modal-option share-modal-option--linkedin"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span><LinkedInIcon /></span>
            LinkedIn
          </a>
        </div>

        <div className="share-modal-copy">
          <label htmlFor="share-project-link">Project link</label>
          <div className="share-modal-copy-row">
            <input id="share-project-link" value={shareUrl} readOnly aria-label="Project link" />
            <button
              type="button"
              className={`share-modal-copy-btn${copied ? " is-copied" : ""}`}
              onClick={() => void copyLink()}
              aria-label={copied ? "Project link copied" : "Copy project link"}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
          <p className="share-modal-notice" role="status" aria-live="polite">
            {notice}
          </p>
        </div>
      </section>
    </div>,
    document.body,
  );
}
