import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

interface Options {
  /** Escape is delegated to the caller so nested dialogs can close the topmost one. */
  onEscape: () => void;
  /** Element focused when the dialog opens. Falls back to the container. */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Shared dialog behaviour: locks body scroll, traps Tab inside the container,
 * calls `onEscape` for the Escape key and restores the previous focus on close.
 */
export default function useModalA11y<T extends HTMLElement>({
  onEscape,
  initialFocusRef,
}: Options) {
  const containerRef = useRef<T | null>(null);
  const escapeRef = useRef(onEscape);

  useEffect(() => {
    escapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    (initialFocusRef?.current ?? containerRef.current)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        escapeRef.current();
        return;
      }

      if (event.key !== "Tab" || !containerRef.current) return;

      const focusable = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => element.offsetParent !== null || element === document.activeElement);

      if (focusable.length === 0) {
        event.preventDefault();
        containerRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === containerRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [initialFocusRef]);

  return containerRef;
}
