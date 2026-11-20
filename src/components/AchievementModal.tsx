import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, ExternalLink, Github, MapPin, Trophy, Users, X } from "lucide-react";
import { motion } from "motion/react";
import type { Achievement } from "../constants";
import useModalA11y from "../hooks/useModalA11y";
import DescriptionText from "./DescriptionText";
import HighlightedText from "./HighlightedText";
import PlacementBadge from "./PlacementBadge";

interface Props {
  achievement: Achievement;
  onClose: () => void;
}

type EventDetailIcon = "date" | "place";

interface EventDetailRow {
  label: string;
  value?: string;
  icon?: EventDetailIcon;
}

interface FilledEventDetailRow extends EventDetailRow {
  value: string;
}

/**
 * Keeps the event block reusable for any kind of entry — hackathon, competition,
 * conference, workshop — by dropping every detail the achievement does not define.
 * Nothing is hardcoded to a specific event, so blank rows never render.
 */
const buildEventRows = (rows: EventDetailRow[]): FilledEventDetailRow[] =>
  rows.filter((row): row is FilledEventDetailRow =>
    Boolean(row.value && row.value.trim().length > 0),
  );

export default function AchievementModal({ achievement, onClose }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const images: string[] = achievement.images || [];
  const members = achievement.teamMembers ?? [];
  const eventRows = buildEventRows([
    { label: "Event", value: achievement.eventName },
    { label: "Organised by", value: achievement.organizedBy },
    { label: "Date", value: achievement.date, icon: "date" },
    { label: "Place", value: achievement.place, icon: "place" },
  ]);
  const showTeam = Boolean(achievement.teamName) || members.length > 0;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [thumbEdges, setThumbEdges] = useState({ left: false, right: false });

  const lightboxOpenRef = useRef(lightboxOpen);
  useEffect(() => {
    lightboxOpenRef.current = lightboxOpen;
  }, [lightboxOpen]);

  const dialogRef = useModalA11y<HTMLElement>({
    initialFocusRef: closeButtonRef,
    onEscape: () => {
      if (lightboxOpenRef.current) {
        setLightboxOpen(false);
      } else {
        onClose();
      }
    },
  });

  const goPrev = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      if (images.length === 0) return;
      setActiveImageIndex((i) => (i - 1 + images.length) % images.length);
    },
    [images.length, setActiveImageIndex],
  );

  const goNext = useCallback(
    (e?: MouseEvent) => {
      e?.stopPropagation();
      if (images.length === 0) return;
      setActiveImageIndex((i) => (i + 1) % images.length);
    },
    [images.length, setActiveImageIndex],
  );

  const scrollThumbs = (direction: -1 | 1) => {
    thumbsRef.current?.scrollBy({ left: direction * 168, behavior: "smooth" });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  useEffect(() => {
    const strip = thumbsRef.current;
    if (!strip) return;

    const update = () => {
      setThumbEdges({
        left: strip.scrollLeft > 4,
        right: strip.scrollLeft + strip.clientWidth < strip.scrollWidth - 4,
      });
    };

    update();
    strip.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(strip);
    return () => {
      strip.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [images.length]);

  useEffect(() => {
    const strip = thumbsRef.current;
    const active = strip?.querySelector<HTMLElement>(".screenshot-thumb.active");
    if (!strip || !active) return;
    const left = active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2;
    strip.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeImageIndex]);

  return (
    <>
      <motion.div
        className="achievement-modal-backdrop"
        onMouseDown={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <motion.section
          ref={dialogRef}
          className="achievement-modal-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-modal-title"
          tabIndex={-1}
          onMouseDown={(event) => event.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <button
            ref={closeButtonRef}
            className="achievement-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close achievement details"
          >
            <X size={18} />
          </button>

          <div className="achievement-modal-scroll-wrap">
            <header className="achievement-modal-header">
              <div className="achievement-modal-trophy" aria-hidden="true">
                <Trophy size={26} strokeWidth={1.8} />
              </div>
              <div className="achievement-modal-header-text">
                <div className="achievement-modal-title-row">
                  <h2 id="achievement-modal-title">{achievement.title}</h2>
                  <PlacementBadge rank={achievement.rank} tag={achievement.tag} />
                </div>
              </div>
            </header>

            <div className="achievement-modal-content">
              {/* Event details — any event type, blank rows are skipped */}
              {(eventRows.length > 0 || showTeam) && (
                <div className="achievement-event">
                  {eventRows.length > 0 && (
                    <dl className="achievement-event-list">
                      {eventRows.map((row) => (
                        <div key={row.label} className="achievement-event-row">
                          <dt>{row.label}</dt>
                          <dd>
                            {row.icon === "date" && <CalendarDays size={14} aria-hidden="true" />}
                            {row.icon === "place" && <MapPin size={14} aria-hidden="true" />}
                            <span>{row.value}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {/* Optional team members — each name links out when a url is set */}
                  {showTeam && (
                    <div className="achievement-team">
                      <h3 className="achievement-section-title">
                        <Users size={15} aria-hidden="true" />
                        {achievement.teamName ? `Team ${achievement.teamName}` : "Team"}
                      </h3>
                      {members.length > 0 && (
                        <ul className="achievement-team-members">
                          {members.map((member) => (
                            <li key={`${member.name}-${member.url ?? ""}`}>
                              {member.url ? (
                                <a href={member.url} target="_blank" rel="noopener noreferrer">
                                  {member.name}
                                  <ExternalLink size={11} aria-hidden="true" />
                                </a>
                              ) : (
                                member.name
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Long description right below the event details */}
              {achievement.longDescription && (
                <div className="achievement-long-desc-section">
                  <h3 className="achievement-section-title">Description</h3>
                  {achievement.shortDescription && (
                    <div className="achievement-short-desc-card">
                      <p className="achievement-short-desc-text">
                        <HighlightedText text={achievement.shortDescription} />
                      </p>
                    </div>
                  )}
                  <div className="achievement-long-desc-text">
                    <DescriptionText text={achievement.longDescription} />
                  </div>
                </div>
              )}

              {/* Optional GitHub Repository Card */}
              {achievement.github && (
                <div className="achievement-github-section">
                  <a
                    href={achievement.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="achievement-github-card"
                    aria-label={`Open repository ${achievement.github.repoName} on GitHub`}
                  >
                    <div className="achievement-github-card-header">
                      <div className="achievement-github-repo-title">
                        <Github size={17} className="achievement-github-icon" aria-hidden="true" />
                        <span className="achievement-github-repo-name">
                          {achievement.github.repoName}
                        </span>
                        <span className="achievement-github-badge">Public</span>
                      </div>
                      <ExternalLink size={14} className="achievement-github-arrow" aria-hidden="true" />
                    </div>
                    {achievement.github.description && (
                      <p className="achievement-github-desc">
                        {achievement.github.description}
                      </p>
                    )}
                  </a>
                </div>
              )}

              {/* Project / External Links */}
              {achievement.links && achievement.links.length > 0 && (
                <div className="achievement-links-section">
                  <h3 className="achievement-section-title">Links</h3>
                  <div className="achievement-links">
                    {achievement.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.type === "github" ? (
                          <Github size={15} />
                        ) : (
                          <ExternalLink size={15} />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {images.length > 0 && (
                <div className="achievement-media-dock">
                  <h3 className="achievement-section-title">Photos &amp; certificates</h3>
                  <div className="achievement-media-stage">
                    {images.length > 1 && (
                      <button
                        type="button"
                        className="achievement-media-nav achievement-media-nav--prev"
                        onClick={goPrev}
                        aria-label="Previous photo"
                      >
                        <ChevronLeft size={18} />
                      </button>
                    )}

                    <button
                      type="button"
                      className="achievement-media-main screenshot-main screenshot-main--clickable"
                      onClick={() => setLightboxOpen(true)}
                      title="Click to expand"
                      aria-label={`Expand photo ${activeImageIndex + 1} of ${images.length}`}
                    >
                      <img
                        src={images[activeImageIndex]}
                        alt={`Photo ${activeImageIndex + 1} of ${achievement.title}`}
                        className="achievement-media-preview"
                        decoding="async"
                      />
                      <span className="screenshot-zoom-hint" aria-hidden="true">Click to expand</span>
                      {images.length > 1 && (
                        <span className="achievement-media-count">
                          {activeImageIndex + 1} / {images.length}
                        </span>
                      )}
                    </button>

                    {images.length > 1 && (
                      <button
                        type="button"
                        className="achievement-media-nav achievement-media-nav--next"
                        onClick={goNext}
                        aria-label="Next photo"
                      >
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </div>

                  {images.length > 1 && (
                    <div
                      className={`achievement-thumb-rail${thumbEdges.left ? " can-left" : ""}${thumbEdges.right ? " can-right" : ""}`}
                    >
                      {thumbEdges.left && (
                        <button
                          type="button"
                          className="achievement-thumb-scroll achievement-thumb-scroll--left"
                          onClick={() => scrollThumbs(-1)}
                          aria-label="Scroll photos left"
                        >
                          <ChevronLeft size={16} />
                        </button>
                      )}
                      <div className="achievement-thumb-scroller" ref={thumbsRef}>
                        {images.map((src, i) => (
                          <button
                            key={src}
                            type="button"
                            className={`screenshot-thumb ${i === activeImageIndex ? "active" : ""}`}
                            onClick={() => setActiveImageIndex(i)}
                            aria-label={`View photo ${i + 1}`}
                            aria-current={i === activeImageIndex ? "true" : undefined}
                          >
                            <img src={src} alt="" />
                          </button>
                        ))}
                      </div>
                      {thumbEdges.right && (
                        <button
                          type="button"
                          className="achievement-thumb-scroll achievement-thumb-scroll--right"
                          onClick={() => scrollThumbs(1)}
                          aria-label="Scroll photos right"
                        >
                          <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </motion.div>

      {/* Expanded Lightbox */}
      {lightboxOpen && images.length > 0 && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded photo viewer"
        >
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close photo viewer"
            >
              ✕
            </button>

            {images.length > 1 && (
              <button
                type="button"
                className="lightbox-arrow lightbox-arrow--prev"
                onClick={goPrev}
                aria-label="Previous photo"
              >
                ‹
              </button>
            )}

            <img
              src={images[activeImageIndex]}
              alt={`Photo ${activeImageIndex + 1}`}
              className="lightbox-img"
            />

            {images.length > 1 && (
              <button
                type="button"
                className="lightbox-arrow lightbox-arrow--next"
                onClick={goNext}
                aria-label="Next photo"
              >
                ›
              </button>
            )}

            {images.length > 1 && (
              <div className="lightbox-counter">
                {activeImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
