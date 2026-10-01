import Button from "@/components/Button";
import { CalendarIcon, MonitorIcon } from "@/components/icons";

const detail = "flex items-start gap-2";

const detailIcon = "mt-0.5 size-5 shrink-0 text-brand-orange";

export default function CourseCard({ course }) {
  return (
    // Hover: the card lifts and its yellow edge grows.
    <article className="flex h-full flex-col border border-black/15 bg-card p-6 shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0.5rem_0.5rem_0_var(--color-brand-yellow)]">
      <h3 className="text-[1.375rem] leading-tight font-semibold">
        {course.title}
      </h3>

      {/* The second detail drops to its own line when the card is too narrow */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.9375rem]">
        <li className={`${detail} shrink-0`}>
          <CalendarIcon className={detailIcon} strokeWidth={1.5} />
          {course.duration}
        </li>
        <li className={`${detail} min-w-0 flex-1 basis-36`}>
          <MonitorIcon className={detailIcon} strokeWidth={1.5} />
          {course.classes}
        </li>
      </ul>

      {/* mt-auto keeps the price and buttons on the bottom line of every card */}
      <p className="mt-auto pt-5 text-sm">
        Price <strong className="text-2xl">৳{course.price}</strong>
      </p>
      <div className="mt-2 flex flex-wrap gap-2.5">
        <Button href={`${course.href}#join`}>Join Now</Button>
        <Button href={course.href} variant="outline">
          Learn More
        </Button>
      </div>
    </article>
  );
}
