import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "@/components/icons";

const button =
  "flex items-center gap-3 rounded-sm border border-brand-orange px-4 py-2.5 text-sm font-semibold transition-colors";

// Top of a course list page (/ielts, /pte, /learn-english): intro on the left,
// picture on a coloured block on the right — the same layout as the course
// page hero (components/CourseHero.jsx). `page` comes from data/programPages.js.
export default function ProgramHero({ page }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: page.colors.hero,
        "--block": page.colors.heroBlock,
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
        phones, tablets: intro, then the picture on a full-width coloured block
        desktop:         intro on the left, picture on the right
      */}
      <div className="site-container relative grid lg:grid-cols-[51fr_49fr]">
        {/* Intro — it slides in from the left one line after another on page load */}
        <div className="flex flex-col justify-center py-10 lg:py-16 lg:pr-10">
          <nav
            aria-label="Breadcrumb"
            className="animate-slide-in text-sm motion-reduce:animate-none"
          >
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-brand-orange">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronDownIcon className="size-4 -rotate-90 text-brand-orange" />
              </li>
              <li aria-current="page" className="font-semibold">
                {page.name} Courses
              </li>
            </ol>
          </nav>

          <h1
            className="mt-4 max-w-[14em] animate-slide-in text-3xl leading-[1.2] font-bold [animation-delay:100ms] motion-reduce:animate-none sm:text-4xl lg:text-[2.625rem]"
            style={{ color: page.colors.title }}
          >
            {page.title}
          </h1>

          <p className="mt-4 max-w-xl animate-slide-in [animation-delay:200ms] motion-reduce:animate-none sm:text-lg">
            {page.text}
          </p>

          <div className="mt-7 flex animate-slide-in flex-wrap gap-x-4 gap-y-3 [animation-delay:300ms] motion-reduce:animate-none">
            <a
              href="#courses"
              className={`${button} bg-brand-orange text-white hover:bg-transparent hover:text-brand-orange`}
            >
              Explore Courses
              <ArrowRightIcon className="size-5 rotate-90" />
            </a>
            <Link
              href="/book-demo"
              className={`${button} bg-white/60 hover:bg-brand-orange hover:text-white`}
            >
              Book Free Demo Class
              <CalendarIcon className="size-5" />
            </Link>
          </div>
        </div>

        {/* Picture. On phones and tablets its coloured block runs to both screen edges. */}
        <div className="-mx-6 flex items-center justify-center bg-(--block) px-6 py-8 lg:mx-0 lg:bg-transparent lg:py-11 lg:pr-0 lg:pl-10">
          <div
            className={`relative w-full max-w-md animate-pop-in overflow-hidden [animation-delay:200ms] motion-reduce:animate-none lg:max-w-[28rem] ${
              page.illustration ? "aspect-[812/758]" : "aspect-square rounded-sm"
            }`}
          >
            {/*
              Photo: it is wide, so it is cropped to a square around the student in front.
              Illustration: shown whole.
            */}
            <Image
              src={page.image}
              alt={page.imageAlt}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 512px) 448px, 100vw"
              preload
              className={
                page.illustration
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
