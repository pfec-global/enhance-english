import Image from "next/image";
import { CalendarIcon, MapPinIcon } from "@/components/icons";

const detail = "flex items-start gap-2 text-sm font-semibold";

const detailIcon = "mt-px size-4.5 shrink-0 text-brand-orange";

// Top of an event details page: the "Events" tag, title, summary and a white box with when and
// where on the left; the event picture in a frame with soft circles behind it on the right
// (below on phones). Indigo band with blue edges, like the events list hero (EventsHero.jsx).
// `event` is in the shape of data/events.js. ended: the event day has gone by.
export default function EventHero({ event, ended = false }) {
  return (
    <section className="overflow-hidden border-y-4 border-brand-blue bg-[#1d297c] text-white">
      <div className="site-container grid items-center gap-10 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-14 lg:py-14">
        <div>
          <p className="flex animate-fade-up flex-wrap gap-2 text-xs font-semibold motion-reduce:animate-none">
            <span className="bg-brand-orange px-2 py-1">Events</span>
            {ended && <span className="bg-white/20 px-2 py-1">Event Ended</span>}
          </p>
          <h1 className="mt-4 max-w-2xl animate-fade-up text-3xl leading-tight font-bold [animation-delay:100ms] motion-reduce:animate-none sm:text-4xl lg:text-[2.75rem]">
            {event.title}
          </h1>
          {event.summary && (
            <p className="mt-4 max-w-xl animate-fade-up text-sm text-white/85 [animation-delay:200ms] motion-reduce:animate-none sm:text-base">
              {event.summary}
            </p>
          )}

          <div className="mt-6 inline-block animate-fade-up space-y-2 bg-white px-4 py-3 text-ink shadow-[0.3rem_0.3rem_0_var(--color-brand-yellow)] [animation-delay:300ms] motion-reduce:animate-none">
            <p className={detail}>
              <CalendarIcon className={detailIcon} strokeWidth={1.5} />
              {event.date} | {event.time}
            </p>
            <p className={detail}>
              <MapPinIcon className={detailIcon} strokeWidth={1.5} />
              {event.location}
            </p>
          </div>
        </div>

        <div className="relative animate-pop-in [animation-delay:200ms] motion-reduce:animate-none">
          {/* Soft circles peeking out behind the picture (not on phones, where it sits under the text) */}
          <div
            aria-hidden="true"
            className="absolute -top-10 -right-6 left-12 hidden grid-cols-4 gap-3 opacity-30 md:grid"
          >
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index} className="aspect-square rounded-full bg-white" />
            ))}
          </div>

          <div className="relative border-2 border-white bg-card shadow-[0.4rem_0.4rem_0_var(--color-brand-yellow)]">
            <Image
              src={event.image}
              alt={event.imageAlt ?? ""}
              width={1200}
              height={628}
              sizes="(min-width: 1024px) 512px, (min-width: 768px) 384px, 100vw"
              preload
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
