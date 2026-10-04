import Link from "next/link";
import { CalendarIcon, CartIcon } from "@/components/icons";

const button =
  "flex items-center gap-3 rounded-sm border border-brand-orange px-4 py-2.5 text-sm font-semibold transition-colors";

// Prices and the two buttons of a course. Shown in the hero and again in the
// "What's Covered?" section. `course` comes from data/coursePages.js.
export default function CoursePricing({ course }) {
  return (
    <>
      <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2">
        <p className="text-xs font-bold">
          Actual Price{" "}
          <s className="text-lg font-medium">৳{course.actualPrice}</s>
        </p>
        <p className="bg-brand-yellow px-2 py-1.5 text-xs">
          {course.offer.label} <strong>{course.offer.value}</strong>
        </p>
      </div>

      <p className="mt-2 text-sm">
        Effective Price after Discount{" "}
        <strong className="text-[1.75rem] leading-none">
          ৳{course.effectivePrice}
        </strong>
      </p>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3">
        <Link
          href={course.buyHref}
          className={`${button} bg-brand-orange text-white hover:bg-transparent hover:text-brand-orange`}
        >
          Buy Course
          <CartIcon className="size-5" />
        </Link>
        <Link
          href={course.demoHref}
          className={`${button} bg-white/60 hover:bg-brand-orange hover:text-white`}
        >
          Book Free Demo Class
          <CalendarIcon className="size-5" />
        </Link>
      </div>
    </>
  );
}
