import Image from "next/image";
import CourseCard from "@/components/CourseCard";
import Reveal from "@/components/Reveal";
import Slider from "@/components/Slider";
import { exams } from "@/data/testimonials";

// "Explore Other Courses" on a course page: the other courses of the same exam.
// `course` is the page's own course (data/coursePages.js); `courses` are the
// cards to show, in the same shape as in data/programs.js.
export default function CourseExplore({ course, courses }) {
  const logo = exams.find((exam) => exam.id === course.program)?.logo;

  return (
    <section aria-labelledby="explore" className="bg-brand-orange">
      <div className="site-container py-12 lg:py-14">
        <div className="flex items-center justify-between gap-6">
          <h2
            id="explore"
            className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl"
          >
            <span className="font-coiny font-normal">Explore</span> Other{" "}
            {course.programName} Courses &amp; Mock Tests
          </h2>
          {logo && (
            <Image
              src={logo}
              alt={course.programName}
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
            {courses.map((item, index) => (
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
      </div>
    </section>
  );
}
