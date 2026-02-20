import React from "react";
import "../css/portfolio.scss";
import { projects } from "../data/projects";
import HeroSection from "./HeroSection";
import CardCarousel from "./CardCarousel";

const heroProjects = projects.filter((p) => p.tags.includes("hero"));
const featuredProjects = projects.filter((p) => p.tags.includes("featured"));
const projectWork = projects.filter((p) => p.tags.includes("project"));

const Portfolio = () => {
  return (
    <div className="main portfolio-container">
      <h1>Portfolio</h1>
      <HeroSection projects={heroProjects} />
      <CardCarousel title="Live Websites" items={featuredProjects} />
      <CardCarousel title="Project Work" items={projectWork} />
    </div>
  );
};

export default Portfolio;
