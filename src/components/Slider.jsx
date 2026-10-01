"use client";

import { Children, useEffect, useRef, useState } from "react";

const left = (element) => element.getBoundingClientRect().left;

// Distance from one slide to the next (slide width + gap).
function getStep(track) {
  const slides = track.children;
  return slides.length > 1 ? left(slides[1]) - left(slides[0]) : 0;
}

function getIndex(track) {
  const step = getStep(track);
  return step ? Math.round(track.scrollLeft / step) : 0;
}

// How many slides are visible at once.
function getPerView(track) {
  const step = getStep(track);
  return step ? Math.max(1, Math.round(track.clientWidth / step)) : 1;
}

// How many positions the slider can stop at (1 when everything already fits).
function getPages(track, count) {
  const step = getStep(track);
  const style = getComputedStyle(track);
  const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const last = track.children[count - 1].getBoundingClientRect();
  const hidden = last.right - left(track.children[0]) + padding - track.clientWidth;
  return step > 0 && hidden > 1 ? Math.round(hidden / step) + 1 : 1;
}

function goTo(track, index) {
  track.scrollTo({ left: index * getStep(track), behavior: "smooth" });
}

/*
  A row of slides that moves to the next one on its own.
  Visitors can also swipe it, drag it with the mouse, or use the dots.
  - `slideClassName` sets how wide one slide is at each screen size.
  - `className` is added to the row (gaps, or turning it into a grid).
  - `loop` keeps it going round forever, even when every slide fits on screen.
  - `onDark` switches the dots to yellow and white, for dark backgrounds.
  Without `loop`, it stops sliding and hides the dots when all slides fit.
*/
export default function Slider({
  children,
  className = "",
  slideClassName = "",
  interval = 3500,
  loop = false,
  onDark = false,
}) {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const touchingRef = useRef(false);
  const lastTouchRef = useRef(0);
  const settleTimerRef = useRef(null);
  const dragRef = useRef(null); // mouse drag in progress: { startX, startLeft, moved }
  const draggedRef = useRef(false);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(1);
  const [perView, setPerView] = useState(Infinity);

  const slides = Children.toArray(children);
  const count = slides.length;

  // Looping shows a second copy of the slides after the originals. When the row
  // reaches the copies it jumps back to the originals, which look the same.
  const looping = loop && count > 1 && count >= perView;
  const dots = looping ? count : pages;

  // Re-measure when the screen size changes.
  useEffect(() => {
    const track = trackRef.current;
    const observer = new ResizeObserver(() => {
      setPerView(getPerView(track));
      setPages(getPages(track, count));
    });
    observer.observe(track);
    return () => {
      observer.disconnect();
      clearTimeout(settleTimerRef.current);
    };
  }, [count]);

  // Autoplay
  useEffect(() => {
    const track = trackRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let onScreen = false;
    const observer = new IntersectionObserver(
      ([entry]) => (onScreen = entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(track);

    const timer = setInterval(() => {
      const pageCount = looping ? count : getPages(track, count);
      const justTouched = Date.now() - lastTouchRef.current < interval;
      if (pageCount < 2 || !onScreen || pausedRef.current || justTouched) return;
      const next = getIndex(track) + 1;
      goTo(track, looping ? next : next % pageCount);
    }, interval);

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [interval, looping, count]);

  // Width of one full set of slides (looping only).
  const getLoopWidth = (track) =>
    left(track.children[count]) - left(track.children[0]);

  // Runs once the row has stopped moving.
  const settle = () => {
    const track = trackRef.current;
    if (touchingRef.current || dragRef.current) return;
    track.style.scrollSnapType = ""; // switched off while dragging with the mouse
    // Looping: if it stopped on the copies, jump back to the originals.
    if (looping && track.scrollLeft >= getLoopWidth(track) - 2) {
      track.scrollLeft -= getLoopWidth(track);
    }
  };

  const handleScroll = () => {
    setActive(getIndex(trackRef.current) % count);
    clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(settle, 150);
  };

  // Autoplay waits while the visitor is touching or hovering the slider.
  const pause = () => (pausedRef.current = true);
  const resume = () => {
    pausedRef.current = false;
    lastTouchRef.current = Date.now();
  };

  // Mouse drag. (Touch screens and trackpads already scroll the row by themselves.)
  const handlePointerDown = (event) => {
    const track = trackRef.current;
    const canSlide = track.scrollWidth > track.clientWidth + 1;
    if (event.pointerType !== "mouse" || event.button !== 0 || !canSlide) return;
    dragRef.current = {
      startX: event.clientX,
      startLeft: track.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const track = trackRef.current;
    const distance = event.clientX - drag.startX;

    if (!drag.moved) {
      if (Math.abs(distance) < 5) return; // still a click, not a drag
      drag.moved = true;
      track.setPointerCapture(event.pointerId);
      track.style.scrollSnapType = "none"; // let the row follow the mouse freely
    }

    let target = drag.startLeft - distance;
    if (looping) {
      // Dragging past either end carries on with the other set of slides.
      const loopWidth = getLoopWidth(track);
      const max = track.scrollWidth - track.clientWidth;
      const shift = target < 0 ? loopWidth : target > max ? -loopWidth : 0;
      drag.startLeft += shift;
      target += shift;
    }
    track.scrollLeft = target;
  };

  const handlePointerUp = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag?.moved) return;

    // Stop on the nearest slide; a short drag still moves one slide.
    const track = trackRef.current;
    const step = getStep(track);
    const travelled = track.scrollLeft - drag.startLeft;
    let index = Math.round(track.scrollLeft / step);
    if (index === Math.round(drag.startLeft / step) && Math.abs(travelled) > 40) {
      index += travelled > 0 ? 1 : -1;
    }
    goTo(track, Math.max(0, index));

    lastTouchRef.current = Date.now();
    clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(settle, 150);

    // The mouse-up after a drag must not count as a click on a card.
    draggedRef.current = true;
    setTimeout(() => (draggedRef.current = false));
  };

  const canDrag = dots > 1;

  const dotColors = onDark
    ? { active: "bg-brand-yellow", idle: "bg-white/85" }
    : { active: "bg-brand-orange", idle: "bg-brand-orange/25" };

  return (
    <>
      {/* On phones the row runs to the screen edges, so the next slide peeks in */}
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        onTouchStart={() => {
          touchingRef.current = true;
          pause();
        }}
        onTouchEnd={() => {
          touchingRef.current = false;
          resume();
          settle();
        }}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp} // safety net if the mouse-up is missed
        onDragStart={(event) => event.preventDefault()} // no ghost image when dragging a picture
        onClickCapture={(event) => {
          if (!draggedRef.current) return;
          event.preventDefault();
          event.stopPropagation();
        }}
        className={`no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pt-2 pb-3 sm:mx-0 sm:scroll-px-0 sm:px-0 ${
          canDrag ? "cursor-grab select-none active:cursor-grabbing" : ""
        } ${className}`}
      >
        {slides.map((slide) => (
          <li key={slide.key} className={`shrink-0 snap-start ${slideClassName}`}>
            {slide}
          </li>
        ))}
        {looping &&
          slides.map((slide) => (
            <li
              key={`copy-${slide.key}`}
              aria-hidden="true"
              className={`shrink-0 snap-start ${slideClassName}`}
            >
              {slide}
            </li>
          ))}
      </ul>

      {dots > 1 && (
        <div className="mt-2 flex justify-center">
          {Array.from({ length: dots }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === active}
              onClick={() => {
                lastTouchRef.current = Date.now();
                goTo(trackRef.current, index);
              }}
              className="p-1.5"
            >
              <span
                className={`block size-2.5 rounded-full transition-colors ${
                  index === active ? dotColors.active : dotColors.idle
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
