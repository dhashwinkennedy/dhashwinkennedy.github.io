import { GraduationCap } from "lucide-react";
import type { Education } from "../constants";

interface Props {
  education: Education[];
}

export default function EducationSection({ education }: Props) {
  return (
    <div className="education-list">
      {education.map((entry, index) => (
        <article key={`${entry.institute}-${index}`} className="education-card">
          <div className="education-logo" aria-hidden="true">
            {entry.logo ? (
              <img src={entry.logo} alt="" />
            ) : (
              <GraduationCap size={22} />
            )}
          </div>
          <div className="education-details">
            <h3>{entry.institute}</h3>
            <p>{entry.field}</p>
            <span>{entry.duration}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
