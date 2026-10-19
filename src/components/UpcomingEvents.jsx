import EventCard from "@/components/EventCard";
import { CalendarHeartIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import Slider from "@/components/Slider";
import { events as builtInEvents } from "@/data/events";

// `events` in the shape of data/events.js; the home page passes the admin's (see lib/api.js).
export default function UpcomingEvents({ events = builtInEvents }) {
  return (
    <section aria-labelledby="upcoming-events" className="bg-surface">
      <div className="site-container py-14 lg:py-16">
        <div className="text-center">
          <CalendarHeartIcon className="mx-auto size-9" strokeWidth={1.5} />
          <h2
            id="upcoming-events"
            className="mt-2 text-3xl font-semibold sm:text-4xl"
          >
            Upcoming{" "}
            <span className="font-coiny font-normal text-brand-orange">
              Events
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base">
            Specifically curated to help you improve your English skills and
            achieve your goals.
          </p>
        </div>

        {/* Always sliding, round and round. 1 card per view on phones (the next one peeks in), 2 on tablets, 4 on desktop */}
        <div className="mt-6 sm:mt-8">
          <Slider
            loop
            className="sm:gap-6"
            slideClassName="w-[85%] sm:w-[calc((100%-1.5rem)/2)] xl:w-[calc((100%-4.5rem)/4)]"
          >
            {/* Each card appears as it comes into view, one after another along the row */}
            {events.map((event, index) => (
              <Reveal
                key={event.id}
                delay={(index % 4) * 120}
                className="grid h-full"
              >
                <EventCard event={event} />
              </Reveal>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
