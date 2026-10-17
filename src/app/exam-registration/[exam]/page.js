import { notFound } from "next/navigation";
import RegistrationHero from "@/components/RegistrationHero";
import RegistrationOptions from "@/components/RegistrationOptions";
import RegistrationSteps from "@/components/RegistrationSteps";
import RegistrationWhy from "@/components/RegistrationWhy";
import Reveal from "@/components/Reveal";
import StudentReviews from "@/components/StudentReviews";
import Testimonials from "@/components/Testimonials";
import VenueSection from "@/components/VenueSection";
import {
  getRegistrationPage,
  registrationPages,
} from "@/data/examRegistration";

// Exam registration page: /exam-registration/ielts or /exam-registration/pte.
// Any other address shows "page not found".
export const dynamicParams = false;

export function generateStaticParams() {
  return registrationPages.map(({ exam }) => ({ exam }));
}

export async function generateMetadata({ params }) {
  const { exam } = await params;
  const page = getRegistrationPage(exam);

  return { title: page && `${page.name} Exam Registration | Enhance English` };
}

export default async function RegistrationPage({ params }) {
  const { exam } = await params;
  const page = getRegistrationPage(exam);
  if (!page) notFound();

  return (
    <>
      <RegistrationHero page={page} />
      <RegistrationWhy page={page} />
      <Reveal>
        <RegistrationSteps page={page} />
      </Reveal>
      <Reveal>
        <RegistrationOptions page={page} />
      </Reveal>
      <Reveal>
        <VenueSection page={page} />
      </Reveal>
      {/* Same sections as on the home page; the results are limited to this exam */}
      <Reveal>
        <Testimonials exam={page.exam} />
      </Reveal>
      <Reveal>
        <StudentReviews />
      </Reveal>
    </>
  );
}
