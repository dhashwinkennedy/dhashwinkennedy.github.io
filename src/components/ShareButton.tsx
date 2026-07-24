import { useState, type MouseEvent } from "react";
import SharePopup from "./SharePopup";

interface Props {
  projectTitle: string;
  projectQuery: string;
}

const ShareIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 10.5 6.8-4" />
    <path d="m8.6 13.5 6.8 4" />
  </svg>
);

export default function ShareButton({ projectTitle, projectQuery }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const stopPropagation = (event: MouseEvent<HTMLElement>) => event.stopPropagation();

  return (
    <div className="share-control" onClick={stopPropagation}>
      <button
        type="button"
        className="share-trigger-btn"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(true);
        }}
        aria-haspopup="dialog"
      >
        <ShareIcon />
        Share
      </button>

      {isOpen && <SharePopup projectTitle={projectTitle} projectQuery={projectQuery} onClose={() => setIsOpen(false)} />}
    </div>
  );
}
