"use client";

import { useEffect, useRef, useState } from "react";

// Counts from 0 up to `end` the first time the number scrolls into view.
export default function CountUp({ end, duration = 2000, commas = true }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      if (reduceMotion) {
        setValue(end);
        return;
      }

      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3; // fast start, slow finish
        setValue(Math.round(end * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  // commas: 5000 is shown as "5,000"
  const format = (number) =>
    commas ? number.toLocaleString("en-US") : String(number);

  return (
    <span ref={ref} className="inline-grid">
      {/* Screen readers get the final number straight away */}
      <span className="sr-only">{format(end)}</span>
      {/* Invisible final number keeps the width fixed while counting */}
      <span className="invisible col-start-1 row-start-1">{format(end)}</span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {format(value)}
      </span>
    </span>
  );
}
