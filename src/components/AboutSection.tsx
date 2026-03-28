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

/** Splits on **text** — highlighted parts get accent color, rest stays normal */
function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="accent">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
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
                  src={item.iconUrl}
                  alt={item.name}
                  className="skill-icon"
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
                  src={item.iconUrl}
                  alt={item.name}
                  className="skill-icon"
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
