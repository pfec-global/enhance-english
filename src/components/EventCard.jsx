import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon } from "@/components/icons";

// Below desktop the two buttons share the card width (and stack on very narrow cards).
const button =
  "flex-1 rounded-md border border-brand-orange px-3.5 py-2.5 text-center text-[0.9375rem] whitespace-nowrap transition-colors xl:flex-none 2xl:px-6";

const detail = "flex items-start gap-2 text-[0.9375rem]";

const detailIcon = "mt-0.5 size-5 shrink-0 text-brand-orange";

export default function EventCard({ event }) {
  return (
    // Hover: the card lifts, its blue edge grows and the image zooms in.
    <article className="group flex h-full flex-col border border-black/15 bg-card shadow-[0.25rem_0.25rem_0_var(--color-brand-blue)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0.5rem_0.5rem_0_var(--color-brand-blue)]">
      <div className="overflow-hidden">
        <Image
          src={event.image}
          alt=""
          width={1200}
          height={628}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pt-4 pb-6">
        <h3 className="text-2xl leading-tight font-semibold text-brand-orange">
          {event.title}
        </h3>

        <p className={`${detail} mt-4`}>
          <CalendarIcon className={detailIcon} strokeWidth={1.5} />
          {event.date} | {event.time}
        </p>
        <p className={`${detail} mt-3`}>
          <MapPinIcon className={detailIcon} strokeWidth={1.5} />
          {event.location}
        </p>

        {/* mt-auto keeps the buttons on the bottom line of every card */}
        <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
          <Link
            href={`${event.href}#register`}
            className={`${button} bg-brand-orange font-semibold text-white hover:bg-transparent hover:text-brand-orange`}
          >
            Register for Free
          </Link>
          <Link
            href={event.href}
            className={`${button} text-brand-orange hover:bg-brand-orange hover:text-white`}
          >
            Learn More
          </Link>
        </div>
      </div>
    </article>
  );
}
