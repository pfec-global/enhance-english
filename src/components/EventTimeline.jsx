import EventListCard from "@/components/EventListCard";
import Reveal from "@/components/Reveal";

// The events grouped by month: a yellow month badge with a line running down beside that month's
// cards. On phones the badge sits above the cards instead.
// `months` in the shape of the admin's /event-months (see getEventMonths in lib/api.js).
export default function EventTimeline({ months }) {
  return (
    <div className="space-y-10 lg:space-y-14">
      {months.map((month) => (
        <section
          key={month.month}
          aria-labelledby={`events-${month.month}`}
          className="grid gap-5 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-6"
        >
          <div className="flex flex-col items-start md:items-center">
            <h2
              id={`events-${month.month}`}
              className="flex items-baseline gap-2 bg-brand-yellow px-4 py-2 text-center leading-tight shadow-[0.25rem_0.25rem_0_var(--color-brand-blue)] md:flex-col md:items-center md:gap-0 md:px-0 md:py-3 md:w-full"
            >
              <span className="text-xl font-bold uppercase md:text-2xl">
                {month.label}
              </span>
              <span className="text-lg md:text-xl">{month.year}</span>
            </h2>
            {/* The line down the month's cards */}
            <span
              aria-hidden="true"
              className="hidden w-px flex-1 bg-ink md:block"
            />
          </div>

          <ul className="space-y-5">
            {month.events.map((event, index) => (
              <li key={event.id}>
                <Reveal delay={Math.min(index, 2) * 100}>
                  <EventListCard event={event} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
