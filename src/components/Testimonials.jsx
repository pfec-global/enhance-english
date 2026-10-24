"use client";

import { useState } from "react";
import Image from "next/image";
import CountUp from "@/components/CountUp";
import Slider from "@/components/Slider";
import TestimonialCard from "@/components/TestimonialCard";
import {
  exams as builtInExams,
  testimonials as builtInTestimonials,
} from "@/data/testimonials";

// Home page: every exam, with "Filter By" logo buttons.
// Course pages pass `exam` ("ielts" or "pte"): only that exam's results are
// shown, with its logo and no filter buttons. Until an exam has results of its
// own (PTE for now), its pages show every result instead.
// `exams` and `testimonials` are in the shape of data/testimonials.js; the home
// page passes the admin's (see lib/api.js). `children` (e.g. a call to action) go under the slider.
export default function Testimonials({
  exam,
  exams = builtInExams,
  testimonials = builtInTestimonials,
  children,
}) {
  // null = show every exam. Clicking the active logo again clears the filter.
  const [chosen, setChosen] = useState(null);
  const filter = exam ?? chosen;

  const filtered = filter
    ? testimonials.filter((testimonial) => testimonial.exam === filter)
    : testimonials;
  // TODO: remove the fallback once there are PTE results
  const visible = exam && filtered.length === 0 ? testimonials : filtered;

  const examName = (id) => exams.find((item) => item.id === id)?.name;
  const examLogo = exam && exams.find((item) => item.id === exam)?.logo;

  return (
    <section aria-labelledby="testimonials" className="bg-surface">
      <div className="site-container py-14 lg:py-16">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <h2
            id="testimonials"
            className="text-2xl leading-snug font-bold sm:text-3xl lg:leading-[1.4] xl:text-[2.5rem]"
          >
            <span className="font-coiny font-normal text-brand-orange">
              <CountUp end={5000} commas={false} />+
            </span>{" "}
            Happy Students with High Scores.
            <br className="hidden lg:block" /> You Could Be the Next!
          </h2>

          {exam ? (
            // The exam's logo, when the admin has a category with a logo for it
            examLogo && (
              <Image
                src={examLogo}
                alt={examName(exam)}
                width={253}
                height={100}
                className="h-11 w-auto shrink-0 self-start lg:h-[3.2rem] lg:self-center"
              />
            )
          ) : (
            <div className="flex shrink-0 items-center gap-4">
              <span className="whitespace-nowrap">Filter By</span>
              {exams.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={filter === item.id}
                  onClick={() => setChosen(filter === item.id ? null : item.id)}
                  className={`transition duration-300 hover:-translate-y-0.5 ${
                    filter && filter !== item.id ? "opacity-40 grayscale" : ""
                  }`}
                >
                  {/* Categories added in the admin may have no logo: their name is shown instead */}
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={253}
                      height={100}
                      className="h-11 w-auto lg:h-[3.2rem]"
                    />
                  ) : (
                    <span className="flex h-11 items-center border border-black/25 bg-white px-4 font-semibold lg:h-[3.2rem]">
                      {item.name}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8">
          {visible.length > 0 ? (
            // 1 card per view on phones, 2 on tablets, 3 on desktop — always sliding
            <Slider
              key={filter}
              loop
              className="sm:gap-6 lg:gap-10"
              slideClassName="w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-5rem)/3)]"
            >
              {visible.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  examName={examName(testimonial.exam)}
                />
              ))}
            </Slider>
          ) : (
            <p className="py-16 text-center text-lg">
              {examName(filter)} results are coming soon.
            </p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
