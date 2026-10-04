import Image from "next/image";
import LanguageCourseCard from "@/components/LanguageCourseCard";
import { PresentationIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import Slider from "@/components/Slider";
import { languageCourses } from "@/data/languageCourses";

export default function LanguageCourses() {
  return (
    <section
      aria-labelledby="language-courses"
      className="overflow-hidden bg-surface py-14 lg:py-20"
    >
      <div className="site-container text-center">
        <PresentationIcon className="mx-auto size-8" strokeWidth={1.5} />
        <h2
          id="language-courses"
          className="mt-3 text-2xl font-semibold sm:text-3xl lg:text-[2.5rem]"
        >
          <span className="font-coiny font-normal text-brand-orange">
            Master the English Language
          </span>{" "}
          at Every Level
        </h2>
        <p className="mt-3 text-sm sm:text-base">
          From speaking and writing to grammar and fluency, our courses and
          clubs cater to all skill levels, helping you build confidence and
          excel in English communication.
        </p>
      </div>

      {/* The ribbon runs across the full screen width, behind the cards */}
      <div className="relative mt-8">
        <Image
          src="/image/orrange_rebon_bg.png"
          alt=""
          width={3840}
          height={841}
          sizes="(min-width: 1024px) 100vw, 1024px"
          className="absolute top-[14%] left-0 h-auto w-[max(101%,64rem)] max-w-none"
        />

        {/* Auto-playing slider on phones, one card below the other from tablets up */}
        <div className="site-container relative">
          <Slider
            className="sm:block sm:overflow-visible sm:py-0"
            slideClassName="w-[85%] sm:mx-auto sm:mt-8 sm:w-auto sm:max-w-[65.75rem] sm:first:mt-0"
          >
            {/* Each card appears as it scrolls into view */}
            {languageCourses.map((course, index) => (
              <Reveal key={course.id} className="grid h-full">
                <LanguageCourseCard
                  course={course}
                  imageRight={index % 2 === 1}
                />
              </Reveal>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
