import React, { useState } from "react";
import "../css/caseStudy.scss";

function StackBadges({ items, max = 7 }) {
  const visible = items.slice(0, max);
  const extra = items.length - max;
  return (
    <span className="case-study__badge-row">
      {visible.map((item, i) => (
        <span key={i} className="case-study__badge">{item}</span>
      ))}
      {extra > 0 && <span className="case-study__badge case-study__badge--more">+{extra}</span>}
    </span>
  );
}

const CaseStudy = ({ project, index }) => {
  const [showHighlights, setShowHighlights] = useState(false);
  const isReversed = index % 2 === 1;

  const scaleEntries = Object.entries(project.scale).filter(([k]) => k !== "status");
  const statusText = project.scale.status || null;

  return (
    <div className={`case-study case-study--${project.colour}`}>
      {/* Decorative index number */}
      <span className="case-study__index" aria-hidden="true">
        0{index + 1}
      </span>

      {/* Header: title + buttons */}
      <div className="case-study__header">
        <h2 className="case-study__title">{project.title}</h2>
        <div className="case-study__buttons">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__btn"
            >
              Live Site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__btn"
            >
              GitHub
            </a>
          )}
          {project.githubBack && (
            <a
              href={project.githubBack}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__btn"
            >
              GitHub (BE)
            </a>
          )}
        </div>
      </div>

      <p className="case-study__tagline">{project.tagline}</p>

      <div className={`case-study__body${isReversed ? " case-study__body--reversed" : ""}`}>
        {/* Image or placeholder */}
        <div className="case-study__image">
          {project.img ? (
            <img src={project.img} alt={project.title} />
          ) : (
            <div className="case-study__img-placeholder">
              <span>{project.title.split(" ").map((w) => w[0]).join("").slice(0, 4)}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="case-study__content">
          <p className="case-study__description">{project.description}</p>

          <h3 className="case-study__section-heading">Key Features</h3>
          <ul className="case-study__features">
            {project.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          {project.highlights && project.highlights.length > 0 && (
            <div className="case-study__highlights-section">
              <button
                className="case-study__toggle-btn"
                onClick={() => setShowHighlights((v) => !v)}
              >
                {showHighlights ? "▲" : "▼"} Technical Highlights
              </button>
              {showHighlights && (
                <ul className="case-study__highlights">
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer: stack + scale */}
      <div className="case-study__footer">
        <div className="case-study__stack">
          {Object.entries(project.stack).map(([category, items]) => (
            <div key={category} className="case-study__stack-row">
              <span className="case-study__stack-label">{category}</span>
              <StackBadges items={items} />
            </div>
          ))}
        </div>

        {(scaleEntries.length > 0 || statusText) && (
          <div className="case-study__scale">
            {scaleEntries.length > 0 && (
              <div className="case-study__stats">
                {scaleEntries.map(([k, v]) => (
                  <div key={k} className="case-study__stat">
                    <strong>{v}</strong>
                    <span>{k.replace(/_/g, " ")}</span>
                  </div>
                ))}
              </div>
            )}
            {statusText && <em className="case-study__status">{statusText}</em>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudy;
