import React, { useState, useRef, useLayoutEffect } from "react";
import Item from "./Item";

const COLOUR_VARIANTS = ["item-a", "item-b", "item-c", "item-d", "item-e"];

// Greedy circular colour assignment: guarantees no two items within distance 2
// (i.e. visible in the same 3-card frame) share a colour.
const buildColourMap = (count, variants) => {
  const colours = [];
  for (let i = 0; i < count; i++) {
    const forbidden = new Set();
    if (i >= 1) forbidden.add(colours[i - 1]); // distance-1 backward
    if (i >= 2) forbidden.add(colours[i - 2]); // distance-2 backward
    if (i === count - 2) forbidden.add(colours[0]); // circular distance-2 (window [n-2,n-1,0])
    if (i === count - 1) {
      forbidden.add(colours[0]); // circular distance-1 (wrap)
      if (count > 2) forbidden.add(colours[1]); // circular distance-2 (window [n-1,0,1])
    }
    colours.push(variants.find((v) => !forbidden.has(v)) ?? variants[i % variants.length]);
  }
  return colours;
};

const CardCarousel = ({ items, title }) => {
  const containerRef = useRef(null);
  const trackIndexRef = useRef(0); // ref so transitionend never reads a stale value
  const isNavigating = useRef(false);

  const [cardWidth, setCardWidth] = useState(0);
  const [trackIndex, setTrackIndexState] = useState(0);
  const [transition, setTransition] = useState(false);
  const [dotIndex, setDotIndex] = useState(0);

  // Determine how many cards are visible (fixed at mount, recalculates on resize for width only)
  const visibleCount = window.innerWidth >= 860 ? 2 : 1;
  const clonesCount = visibleCount;

  // Keep ref and state in sync
  const setTrackIndex = (idx) => {
    trackIndexRef.current = idx;
    setTrackIndexState(idx);
  };

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const peek = window.innerWidth >= 860 ? 160 : 80;
        setCardWidth((containerRef.current.offsetWidth - peek) / visibleCount);
      }
    };
    measure();
    // Start positioned at the first real item (past the leading clones)
    trackIndexRef.current = clonesCount;
    setTrackIndexState(clonesCount);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!items || items.length === 0) return null;

  const colourMap = buildColourMap(items.length, COLOUR_VARIANTS);

  // Layout: [last N real items as clones] [all real items] [first N real items as clones]
  // This gives us one "page" of runway in each direction before needing to snap.
  const extendedItems = [
    ...items.slice(-clonesCount),
    ...items,
    ...items.slice(0, clonesCount),
  ];

  const navigate = (dir) => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    setTransition(true);
    setTrackIndex(trackIndexRef.current + (dir === "next" ? 1 : -1));
    setDotIndex((prev) =>
      dir === "next"
        ? (prev + 1) % items.length
        : (prev - 1 + items.length) % items.length
    );
  };

  const handleTransitionEnd = () => {
    const idx = trackIndexRef.current;

    // If we've slid into the trailing clones, snap (no animation) to the real equivalent
    if (idx >= items.length + clonesCount) {
      setTransition(false);
      setTrackIndex(idx - items.length);
    }
    // If we've slid into the leading clones, snap to the real equivalent at the other end
    else if (idx < clonesCount) {
      setTransition(false);
      setTrackIndex(idx + items.length);
    }

    // Double rAF ensures React has committed the no-transition render before we
    // allow the next navigation (prevents the snap itself from being animated)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        isNavigating.current = false;
      })
    );
  };

  const translateX = cardWidth > 0 ? -(trackIndex * cardWidth) : 0;

  return (
    <div className="card-carousel">
      <h1>{title}</h1>
      <div className="card-carousel-controls">
        <button
          className="carousel-nav"
          onClick={() => navigate("prev")}
          aria-label="Previous"
        >
          Previous
        </button>

        <div className="card-carousel-container" ref={containerRef}>
          <div
            className="card-carousel-track"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: transition ? "transform 0.4s ease" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {cardWidth > 0 &&
              extendedItems.map((item, i) => {
                const realIndex =
                  ((i - clonesCount) % items.length + items.length) %
                  items.length;
                const colour = colourMap[realIndex];
                return (
                  <div
                    key={`${item.id}-${i}`}
                    className="card-slot"
                    style={{ width: cardWidth, flexShrink: 0 }}
                  >
                    <Item
                      title={item.title}
                      img={item.img}
                      description={item.description}
                      live={item.live}
                      github={item.github}
                      features={item.features}
                      style={`item-container ${colour}`}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <button
          className="carousel-nav"
          onClick={() => navigate("next")}
          aria-label="Next"
        >
          Next
        </button>
      </div>

      <div className="card-carousel-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === dotIndex ? " active" : ""}`}
            onClick={() => {
              if (i === dotIndex) return;
              navigate(i > dotIndex ? "next" : "prev");
            }}
            aria-label={`Go to item ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
