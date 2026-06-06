interface Skill {
  name: string;
  iconUrl: string;
}

interface Certificate {
  id: number;
  image: string;
  imageClass: string;
  title: string;
  description: string;
  issuer: string;
  date: string;          // ← new field
  verifyLink: string;
  skills: Skill[];
}

interface Props {
  certificates: Certificate[];
}

const CalendarIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function CertificatesSection({ certificates }: Props) {
  return (
    <div className="certs-list">
      {certificates.map((cert) => (
        <div key={cert.id} className="current-grid cert-card">
          <img
            src={cert.image}
            alt={cert.title}
            className={`Certificate-img-pic ${cert.imageClass}`}
          />
          <div className="text-right-div">
            <h2 className="h2-tag">{cert.title}</h2>
            <p className="p-tag">{cert.description}</p>
            <p className="p2-tag">Issued by: {cert.issuer}</p>

            <div className="skills-wrap-container cert-skills">
              {cert.skills.map((skill, i) => (
                <div key={i} className="skill-badge">
                  {skill.iconUrl && (
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="skill-icon"
                    />
                  )}
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>

            {/* ── ISSUED ON ── */}
            {cert.date && (
              <div className="cert-date">
                <CalendarIcon />
                <span>
                  <span className="cert-date-label">Issued on: </span>
                  {cert.date}
                </span>
              </div>
            )}

            <div className="btn-container">
              <a
                href={cert.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="verify-btn">Verify Certificate</button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}