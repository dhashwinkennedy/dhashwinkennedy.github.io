import { CalendarDays } from "lucide-react";
import type { Achievement } from "../constants";
import HighlightedText from "./HighlightedText";
import PlacementBadge from "./PlacementBadge";

interface Props {
  achievements: Achievement[];
  onOpen: (achievement: Achievement) => void;
}

export default function AchievementsSection({ achievements, onOpen }: Props) {
  return (
    <section
      className="achievements-section"
      id="achievements-section"
      aria-labelledby="achievements-heading"
    >
      <div className="achievements-heading-wrap">
        <h2 id="achievements-heading" className="achievements-heading">
          Achievements &amp; Awards
        </h2>
        <p>Milestones, recognitions and victories that reflect my journey.</p>
      </div>

      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <button
            key={achievement.id}
            id={`achievement-${achievement.id}`}
            type="button"
            className="achievement-card"
            onClick={() => onOpen(achievement)}
            aria-labelledby={`achievement-title-${achievement.id}`}
          >
            {achievement.thumbnail && (
              <div className="achievement-card-media">
                <img
                  src={achievement.thumbnail}
                  alt={achievement.title}
                  loading="lazy"
                />
                <PlacementBadge
                  rank={achievement.rank}
                  tag={achievement.tag}
                  className="achievement-card-badge-overlay"
                />
              </div>
            )}
            <div className="achievement-card-body">
              {!achievement.thumbnail && (
                <div className="achievement-card-top-badge">
                  <PlacementBadge rank={achievement.rank} tag={achievement.tag} />
                </div>
              )}
              <div className="achievement-card-header">
                <h3 id={`achievement-title-${achievement.id}`}>{achievement.title}</h3>
                {achievement.date && (
                  <span className="achievement-card-date">
                    <CalendarDays size={12} aria-hidden="true" />
                    <span>{achievement.date}</span>
                  </span>
                )}
              </div>
              {achievement.shortDescription && (
                <p className="achievement-card-desc">
                  <HighlightedText text={achievement.shortDescription} />
                </p>
              )}
              <span className="achievement-view-hint">Click to view details →</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
