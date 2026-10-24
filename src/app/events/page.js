import CustomCourse from "@/components/CustomCourse";
import EventSideCta from "@/components/EventSideCta";
import EventsHero from "@/components/EventsHero";
import EventTimeline from "@/components/EventTimeline";
import Reveal from "@/components/Reveal";
import StudentReviews from "@/components/StudentReviews";
import WhyChooseUs from "@/components/WhyChooseUs";
import { eventMonths as builtInEventMonths } from "@/data/events";
import { getEventMonths, getStudentReviews } from "@/lib/api";

export const metadata = {
  title: "Upcoming Events | Enhance English",
  description:
    "Free workshops, masterclasses, mock tests and club sessions, specifically curated to help you improve your English skills and achieve your goals.",
};

// Every upcoming event on a timeline, grouped by month, with a "Can't find the event" card beside it
// (below it on phones and tablets). The events come from the admin, or data/events.js when the
// admin cannot be reached.
export default async function EventsPage() {
  const [cmsMonths, reviews] = await Promise.all([
    getEventMonths(),
    getStudentReviews(),
  ]);
  const months = cmsMonths ?? builtInEventMonths;

  return (
    <>
      <EventsHero />

      <section aria-label="All events" className="bg-surface">
        <div className="site-container grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:py-16 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-14">
          {months.length > 0 ? (
            <EventTimeline months={months} />
          ) : (
            <p className="self-start border border-black/15 bg-card px-6 py-12 text-center shadow-[0.25rem_0.25rem_0_var(--color-brand-blue)] sm:text-lg">
              <strong className="block text-xl text-brand-orange">
                No upcoming events right now
              </strong>
              New workshops and mock tests are added often, so please check back
              soon.
            </p>
          )}

          {/* Stays in view beside the timeline on desktop */}
          <div className="mx-auto w-full max-w-sm lg:sticky lg:top-24 lg:max-w-none lg:self-start">
            <Reveal>
              <EventSideCta />
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal>
        <WhyChooseUs />
      </Reveal>

      {/* "Here's What Our Students Say" — left out when the admin has no published reviews */}
      <Reveal>
        <StudentReviews reviews={reviews} />
      </Reveal>

      <Reveal>
        <CustomCourse />
      </Reveal>
    </>
  );
}
