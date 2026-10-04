import CoursePricing from "@/components/CoursePricing";
import Reveal from "@/components/Reveal";
import {
  BookOpenIcon,
  CalendarIcon,
  HourglassIcon,
  LetterIcon,
  ListCheckIcon,
  TicketIcon,
} from "@/components/icons";

const icons = {
  calendar: CalendarIcon,
  book: BookOpenIcon,
  hourglass: HourglassIcon,
  list: ListCheckIcon,
  letter: LetterIcon,
  ticket: TicketIcon,
};

// "What's Covered?" on a course page: what the course includes on the left, the
// price card on the right. `course` comes from data/coursePages.js.
export default function CourseCovered({ course }) {
  return (
    <section aria-labelledby="covered" className="relative bg-surface">
      {/*
        Doodle background. The picture is pink, so it is turned grey and faded here.
        It fills the width on desktop and repeats on smaller screens.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url(/image/ielts_bg.png)] bg-size-[max(100%,75rem)_auto] bg-top opacity-50 grayscale"
      />

      <div className="site-container relative py-12 lg:py-16">
        <h2 id="covered" className="text-3xl font-bold lg:text-4xl">
          What’s Covered?
        </h2>

        {/*
          phones, tablets: the cards, then the price card below them
          desktop:         cards on the left, price card on the right (it stays in view while scrolling)
        */}
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_33%] lg:gap-10">
          {/* 1 card per row on phones; from tablets up the `half` cards sit two per row */}
          <ul className="grid gap-4 sm:grid-cols-2">
            {course.covered.map((item, index) => {
              const ItemIcon = icons[item.icon];

              return (
                <li
                  key={item.title}
                  className={item.half ? "" : "sm:col-span-2"}
                >
                  {/* Each card appears as it scrolls into view */}
                  <Reveal delay={(index % 2) * 120} className="grid h-full">
                    {/* Hover: the card lifts and its yellow edge grows */}
                    <article className="border border-black/15 bg-white px-5 pt-4 pb-5 shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)] transition duration-300 hover:-translate-y-1 hover:shadow-[0.5rem_0.5rem_0_var(--color-brand-yellow)]">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg leading-snug font-bold lg:text-xl">
                          {item.title}
                        </h3>
                        <ItemIcon
                          className="mt-0.5 size-6 shrink-0"
                          strokeWidth={1.5}
                        />
                      </div>
                      <p className="mt-2 text-[0.9375rem]">{item.text}</p>
                      {item.points && (
                        <ul className="mt-1 list-disc pl-9 text-[0.9375rem]">
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <Reveal className="lg:sticky lg:top-28">
            <aside className="border border-black/25 bg-[#fdecea] p-6 shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)]">
              <h3 className="max-w-[14em] text-2xl leading-tight font-bold lg:text-[1.75rem]">
                {course.title}
              </h3>
              <CoursePricing course={course} />
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
