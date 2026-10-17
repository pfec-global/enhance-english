import { notFound } from "next/navigation";
import EventCard from "@/components/EventCard";
import EventHero from "@/components/EventHero";
import EventRegisterForm from "@/components/EventRegisterForm";
import { ListCheckIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { events, getEvent } from "@/data/events";

// Event details page, e.g. /events/ielts-grammar-workshop. Every event in
// data/events.js gets one; any other address shows "page not found".
export const dynamicParams = false;

export function generateStaticParams() {
  return events.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = getEvent(slug);

  return event
    ? {
        title: `${event.title} | Enhance English Events`,
        description: event.summary,
      }
    : {};
}

export default async function EventPage({ params }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const others = events.filter((other) => other.slug !== slug);

  return (
    <>
      <EventHero event={event} />

      {/*
        phones, tablets: about the event, then the registration form
        desktop:         about on the left, the form on the right (it stays in view while scrolling)
      */}
      <section className="site-container grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 lg:py-16">
        <div>
          <h2 className="text-2xl font-bold lg:text-3xl">About this Event</h2>
          {event.about.map((paragraph) => (
            <p key={paragraph} className="mt-4 sm:text-lg">
              {paragraph}
            </p>
          ))}

          <h2 className="mt-10 text-2xl font-bold lg:text-3xl">
            What You’ll Learn
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {event.highlights.map((highlight, index) => (
              <li key={highlight}>
                <Reveal delay={(index % 2) * 120} className="grid h-full">
                  <p className="flex items-start gap-3 border border-black/15 bg-card p-4 shadow-[0.25rem_0.25rem_0_var(--color-brand-blue)]">
                    <ListCheckIcon
                      className="mt-0.5 size-5 shrink-0 text-brand-orange"
                      strokeWidth={1.5}
                    />
                    {highlight}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* "Register for Free" on the cards and in the hero leads here */}
        <div id="register" className="scroll-mt-28 lg:sticky lg:top-28">
          <EventRegisterForm event={event} />
        </div>
      </section>

      {others.length > 0 && (
        <section aria-labelledby="more-events" className="bg-surface">
          <div className="site-container py-12 lg:py-16">
            <h2
              id="more-events"
              className="text-center text-3xl font-semibold sm:text-4xl"
            >
              More Upcoming{" "}
              <span className="font-coiny font-normal text-brand-orange">
                Events
              </span>
            </h2>
            {/* 1 card per row on phones, 2 on tablets, 3 on desktop */}
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.slice(0, 3).map((other, index) => (
                <li key={other.id}>
                  <Reveal delay={index * 120} className="grid h-full">
                    <EventCard event={other} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
