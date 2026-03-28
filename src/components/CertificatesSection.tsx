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
  verifyLink: string;
  skills: Skill[];
}

interface Props {
  certificates: Certificate[];
}

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
