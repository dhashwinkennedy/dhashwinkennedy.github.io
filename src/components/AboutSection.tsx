import { localLogoUrl } from "../constants";
import HighlightedText from "./HighlightedText";

interface SkillBadge {
  name: string;
  iconUrl: string;
}

interface AboutData {
  tagline: string;
  description: string;
  coreFocus: SkillBadge[];
  areasOfInterest: SkillBadge[];
  closing: string;
}

interface Props {
  about: AboutData;
}

export default function AboutSection({ about }: Props) {
  return (
    <section className="about-section">
      <h2 className="about-heading">About Me</h2>

      {/* Tagline — same size as description but accented keywords in purple */}
      <p className="about-body">
        <HighlightedText text={about.tagline} />
      </p>

      {/* Description — same size/font, black, with selective highlights */}
      <p className="about-body">
        <HighlightedText text={about.description} />
      </p>

      <div className="about-block">
        <h3 className="about-block-title">Core Focus</h3>
        <div className="skills-wrap-container">
          {about.coreFocus.map((item, i) => (
            <div key={i} className="skill-badge">
              {item.iconUrl && (
                <img
                  src={localLogoUrl(item.iconUrl)}
                  alt={item.name}
                  className="skill-icon"
                  width={22}
                  height={22}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => event.currentTarget.remove()}
                />
              )}
              <span className="skill-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="about-block">
        <h3 className="about-block-title">Areas of Interest</h3>
        <div className="skills-wrap-container">
          {about.areasOfInterest.map((item, i) => (
            <div key={i} className="skill-badge">
              {item.iconUrl && (
                <img
                  src={localLogoUrl(item.iconUrl)}
                  alt={item.name}
                  className="skill-icon"
                  width={22}
                  height={22}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => event.currentTarget.remove()}
                />
              )}
              <span className="skill-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="about-closing">{about.closing}</p>
    </section>
  );
}
