import EventCard from "@/components/EventCard";
import { CalendarHeartIcon } from "@/components/icons";
import Slider from "@/components/Slider";
import { events } from "@/data/events";

export default function UpcomingEvents() {
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

        {/* Auto-playing slider on phones, 2 columns on tablets, 4 on desktop */}
        <div className="mt-6 sm:mt-8">
          <Slider
            className="sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:py-0 xl:grid-cols-4"
            slideClassName="w-[85%] sm:w-auto"
          >
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
