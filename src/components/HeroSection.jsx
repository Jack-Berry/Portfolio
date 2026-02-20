import React, { useState } from "react";

const HeroSection = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!projects || projects.length === 0) return null;

  const project = projects[selectedProject];
  const slides = project.heroSlides;

  const handleProjectSelect = (index) => {
    setSelectedProject(index);
    setCurrentSlide(0);
  };

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slides.length - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slides.length - 1 ? 0 : s + 1));
  };

  return (
    <div className="hero-container">
      {projects.length > 1 && (
        <div className="hero-tabs">
          {projects.map((p, i) => (
            <button
              key={p.id}
              className={`hero-tab${i === selectedProject ? " active" : ""}`}
              onClick={() => handleProjectSelect(i)}
            >
              {p.title}
            </button>
          ))}
        </div>
      )}

      <h2>{project.title}</h2>

      <div className="hero-carousel">
        <button className="hero-nav" onClick={prevSlide} aria-label="Previous slide">
          Previous
        </button>
        <div className="hero-slide">
          <img src={slides[currentSlide].img} alt={project.title} />
          <p>{slides[currentSlide].description}</p>
        </div>
        <button className="hero-nav" onClick={nextSlide} aria-label="Next slide">
          Next
        </button>
      </div>

      <div className="hero-slide-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === currentSlide ? " active" : ""}`}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero-buttons">
        {project.live && (
          <button className="view" onClick={() => window.open(project.live)}>
            View
          </button>
        )}
        {project.github && (
          <button className="front" onClick={() => window.open(project.github)}>
            {project.githubBack ? "Front-end" : "Repo"}
          </button>
        )}
        {project.githubBack && (
          <button className="backend" onClick={() => window.open(project.githubBack)}>
            Back-end
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
