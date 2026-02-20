import React, { useEffect, useRef } from "react";

const RAIN_COLS = ["#81b29a", "#f2cc8f", "#e07a5f", "#15a3ef"];

// canvasStyle — override canvas element style (e.g. position:fixed for global mode)
// dotAlpha   — base opacity for dots (default 0.7; pass 0.4 for behind-content global mode)
const RandomDotsCanvas = ({ active, mousePosRef, pausedRef, dotAlpha = 0.7, canvasStyle }) => {
  const canvasRef = useRef(null);
  const dotAlphaRef = useRef(dotAlpha);
  const stateRef = useRef({
    dots: [],
    rafId: null,
    draw: null,
    ctx: null,
    w: 0,
    h: 0,
    lastMX: null,
    lastMY: null,
    lastDX: 0,
    lastDY: 0,
    hasBeenActive: false,
  });

  // Keep dotAlphaRef in sync with prop so the draw closure always uses the latest value
  useEffect(() => {
    dotAlphaRef.current = dotAlpha;
  }, [dotAlpha]);

  // Canvas setup — runs once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = canvas.offsetWidth || 300);
    const h = (canvas.height = canvas.offsetHeight || 300);
    const state = stateRef.current;
    state.ctx = ctx;
    state.w = w;
    state.h = h;

    state.dots = Array.from({ length: 280 }, (_, i) => {
      const baseR = Math.random() * 2 + 1;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 3.5,
        vy: (Math.random() - 0.5) * 3.5,
        r: baseR,
        baseR,
        col: RAIN_COLS[Math.floor(Math.random() * 4)],
        // 0 = follow both axes, 1 = mirror-x/match-y, 2 = match-x/mirror-y
        type: i % 5 === 0 ? 1 : i % 5 === 1 ? 2 : 0,
      };
    });

    state.draw = () => {
      if (pausedRef?.current) return; // frozen — leave canvas as-is
      ctx.clearRect(0, 0, w, h);

      // Compute how far the mouse moved since the last frame
      const mouse = mousePosRef ? mousePosRef.current : null;
      let mdx = 0,
        mdy = 0;
      if (mouse && mouse.x !== null) {
        if (state.lastMX !== null) {
          mdx = mouse.x - state.lastMX;
          mdy = mouse.y - state.lastMY;
        }
        state.lastMX = mouse.x;
        state.lastMY = mouse.y;
        // Remember last non-zero movement direction for the shoot-off exit
        if (mdx !== 0 || mdy !== 0) {
          state.lastDX = mdx;
          state.lastDY = mdy;
        }
      }

      // Map mouse speed directly to a pixel radius: stationary → tiny, fast swipe → up to 200px
      const mouseSpeed = Math.sqrt(mdx * mdx + mdy * mdy);
      const targetR = Math.max(0.5, Math.min(200, mouseSpeed * 10));

      const force = 0.08;
      state.dots.forEach((dot) => {
        // type 0: follow both; type 1: flip x, match y; type 2: match x, flip y
        const sx = dot.type === 1 ? -1 : 1;
        const sy = dot.type === 2 ? -1 : 1;
        dot.vx += mdx * force * sx;
        dot.vy += mdy * force * sy;

        // Lerp radius toward target — smooth grow/shrink with mouse speed
        dot.r += (targetR - dot.r) * 0.12;

        // Tiny random drift so dots stay alive when the mouse is still
        dot.vx += (Math.random() - 0.5) * 0.08;
        dot.vy += (Math.random() - 0.5) * 0.08;

        // Gentle damping so dots coast to a stop when the mouse is still
        dot.vx *= 0.97;
        dot.vy *= 0.97;

        // Clamp speed
        const speed = Math.sqrt(dot.vx * dot.vx + dot.vy * dot.vy);
        if (speed > 8) {
          dot.vx = (dot.vx / speed) * 8;
          dot.vy = (dot.vy / speed) * 8;
        }

        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0) dot.x = w;
        if (dot.x > w) dot.x = 0;
        if (dot.y < 0) dot.y = h;
        if (dot.y > h) dot.y = 0;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = dot.col;
        ctx.globalAlpha = dotAlphaRef.current;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Animation loop — only starts/stops
  useEffect(() => {
    const state = stateRef.current;
    if (active) {
      state.hasBeenActive = true;
      if (!state.draw) return;
      // Reset all dots to a fresh random spread so they don't bunch up from previous exit
      state.dots.forEach((dot) => {
        dot.x = Math.random() * state.w;
        dot.y = Math.random() * state.h;
        dot.vx = (Math.random() - 0.5) * 3.5;
        dot.vy = (Math.random() - 0.5) * 3.5;
        dot.r = dot.baseR;
      });
      state.lastMX = null;
      state.lastMY = null;
      state.lastDX = 0;
      state.lastDY = 0;
      const loop = () => {
        state.draw();
        state.rafId = requestAnimationFrame(loop);
      };
      loop();
    } else {
      cancelAnimationFrame(state.rafId);
      if (!state.ctx || !state.hasBeenActive) return;
      // Shoot dots off in the last mouse direction, fading out as they go
      const speed = Math.sqrt(state.lastDX ** 2 + state.lastDY ** 2) || 1;
      const nx = state.lastDX / speed;
      const ny = state.lastDY / speed;
      state.dots.forEach((dot) => {
        dot.vx += nx * 14;
        dot.vy += ny * 14;
      });
      let frames = 0;
      const total = 50;
      const { ctx, w, h } = state;
      const flyOff = () => {
        ctx.clearRect(0, 0, w, h);
        const alpha = 1 - frames / total;
        state.dots.forEach((dot) => {
          dot.x += dot.vx;
          dot.y += dot.vy;
          // no edge wrapping — let them fly off
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          ctx.fillStyle = dot.col;
          ctx.globalAlpha = alpha * dotAlphaRef.current;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
        if (++frames < total) {
          state.rafId = requestAnimationFrame(flyOff);
        } else {
          ctx.clearRect(0, 0, w, h);
        }
      };
      state.rafId = requestAnimationFrame(flyOff);
    }
    return () => cancelAnimationFrame(state.rafId);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={
        canvasStyle || {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }
      }
    />
  );
};

export default RandomDotsCanvas;
