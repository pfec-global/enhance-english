"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@/components/icons";

const arrow =
  "grid size-10 cursor-pointer place-items-center rounded-sm bg-brand-orange text-white transition-colors hover:bg-brand-royal";

// Where each photo sits, by its distance from the photo in front:
// in front, then smaller and behind on either side; the rest are hidden.
function placement(offset) {
  if (offset === 0) return "z-10 translate-x-0 scale-100 opacity-100";
  if (offset === -1) return "z-0 -translate-x-[38%] scale-75 opacity-100";
  if (offset === 1) return "z-0 translate-x-[38%] scale-75 opacity-100";
  return "z-0 translate-x-0 scale-50 opacity-0";
}

/*
  "Certified … Test Venue" on an exam registration page: logo, title, text and
  arrows on the left; the venue photos on the right, one in front with its
  neighbours peeking out behind it. `page` is in the shape of
  data/examRegistration.js; without a logo or photos those are left out, and
  the arrows only show when there is more than one photo.
  With several photos they move on by themselves every few seconds (same as
  components/Slider.jsx): only while the photos are on screen, not while the
  visitor hovers over or tabs through the section, not right after an arrow
  click, and never for visitors who prefer reduced motion.
*/

const AUTOPLAY_INTERVAL = 3500;
export default function VenueSection({ page }) {
  const { venue, venuePhotos: photos } = page;
  const [current, setCurrent] = useState(0);
  const stackRef = useRef(null);
  const pausedRef = useRef(false);
  const lastMoveRef = useRef(0);

  // Distance from the photo in front, wrapping around at the ends.
  const offsetOf = (index) => {
    let offset = (index - current + photos.length) % photos.length;
    if (offset > photos.length / 2) offset -= photos.length;
    return offset;
  };

  const move = (step) => {
    lastMoveRef.current = Date.now();
    setCurrent((current + step + photos.length) % photos.length);
  };

  // Autoplay
  useEffect(() => {
    const count = photos.length;
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let onScreen = false;
    const observer = new IntersectionObserver(
      ([entry]) => (onScreen = entry.isIntersecting),
      { threshold: 0.5 },
    );
    observer.observe(stackRef.current);

    const timer = setInterval(() => {
      const justMoved = Date.now() - lastMoveRef.current < AUTOPLAY_INTERVAL;
      if (!onScreen || pausedRef.current || justMoved) return;
      setCurrent((index) => (index + 1) % count);
    }, AUTOPLAY_INTERVAL);

    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [photos.length]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <section
      aria-labelledby="venue"
      className="overflow-hidden bg-[#f0f0f3]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div
        className={`site-container grid items-center gap-10 py-12 lg:py-16 ${
          photos.length > 0 ? "lg:grid-cols-[2fr_3fr]" : ""
        }`}
      >
        <div>
          {venue.logo && (
            <Image
              src={venue.logo.src}
              alt={venue.logo.alt}
              title={venue.logo.title}
              width={venue.logo.width}
              height={venue.logo.height}
              sizes="176px"
              className="mb-5 h-12 w-auto"
            />
          )}
          <h2
            id="venue"
            className="max-w-[18em] text-2xl leading-snug font-bold lg:text-[1.75rem]"
          >
            {venue.title}
          </h2>
          {venue.text && <p className="mt-4 max-w-md text-sm">{venue.text}</p>}

          {photos.length > 1 && (
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => move(-1)}
                className={arrow}
              >
                <ChevronDownIcon className="size-5 rotate-90" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => move(1)}
                className={arrow}
              >
                <ChevronDownIcon className="size-5 -rotate-90" />
              </button>
            </div>
          )}
        </div>

        {photos.length > 0 && (
          <div ref={stackRef} className="relative mx-auto aspect-[4/3] w-[70%]">
            {photos.map((photo, index) => {
              const offset = offsetOf(index);
              return (
                <div
                  key={index}
                  aria-hidden={offset !== 0}
                  className={`absolute inset-0 overflow-hidden shadow-lg transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${placement(offset)}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 70vw"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
