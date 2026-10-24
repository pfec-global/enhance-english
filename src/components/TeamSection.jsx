"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/icons";
import { team as builtInTeam, teamStats } from "@/data/team";

const socialIcons = {
  facebook: FacebookIcon,
  x: XIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
};

const arrow =
  "grid size-9 cursor-pointer place-items-center rounded-full bg-white text-brand-orange shadow-sm transition hover:scale-110 disabled:cursor-default disabled:opacity-50 disabled:hover:scale-100";

/*
  "Meet the Team behind Enhance English" on an orange band: the intro, two numbers and
  the arrow buttons on the left; the team cards in a row that scrolls sideways on the right,
  running to the edge of the screen. Phones and tablets: the intro on top, the row below.
  `team` is in the shape of data/team.js; each card shows the person's social profile links.
*/
export default function TeamSection({ team = builtInTeam }) {
  const track = useRef(null);
  const [ends, setEnds] = useState({ start: true, end: false });

  // Which arrows can still move the row. It gets the row itself rather than reading the ref:
  // when the page is left, React clears the ref before the observer below is disconnected,
  // and taking the row out of the page still makes the observer report one last resize.
  const measure = (row) => {
    setEnds({
      start: row.scrollLeft <= 1,
      end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 1,
    });
  };

  useEffect(() => {
    const row = track.current;
    measure(row);
    const observer = new ResizeObserver(() => measure(row));
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  // One card (and its gap) at a time
  const move = (direction) => {
    const row = track.current;
    if (!row) return;
    const [first, second] = row.children;
    const step = second
      ? second.offsetLeft - first.offsetLeft
      : row.clientWidth;
    row.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="our-team"
      className="overflow-hidden bg-brand-orange text-white"
    >
      <div className="site-container grid gap-8 py-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-center lg:gap-10 lg:py-16 xl:grid-cols-[19rem_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase">
            Our Team
          </p>
          <h2
            id="our-team"
            className="mt-2 text-2xl leading-tight font-bold sm:text-3xl"
          >
            Meet the Team behind Enhance English
          </h2>
          <p className="mt-3 text-sm text-white/90">
            Our expert trainers are certified by the British Council, Pearson,
            and ETS, bringing years of experience and deep knowledge to help you
            excel in IELTS, PTE, and other language exams.
          </p>

          <ul className="mt-6 flex gap-4">
            {teamStats.map((stat) => (
              <li
                key={stat.id}
                className="min-w-28 border border-black/20 bg-white px-3 py-2 text-ink shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)]"
              >
                <strong className="block text-lg leading-tight text-brand-orange">
                  {stat.value}
                </strong>
                <span className="block text-xs leading-tight whitespace-pre-line">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              aria-label="Previous team members"
              onClick={() => move(-1)}
              disabled={ends.start}
              className={arrow}
            >
              <ChevronDownIcon className="size-5 rotate-90" />
            </button>
            <button
              type="button"
              aria-label="Next team members"
              onClick={() => move(1)}
              disabled={ends.end}
              className={arrow}
            >
              <ChevronDownIcon className="size-5 -rotate-90" />
            </button>
          </div>
        </div>

        {/* The row reaches the screen edge: past the page side space on the right (and on both sides on phones) */}
        <ul
          ref={track}
          onScroll={(event) => measure(event.currentTarget)}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pt-1 pb-3 lg:mr-[-5vw] lg:ml-0 lg:scroll-pl-0 lg:pl-0 lg:pr-[5vw] min-[90rem]:mr-[calc(-1*min(8.333vw,160px))] min-[90rem]:pr-[min(8.333vw,160px)]"
        >
          {team.map((member) => (
            <li key={member.id} className="w-52 shrink-0 snap-start sm:w-56">
              <article className="h-full border border-black/20 bg-white text-ink shadow-[0.3rem_0.3rem_0_var(--color-brand-yellow)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.photoAlt ?? member.name}
                    fill
                    sizes="224px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="px-3 pt-2 pb-3">
                  <h3 className="border-b border-brand-orange/30 pb-1.5 leading-tight font-bold text-brand-orange">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-xs whitespace-pre-line">
                    {member.role}
                  </p>
                  {member.socials?.length > 0 && (
                    <ul className="mt-2.5 flex gap-1.5">
                      {member.socials.map((social) => {
                        const SocialIcon = socialIcons[social.network];
                        if (!SocialIcon) return null;
                        return (
                          <li key={social.network}>
                            <a
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on ${social.label}`}
                              title={social.label}
                              className="grid size-7 place-items-center rounded-full bg-brand-orange/10 text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
                            >
                              <SocialIcon className="size-3.5" />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
