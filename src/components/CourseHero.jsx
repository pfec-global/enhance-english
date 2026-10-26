import Image from "next/image";
import CoursePricing from "@/components/CoursePricing";

// Top of a course page: course details on the left, photo on a coloured block on
// the right. `course` comes from data/coursePages.js; its program sets the colours
// (orange block on cream for IELTS, blue block on light blue for PTE, purple block
// on grey for English). English courses show an illustration instead of a photo.
export default function CourseHero({ course }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: course.colors.hero,
        "--block": course.colors.heroBlock,
      }}
    >
      {/* Background ribbon */}
      <Image
        src="/image/rebon.png"
        alt=""
        width={3840}
        height={1219}
        sizes="(min-width: 1024px) 100vw, 1024px"
        className="absolute bottom-0 left-0 h-auto w-[max(100%,64rem)] max-w-none"
      />

      {/* Desktop: the coloured block runs from the middle to the right edge of the screen */}
      <div className="absolute inset-y-0 right-0 left-[51%] hidden bg-(--block) lg:block" />

      {/*
        phones, tablets: details, then the photo on a full-width coloured block
        desktop:         details on the left, photo on the right
      */}
      <div className="site-container relative grid lg:grid-cols-[51fr_49fr]">
        {/* Details — they slide in from the left one after another on page load */}
        <div className="py-10 lg:py-11 lg:pr-10">
          <p className="w-fit animate-slide-in bg-brand-orange px-2 py-1 text-sm font-bold text-white motion-reduce:animate-none">
            {course.programName} Course
          </p>

          <h1
            className="mt-3 max-w-[14em] animate-slide-in text-3xl leading-[1.2] font-bold [animation-delay:100ms] motion-reduce:animate-none sm:text-4xl lg:text-[2.625rem]"
            style={{ color: course.colors.title }}
          >
            {course.title}
            {course.level && (
              <span className="font-normal"> {course.level}</span>
            )}
          </h1>

          <div className="animate-slide-in [animation-delay:200ms] motion-reduce:animate-none">
            <div className="mt-5 font-semibold sm:text-lg">
              {course.highlights.map((line, index) => (
                <p key={index} className="mt-1">
                  {line}
                </p>
              ))}
            </div>

            <ul className="mt-5 space-y-1.5 sm:text-lg">
              {course.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <span className="size-2.5 shrink-0 rounded-full bg-brand-orange" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-in [animation-delay:300ms] motion-reduce:animate-none">
            <CoursePricing course={course} placement="hero" />
          </div>
        </div>

        {/* Photo. On phones and tablets its coloured block runs to both screen edges. */}
        <div className="-mx-6 flex items-center justify-center bg-(--block) px-6 py-8 lg:mx-0 lg:bg-transparent lg:py-11 lg:pr-0 lg:pl-10">
          <div
            className={`relative w-full max-w-md animate-pop-in overflow-hidden [animation-delay:200ms] motion-reduce:animate-none lg:max-w-[32.75rem] ${
              course.illustration ? "aspect-[812/758]" : "aspect-square rounded-sm"
            }`}
          >
            {/*
              Photo: it is wide, so it is cropped to a square around the student in front.
              Illustration: shown whole.
            */}
            <Image
              src={course.image}
              alt={course.imageAlt}
              fill
              sizes="(min-width: 1024px) 34vw, (min-width: 512px) 448px, 100vw"
              preload
              className={
                course.illustration
                  ? "object-contain"
                  : "object-cover object-[32%_center]"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
