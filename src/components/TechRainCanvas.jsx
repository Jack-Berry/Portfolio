import React, { useEffect, useRef } from "react";

const RAIN_COLS = ["#81b29a", "#f2cc8f", "#e07a5f", "#15a3ef"];

const TechRainCanvas = ({ active, words }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    drops: [],
    rafId: null,
    draw: null,
    ctx: null,
    w: 0,
    h: 0,
  });

  // Canvas setup — runs once on mount so re-renders don't reset the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = canvas.offsetWidth || 300);
    const h = (canvas.height = canvas.offsetHeight || 300);
    const fs = 19;
    const cols = Math.floor(w / fs);
    const colWords = Array.from(
      { length: cols },
      (_, i) => words[i % words.length] + "    ",
    );
    const state = stateRef.current;
    state.ctx = ctx;
    state.w = w;
    state.h = h;
    state.drops = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * (h / fs)),
    );
    state.draw = () => {
      // Fade old characters toward transparent (works in any theme, no bg accumulation)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.015)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.font = `${fs}px monospace`;
      state.drops.forEach((y, i) => {
        const word = colWords[i];
        const char = word[y % word.length];
        ctx.fillStyle = RAIN_COLS[i % 4];
        ctx.fillText(char, i * fs, y * fs);
        state.drops[i] = y * fs > h && Math.random() > 0.97 ? 0 : y + 1;
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Animation loop — only starts/stops, never resets the canvas
  useEffect(() => {
    const state = stateRef.current;
    if (active) {
      if (!state.draw) return;
      let frame = 0;
      const loop = () => {
        state.rafId = requestAnimationFrame(loop);
        if (++frame % 4 === 0) state.draw();
      };
      loop();
    } else {
      cancelAnimationFrame(state.rafId);
      if (!state.ctx) return;
      // Fade out — erode pixel alpha using destination-out so characters dissolve
      // to transparent. Runs to near-zero (0.98^250 ≈ 0.7%) with no hard clearRect
      // at the end so there is no visible snap (~4 seconds total).
      let frames = 0;
      const fadeOut = () => {
        state.ctx.globalCompositeOperation = "destination-out";
        state.ctx.fillStyle = "rgba(0,0,0,0.02)";
        state.ctx.fillRect(0, 0, state.w, state.h);
        state.ctx.globalCompositeOperation = "source-over";
        if (++frames < 250) {
          state.rafId = requestAnimationFrame(fadeOut);
        }
        // No clearRect — just let the loop end; remaining alpha is imperceptible
      };
      state.rafId = requestAnimationFrame(fadeOut);
    }
    return () => cancelAnimationFrame(state.rafId);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
};

export default TechRainCanvas;
