"use client";

import { useEffect, useRef } from "react";

// Thin bar along the bottom edge of the header (it is placed inside Header.jsx).
// It grows from left to right as the page is scrolled: empty at the top of the
// page, full at the bottom.
export default function ScrollProgress() {
  const bar = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      // The width is set directly on the element so React does not re-render on every scroll.
      bar.current.style.scale = `${Math.min(progress, 1)} 1`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-full h-1 origin-left scale-x-0 bg-linear-to-r from-brand-yellow to-brand-orange"
    />
  );
}
