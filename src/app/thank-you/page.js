import CoachingCenters from "@/components/CoachingCenters";
import Reveal from "@/components/Reveal";
import SignUpCta from "@/components/SignUpCta";
import StudentReviews from "@/components/StudentReviews";
import Testimonials from "@/components/Testimonials";
import ThankYouHero from "@/components/ThankYouHero";
import WhyChooseUs from "@/components/WhyChooseUs";
import { getStudentReviews, getTestimonials } from "@/lib/api";
import { examOf, findEvent } from "@/lib/events";

// Kept out of search results: it only makes sense right after a form is sent.
export const metadata = {
  title: "Thank You for Registering | Enhance English",
  robots: { index: false, follow: true },
};

// Where every sign-up form leads once it is sent (components/RegistrationForm.jsx).
// The forms on event pages add the event, /thank-you?event=ielts-grammar-workshop: its date,
// time and place are then shown, and the student results are for its exam. An unknown event
// is ignored. Below the hero: the coaching centres, student results and reviews, and why to
// choose Enhance English. The "Sign up for Free" buttons open the free demo class pop-up
// (any link to /book-demo does).
export default async function ThankYouPage({ searchParams }) {
  const { event: slug } = await searchParams;
  const [event, reviews, results] = await Promise.all([
    typeof slug === "string" && slug ? findEvent(slug) : null,
    getStudentReviews(),
    getTestimonials(),
  ]);

  return (
    <>
      <ThankYouHero event={event ?? undefined} />

      <CoachingCenters />

      <Reveal>
        <Testimonials exam={event ? examOf(event) : "ielts"} {...results}>
          <SignUpCta
            href="/book-demo"
            text="Want results like these? Book a free demo class with the same trainers."
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
            href="/book-demo"
            text="Keep the momentum going: try a free class with our certified trainers."
            className="mt-10"
          />
        </WhyChooseUs>
      </Reveal>
    </>
  );
}
