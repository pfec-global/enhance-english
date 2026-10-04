"use client";

import { useEffect, useRef, useState } from "react";

/*
  Wrap a section or a card in <Reveal> to make it fade in and slide up the first
  time it scrolls into view. It plays once; scrolling back up does not replay it.
  - `delay` (milliseconds) makes it start a little later, so cards in the same
    row appear one after another.
  - `className` is added to the wrapper (e.g. "grid h-full" so a card keeps
    filling its row's height).
*/
export default function Reveal({ children, delay = 0, className = "" }) {
  const wrapper = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Starts when the top of the section is 10% of the screen height above the bottom edge.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        visible
          ? "opacity-100"
          : "translate-y-16 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
