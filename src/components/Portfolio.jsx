import React from "react";
import "../css/portfolio.scss";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import CaseStudy from "./CaseStudy";
import CardCarousel from "./CardCarousel";

const otherProjects = projects.filter((p) => p.tags.includes("project"));

const Portfolio = () => {
  return (
    <div className="main portfolio-container">
      <h1>Portfolio</h1>
      {caseStudies.map((cs, i) => (
        <CaseStudy key={cs.id} project={cs} index={i} />
      ))}
      <CardCarousel title="Other Projects" items={otherProjects} />
    </div>
  );
};

export default Portfolio;
