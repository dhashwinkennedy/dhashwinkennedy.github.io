interface SkillGroup {
  category: string;
  items: string[];
  icon: React.ReactNode;
}

interface Props {
  skills: SkillGroup[];
}

export default function SkillsSection({ skills }: Props) {
  return (
    <div className="skills-grid">
      {skills.map((skill, index) => (
        <div key={index} className="skill-card">
          <div className="skill-card-icon">{skill.icon}</div>
          <h3 className="skill-card-title">{skill.category}</h3>
          <ul className="skill-card-list">
            {skill.items.map((item, i) => (
              <li key={i} className="skill-card-item">
                <div className="skill-card-dot" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
