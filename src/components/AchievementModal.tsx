import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Trophy, X } from "lucide-react";
import { motion } from "motion/react";
import type { Achievement } from "../constants";
import HighlightedText from "./HighlightedText";

interface Props {
  achievement: Achievement;
  onClose: () => void;
}

export default function AchievementModal({ achievement, onClose }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const images: string[] = achievement.images || [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [contentScrolled, setContentScrolled] = useState(false);
  const [canScrollMore, setCanScrollMore] = useState(false);
  const [thumbEdges, setThumbEdges] = useState({ left: false, right: false });

  const goPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (images.length === 0) return;
      setActiveImageIndex((i) => (i - 1 + images.length) % images.length);
    },
    [images.length],
  );

  const goNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (images.length === 0) return;
      setActiveImageIndex((i) => (i + 1) % images.length);
    },
    [images.length],
  );

  const scrollThumbs = (direction: -1 | 1) => {
    thumbsRef.current?.scrollBy({ left: direction * 168, behavior: "smooth" });
  };

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (event.key === "ArrowLeft") {
        goPrev();
      } else if (event.key === "ArrowRight") {
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused.current?.focus();
    };
  }, [lightboxOpen, onClose, goPrev, goNext]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => {
      setContentScrolled(el.scrollTop > 6);
      setCanScrollMore(el.scrollHeight - el.clientHeight - el.scrollTop > 8);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [achievement.id, images.length]);

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
          className="achievement-modal-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-modal-title"
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

          <header className="achievement-modal-header">
            <div className="achievement-modal-trophy" aria-hidden="true">
              <Trophy size={26} strokeWidth={1.8} />
            </div>
            <div className="achievement-modal-header-text">
              <h2 id="achievement-modal-title">{achievement.title}</h2>
            </div>
          </header>

          <div
            className={`achievement-modal-scroll-wrap${contentScrolled ? " is-scrolled" : ""}${canScrollMore ? " can-scroll-more" : ""}`}
          >
          <div className="achievement-modal-content" ref={contentRef}>
            {/* Colored design container for short description */}


            {/* Long description right below the short description */}
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
                  <p>
                    <HighlightedText text={achievement.longDescription} />
                  </p>
                </div>
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

          </div>
          </div>

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

                  <div
                    className="achievement-media-main screenshot-main screenshot-main--clickable"
                    onClick={() => setLightboxOpen(true)}
                    title="Click to expand"
                  >
                    <img
                      src={images[activeImageIndex]}
                      alt={`Photo ${activeImageIndex + 1}`}
                      className="achievement-media-preview"
                    />
                    <div className="screenshot-zoom-hint">Click to expand</div>
                    {images.length > 1 && (
                      <span className="achievement-media-count">
                        {activeImageIndex + 1} / {images.length}
                      </span>
                    )}
                  </div>

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
