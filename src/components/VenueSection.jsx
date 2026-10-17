"use client";

import { useState } from "react";
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
  neighbours peeking out behind it. `page` comes from data/examRegistration.js.
*/
export default function VenueSection({ page }) {
  const { venue, venuePhotos: photos } = page;
  const [current, setCurrent] = useState(0);

  // Distance from the photo in front, wrapping around at the ends.
  const offsetOf = (index) => {
    let offset = (index - current + photos.length) % photos.length;
    if (offset > photos.length / 2) offset -= photos.length;
    return offset;
  };

  const move = (step) =>
    setCurrent((current + step + photos.length) % photos.length);

  return (
    <section aria-labelledby="venue" className="overflow-hidden bg-[#f0f0f3]">
      <div className="site-container grid items-center gap-10 py-12 lg:grid-cols-[2fr_3fr] lg:py-16">
        <div>
          <Image
            src={venue.logo.src}
            alt={venue.logo.alt}
            width={venue.logo.width}
            height={venue.logo.height}
            sizes="176px"
            className="h-12 w-auto"
          />
          <h2
            id="venue"
            className="mt-5 max-w-[18em] text-2xl leading-snug font-bold lg:text-[1.75rem]"
          >
            {venue.title}
          </h2>
          <p className="mt-4 max-w-md text-sm">{venue.text}</p>

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
        </div>

        <div className="relative mx-auto aspect-[4/3] w-[70%]">
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
      </div>
    </section>
  );
}
