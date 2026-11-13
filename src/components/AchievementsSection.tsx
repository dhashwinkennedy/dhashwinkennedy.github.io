import type { Achievement } from "../constants";
import HighlightedText from "./HighlightedText";

interface Props {
  achievements: Achievement[];
  onOpen: (achievement: Achievement) => void;
}

export default function AchievementsSection({ achievements, onOpen }: Props) {
  return (
    <section className="achievements-section" aria-labelledby="achievements-heading">
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
            type="button"
            className="achievement-card"
            onClick={() => onOpen(achievement)}
            aria-label={`View details for ${achievement.title}`}
          >
            {achievement.thumbnail && (
              <div className="achievement-card-media">
                <img
                  src={achievement.thumbnail}
                  alt={achievement.title}
                  loading="lazy"
                />
              </div>
            )}
            <div className="achievement-card-body">
              <h3>{achievement.title}</h3>
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
