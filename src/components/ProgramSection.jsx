import Image from "next/image";
import CourseCard from "@/components/CourseCard";
import ExamRegisterCard from "@/components/ExamRegisterCard";
import MockTestCard from "@/components/MockTestCard";
import Reveal from "@/components/Reveal";
import Slider from "@/components/Slider";

// One exam's courses, mock tests and exam registration (used for IELTS and for PTE).
// `program` comes from data/programs.js.
export default function ProgramSection({ program }) {
  const headingId = `${program.id}-programs`;

  return (
    // The doodle background fills the width on desktop and repeats on smaller screens.
    <section
      aria-labelledby={headingId}
      className="bg-size-[max(100%,75rem)_auto] bg-top"
      style={{
        backgroundColor: program.backgroundColor,
        backgroundImage: `url(${program.background})`,
        "--accent": program.accentColor,
      }}
    >
      <div className="site-container py-14 lg:py-20">
        <div className="text-center">
          <Image
            src={program.logo.src}
            alt={program.name}
            width={program.logo.width}
            height={program.logo.height}
            sizes="192px"
            className="mx-auto h-auto w-40 lg:w-48"
          />
          <h2
            id={headingId}
            className="mt-6 text-2xl font-semibold sm:text-3xl lg:mt-8 lg:text-4xl"
          >
            <span className="font-coiny font-normal text-(--accent)">
              {program.name}
            </span>{" "}
            {program.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base">
            Join <strong>expert-led courses and mock tests</strong> designed to
            help you achieve your target score. Prepare smarter, succeed
            faster.
          </p>
        </div>

        {/* Courses: auto-playing slider on phones, 2 per row on tablets, 3 on desktop (last row centred) */}
        <div className="mx-auto mt-8 max-w-[75.5rem] lg:mt-10">
          <Slider
            className="sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:py-0 lg:gap-8"
            slideClassName="w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-4rem)/3)]"
          >
            {/* Each card appears as it comes into view, one after another along the row */}
            {program.courses.map((course, index) => (
              <Reveal
                key={course.id}
                delay={(index % 3) * 120}
                className="grid h-full"
              >
                <CourseCard course={course} />
              </Reveal>
            ))}
          </Slider>
        </div>

        {/* Mock tests and exam registration: stacked, side by side on desktop */}
        <div className="mx-auto mt-8 grid max-w-[80rem] gap-6 lg:mt-12 lg:grid-cols-[22rem_1fr]">
          <Reveal className="grid">
            <MockTestCard mockTests={program.mockTests} />
          </Reveal>
          <Reveal delay={120} className="grid">
            <ExamRegisterCard exam={program.exam} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
