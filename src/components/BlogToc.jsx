"use client";

import { useEffect, useRef, useState } from "react";

// Where a heading lands when its topic is clicked: the page's scroll-padding-top (globals.css) plus
// the heading's scroll-margin-top (components/BlogContent.jsx). Once a heading is that high (or
// higher), its section counts as "being read" - so a clicked topic always shows as the current one.
function landingTop(el) {
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return padding + margin;
}

const listText = "text-[max(16px,1rem)]";

// The numbered list of the post's sections; `onPick` runs when one is clicked
function TopicList({ headings, activeId, onPick, className = "" }) {
  return (
    <ol className={`${listText} ${className}`}>
      {headings.map((heading, i) => (
        <li key={heading.id}>
          {/* A normal #link: the browser scrolls to the heading (smoothly, see scroll-behavior in globals.css) */}
          <a
            href={`#${heading.id}`}
            aria-current={heading.id === activeId ? "location" : undefined}
            onClick={onPick}
            className={`block py-1.5 transition-colors duration-300 hover:text-accent ${
              heading.id === activeId ? "font-bold text-ink" : "text-ink/75"
            }`}
          >
            {i + 1}. {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/*
  "Jump to Topic" box of a blog post. headings is a list of { id, text } - one per h2 of the post.
  The bar floats under the navbar while scrolling and always shows the section being read.
  - At the top of the post, the full list sits in the page under the bar (it can be folded with
    the arrow) and scrolls away with the text.
  - While the bar floats, the arrow opens the list as a dropdown over the text.
  Opening and closing never change the height of the page: when they did, the browser moved the
  page to keep the reading position, the bar stopped and started floating, and a click on it could
  close the list again straight away.
*/
export default function BlogToc({ headings }) {
  const navRef = useRef(null);
  const [activeId, setActiveId] = useState(headings[0]?.id);
  const [stuck, setStuck] = useState(false);
  // The list in the page (top of the post), and the dropdown (while the bar floats)
  const [listOpen, setListOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // A post without h2 headings has no box at all, so there is nothing to follow
    if (headings.length === 0) return;

    const onScroll = () => {
      // The active section is the last heading that has passed the top of the screen
      let current = headings[0]?.id;
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el && el.getBoundingClientRect().top <= landingTop(el) + 2) current = heading.id;
      }
      setActiveId(current);

      const nav = navRef.current;
      if (!nav) return;
      const isStuck = nav.getBoundingClientRect().top <= parseFloat(getComputedStyle(nav).top) + 1;
      setStuck(isStuck);
      // Back at the top, the dropdown is not needed: the list is in the page
      if (!isStuck) setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  // The dropdown closes on a click anywhere else, or Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const onKeyDown = (event) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  if (headings.length === 0) return null;

  const activeIndex = Math.max(
    0,
    headings.findIndex((heading) => heading.id === activeId),
  );
  const expanded = stuck ? menuOpen : listOpen;
  // At the top with the list open, the bar and the list look like one box
  const joined = !stuck && listOpen;

  // A fragment, not a wrapper: the bar can only float within its parent, the post's column
  return (
    <>
      <nav
        ref={navRef}
        aria-label="Jump to topic"
        className={`sticky top-22 z-30 max-w-4xl border border-ink/10 bg-[#f1f5f8] shadow-md sm:top-24 lg:top-28 ${
          joined ? "rounded-t-lg" : "rounded-lg"
        }`}
      >
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => (stuck ? setMenuOpen(!menuOpen) : setListOpen(!listOpen))}
          className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-3.5 text-left text-[max(16px,1rem)]"
        >
          <span className="shrink-0 font-bold text-accent">Jump to Topic</span>
          <span aria-hidden="true" className="h-4 w-px shrink-0 bg-ink/50" />
          <span className="min-w-0 flex-1 truncate font-bold">
            {activeIndex + 1}. {headings[activeIndex].text}
          </span>
          <svg
            className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* The dropdown while the bar floats: over the text, so the page does not move */}
        <div
          inert={!menuOpen}
          className={`absolute inset-x-0 top-full mt-1.5 rounded-lg border border-ink/10 bg-[#f1f5f8] shadow-lg transition duration-200 motion-reduce:transition-none ${
            menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
          }`}
        >
          <TopicList
            headings={headings}
            activeId={activeId}
            onPick={() => setMenuOpen(false)}
            className="mx-4 max-h-[50vh] overflow-y-auto py-2"
          />
        </div>
      </nav>

      {/* The list in the page at the top of the post. It slides open and shut (the grid row grows from
          0 to its height); inert keeps the hidden links out of reach of the keyboard and screen readers. */}
      <div
        inert={!listOpen}
        className={`grid max-w-4xl transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none ${
          listOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <TopicList
            headings={headings}
            activeId={activeId}
            className="rounded-b-lg border border-t-0 border-ink/10 bg-[#f1f5f8] px-4 pt-1 pb-2 shadow-md"
          />
        </div>
      </div>
    </>
  );
}
