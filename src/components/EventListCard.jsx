import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  MapPinIcon,
} from "@/components/icons";

const detail = "flex items-start gap-2 text-sm font-semibold";

const detailIcon = "mt-px size-4.5 shrink-0 text-brand-orange";

// Wide event card on the events page timeline (components/EventTimeline.jsx): picture on the
// left, details on the right; on phones the picture sits on top. The whole card opens the
// event's details page (the title link stretches over it). `event` is in the shape of data/events.js.
export default function EventListCard({ event }) {
  return (
    // Hover: the card lifts, its blue edge grows and the image zooms in.
    <article className="group relative grid border border-black/15 bg-card shadow-[0.25rem_0.25rem_0_var(--color-brand-blue)] transition duration-300 hover:-translate-y-1 hover:shadow-[0.5rem_0.5rem_0_var(--color-brand-blue)] sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="relative aspect-[1200/628] overflow-hidden border-black/15 sm:aspect-auto sm:min-h-48 sm:border-r">
        <Image
          src={event.image}
          alt={event.imageAlt ?? ""}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col px-5 py-4 sm:py-5">
        <h3 className="text-lg leading-snug font-semibold text-brand-orange sm:text-xl">
          <Link
            href={event.href}
            className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-brand-orange focus-visible:after:ring-offset-2"
          >
            {event.title}
          </Link>
        </h3>

        {event.summary && (
          <p className="mt-2 line-clamp-3 text-sm">{event.summary}</p>
        )}

        <p className={`${detail} mt-3`}>
          <CalendarIcon className={detailIcon} strokeWidth={1.5} />
          {event.date} | {event.time}
        </p>
        <p className={`${detail} mt-2`}>
          <MapPinIcon className={detailIcon} strokeWidth={1.5} />
          {event.location}
        </p>

        {/* Only a label: the stretched title link already opens the event */}
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1 pt-3 text-sm text-brand-orange group-hover:underline"
        >
          Learn More <ArrowUpRightIcon className="size-4" />
        </span>
      </div>
    </article>
  );
}
