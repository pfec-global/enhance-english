import CustomCourse from "@/components/CustomCourse";
import EventCard from "@/components/EventCard";
import { CalendarHeartIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { events } from "@/data/events";

export const metadata = {
  title: "Upcoming Events | Enhance English",
  description:
    "Free workshops, masterclasses, mock tests and club sessions, specifically curated to help you improve your English skills and achieve your goals.",
};

// Every event, with the same cards as the home page (components/EventCard.jsx).
export default function EventsPage() {
  return (
    <>
      <section className="bg-[#e4f6fa]">
        <div className="site-container py-10 text-center lg:py-14">
          <CalendarHeartIcon
            className="mx-auto size-10 animate-fade-up text-brand-orange motion-reduce:animate-none"
            strokeWidth={1.5}
          />
          <h1 className="mt-3 animate-fade-up text-3xl font-semibold [animation-delay:100ms] motion-reduce:animate-none sm:text-4xl lg:text-5xl">
            Upcoming{" "}
            <span className="font-coiny font-normal text-brand-orange">
              Events
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl animate-fade-up [animation-delay:200ms] motion-reduce:animate-none sm:text-lg">
            Free workshops, masterclasses, mock tests and club sessions,
            specifically curated to help you improve your English skills and
            achieve your goals.
          </p>
        </div>
      </section>

      <section aria-label="All events" className="bg-surface">
        {/* 1 card per row on phones, 2 on tablets, 4 on desktop */}
        <ul className="site-container grid gap-6 py-12 sm:grid-cols-2 lg:py-16 xl:grid-cols-4">
          {events.map((event, index) => (
            <li key={event.id}>
              {/* Each card appears as it comes into view, one after another along the row */}
              <Reveal delay={(index % 4) * 120} className="grid h-full">
                <EventCard event={event} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <Reveal>
        <CustomCourse />
      </Reveal>
    </>
  );
}
