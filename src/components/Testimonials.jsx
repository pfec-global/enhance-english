"use client";

import { useState } from "react";
import Image from "next/image";
import CountUp from "@/components/CountUp";
import Slider from "@/components/Slider";
import TestimonialCard from "@/components/TestimonialCard";
import { exams, testimonials } from "@/data/testimonials";

export default function Testimonials() {
  // null = show every exam. Clicking the active logo again clears the filter.
  const [filter, setFilter] = useState(null);

  const visible = filter
    ? testimonials.filter((testimonial) => testimonial.exam === filter)
    : testimonials;

  const examName = (id) => exams.find((exam) => exam.id === id)?.name;

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

          <div className="flex shrink-0 items-center gap-4">
            <span className="whitespace-nowrap">Filter By</span>
            {exams.map((exam) => (
              <button
                key={exam.id}
                type="button"
                aria-pressed={filter === exam.id}
                onClick={() => setFilter(filter === exam.id ? null : exam.id)}
                className={`transition duration-300 hover:-translate-y-0.5 ${
                  filter && filter !== exam.id ? "opacity-40 grayscale" : ""
                }`}
              >
                <Image
                  src={exam.logo}
                  alt={exam.name}
                  width={253}
                  height={100}
                  className="h-11 w-auto lg:h-[3.2rem]"
                />
              </button>
            ))}
          </div>
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
      </div>
    </section>
  );
}
