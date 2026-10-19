import Image from "next/image";
import CourseCard from "@/components/CourseCard";
import ExamRegisterCard from "@/components/ExamRegisterCard";
import MockTestCard from "@/components/MockTestCard";
import Reveal from "@/components/Reveal";
import Slider from "@/components/Slider";
import { exams } from "@/data/testimonials";

// "Explore Other Courses" on a course page: course cards, then (when `explore.exam` is set)
// mock tests and exam registration. `explore` is the page's `explore` from
// data/coursePages.js; its `courses` are in the same shape as in data/programs.js.
// `color` is the background (orange for IELTS, blue for PTE and English).
export default function CourseExplore({ explore, color }) {
  const logo = exams.find((exam) => exam.id === explore.program)?.logo;

  return (
    <section
      aria-labelledby="explore"
      style={{ backgroundColor: color, "--accent": explore.accentColor }}
    >
      <div className="site-container py-12 lg:py-14">
        <div className="flex items-center justify-between gap-6">
          <h2
            id="explore"
            className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl"
          >
            <span className="font-coiny font-normal">Explore</span> Other{" "}
            {explore.programName} Courses &amp; Mock Tests
          </h2>
          {logo && (
            <Image
              src={logo}
              alt={explore.programName}
              width={253}
              height={100}
              className="hidden h-11 w-auto shrink-0 sm:block lg:h-[3.2rem]"
            />
          )}
        </div>

        {/* Auto-playing slider on phones, 2 columns on tablets, 4 on desktop */}
        <div className="mt-5 sm:mt-7">
          <Slider
            onDark
            className="sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:py-0 xl:grid-cols-4"
            slideClassName="w-[85%] sm:w-auto"
          >
            {/* Each card appears as it comes into view, one after another along the row */}
            {explore.courses.map((item, index) => (
              <Reveal
                key={item.id}
                delay={(index % 4) * 120}
                className="grid h-full"
              >
                <CourseCard course={item} />
              </Reveal>
            ))}
          </Slider>
        </div>

        {/* Mock tests and exam registration: stacked, side by side on desktop.
            Either can be missing; the other then takes the row. */}
        {(explore.mockTests || explore.exam) && (
          <div
            className={`mx-auto mt-6 grid max-w-[80rem] gap-6 lg:mt-8 ${
              explore.mockTests && explore.exam
                ? "lg:grid-cols-[22rem_1fr]"
                : ""
            }`}
          >
            {explore.mockTests && (
              <Reveal className="grid">
                <MockTestCard mockTests={explore.mockTests} />
              </Reveal>
            )}
            {explore.exam && (
              <Reveal delay={120} className="grid">
                <ExamRegisterCard exam={explore.exam} />
              </Reveal>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
