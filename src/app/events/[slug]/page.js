import Link from "next/link";
import { notFound } from "next/navigation";
import EventAudience from "@/components/EventAudience";
import EventCard from "@/components/EventCard";
import EventHero from "@/components/EventHero";
import { ListCheckIcon } from "@/components/icons";
import RegistrationForm from "@/components/RegistrationForm";
import Reveal from "@/components/Reveal";
import SignUpCta from "@/components/SignUpCta";
import StudentReviews from "@/components/StudentReviews";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import { events as builtInEvents } from "@/data/events";
import { getEvents, getStudentReviews, getTestimonials } from "@/lib/api";
import {
  examOf,
  findEvent,
  findRegistrationPage,
  hasEnded,
  thankYouHref,
} from "@/lib/events";

// Event details page, e.g. /events/ielts-grammar-workshop, for every published event in the admin.
// When the admin cannot be reached, the events of data/events.js are shown instead.
// Any other address shows "page not found". Once its form is sent, it leads to the
// thank-you page with this event (/thank-you?event=…, app/thank-you/page.js).

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = await findEvent(slug);
  if (!event) return {};

  return {
    title: event.seo?.title ?? `${event.title} | Enhance English Events`,
    description: event.seo?.description ?? event.summary,
    keywords: event.seo?.keywords?.length ? event.seo.keywords : undefined,
  };
}

export default async function EventPage({ params }) {
  const { slug } = await params;
  const [event, upcoming, reviews, results] = await Promise.all([
    findEvent(slug),
    getEvents(),
    getStudentReviews(),
    getTestimonials(),
  ]);
  if (!event) notFound();
  const exam = examOf(event);
  const registration = await findRegistrationPage(exam);

  const ended = hasEnded(event);
  const others = (upcoming ?? builtInEvents).filter(
    (other) => other.slug !== slug,
  );
  // The sign-up buttons lead to the form; once the event is over, to the upcoming events
  const signUp = ended
    ? { href: "/events", label: "See Upcoming Events" }
    : { href: "#register", label: "Sign up for Free" };

  return (
    <>
      <EventHero event={event} ended={ended} />

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

          {event.highlights.length > 0 && (
            <>
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
            </>
          )}
        </div>

        {/* The "Register for Free" and "Sign up for Free" buttons lead here */}
        <div id="register" className="scroll-mt-28 lg:sticky lg:top-28">
          {ended ? (
            <div className="border border-black/25 bg-[#fdecea] p-6 text-center shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)] lg:p-7">
              <h2 className="text-xl leading-snug font-bold lg:text-[1.375rem]">
                This event has ended
              </h2>
              <p className="mt-2 text-sm text-ink/70">
                Registration is closed. Have a look at our upcoming events
                instead.
              </p>
              <Link
                href="/events"
                className="mt-6 inline-block rounded-md border border-brand-orange bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
              >
                See Upcoming Events
              </Link>
            </div>
          ) : (
            <RegistrationForm
              page={registration}
              successHref={thankYouHref(event)}
            />
          )}
        </div>
      </section>

      <Reveal>
        <EventAudience>
          <SignUpCta
            {...signUp}
            text="Sounds like you are one of them? Don't wait any further."
            className="mt-8"
          />
        </EventAudience>
      </Reveal>

      <Reveal>
        <Testimonials exam={exam} {...results}>
          <SignUpCta
            {...signUp}
            text="Learn the strategies behind these scores from the same trainers, for free."
            className="mt-8"
          />
        </Testimonials>
      </Reveal>

      {/* "Here's What Our Students Say" — left out when the admin has no published reviews */}
      <Reveal>
        <StudentReviews reviews={reviews} />
      </Reveal>

      <Reveal>
        <WhyChooseUs>
          <SignUpCta
            {...signUp}
            text="Meet our certified trainers and get expert guidance at this free event. Seats are limited."
            className="mt-10"
          />
        </WhyChooseUs>
      </Reveal>

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
