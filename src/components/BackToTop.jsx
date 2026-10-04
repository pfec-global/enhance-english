"use client";

import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@/components/icons";

// How far down the page (in pixels) before the button shows.
const SHOW_AFTER = 400;

// Round button fixed to the bottom right corner of the screen. It fades in once
// the page is scrolled down and scrolls back to the top when clicked.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-4 bottom-4 z-40 grid size-12 cursor-pointer place-items-center rounded-full bg-brand-orange text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-brand-royal sm:right-6 sm:bottom-6 lg:size-14 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ChevronUpIcon className="size-5" />
    </button>
  );
}
