import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  ChevronDownIcon,
  MapPinIcon,
  TicketIcon,
} from "@/components/icons";

const detail = "flex items-start gap-2.5";

const detailIcon = "mt-0.5 size-5 shrink-0 text-brand-orange";

// Top of an event details page: what, when and where on the left, the event
// picture on the right (below on phones), in the style of the event cards.
// `event` is in the shape of data/events.js. ended: the event day has gone by, so there is no registration.
export default function EventHero({ event, ended = false }) {
  return (
    <section className="bg-[#e4f6fa]">
      <div className="site-container grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-14 lg:py-14">
        {/* Details — they slide in one after another on page load */}
        <div>
          <nav
            aria-label="Breadcrumb"
            className="animate-fade-up text-sm motion-reduce:animate-none"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-brand-orange">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronDownIcon className="size-4 -rotate-90 text-brand-orange" />
              </li>
              <li>
                <Link href="/events" className="hover:text-brand-orange">
                  Events
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronDownIcon className="size-4 -rotate-90 text-brand-orange" />
              </li>
              <li aria-current="page" className="font-semibold">
                {event.title}
              </li>
            </ol>
          </nav>

          <p className="mt-5 flex animate-fade-up flex-wrap gap-2 text-sm font-bold text-white [animation-delay:100ms] motion-reduce:animate-none">
            <span className="bg-brand-orange px-2 py-1">{event.type}</span>
            {ended && <span className="bg-ink/70 px-2 py-1">Event Ended</span>}
          </p>
          <h1 className="mt-3 animate-fade-up text-3xl leading-tight font-semibold text-brand-orange [animation-delay:100ms] motion-reduce:animate-none sm:text-4xl lg:text-[2.625rem]">
            {event.title}
          </h1>
          <p className="mt-4 max-w-xl animate-fade-up [animation-delay:200ms] motion-reduce:animate-none sm:text-lg">
            {event.summary}
          </p>

          <ul className="mt-6 space-y-3 animate-fade-up [animation-delay:300ms] motion-reduce:animate-none sm:text-lg">
            <li className={detail}>
              <CalendarIcon className={detailIcon} strokeWidth={1.5} />
              {event.date} | {event.time}
            </li>
            <li className={detail}>
              <MapPinIcon className={detailIcon} strokeWidth={1.5} />
              {event.location}
            </li>
            <li className={detail}>
              <TicketIcon className={detailIcon} strokeWidth={1.5} />
              {ended
                ? "This event has ended"
                : "Free entry — registration required"}
            </li>
          </ul>

          {!ended && (
            <a
              href="#register"
              className="mt-7 inline-block animate-fade-up rounded-md border border-brand-orange bg-brand-orange px-5 py-2.5 font-semibold text-white transition-colors [animation-delay:300ms] hover:bg-transparent hover:text-brand-orange motion-reduce:animate-none"
            >
              Register for Free
            </a>
          )}
        </div>

        <div className="animate-pop-in border border-black/15 bg-card shadow-[0.5rem_0.5rem_0_var(--color-brand-blue)] [animation-delay:200ms] motion-reduce:animate-none">
          <Image
            src={event.image}
            alt={event.imageAlt ?? ""}
            width={1200}
            height={628}
            sizes="(min-width: 1024px) 45vw, 100vw"
            preload
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
