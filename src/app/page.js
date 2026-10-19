import Awards from "@/components/Awards";
import CustomCourse from "@/components/CustomCourse";
import Hero from "@/components/Hero";
import LanguageCourses from "@/components/LanguageCourses";
import Partners from "@/components/Partners";
import ProgramSection from "@/components/ProgramSection";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import StudentReviews from "@/components/StudentReviews";
import Testimonials from "@/components/Testimonials";
import UpcomingEvents from "@/components/UpcomingEvents";
import WhyChooseUs from "@/components/WhyChooseUs";
import { ieltsProgram, pteProgram, withProgramExam } from "@/data/programs";
import {
  getExamRegistrations,
  getHomeContent,
  getProgramExams,
} from "@/lib/api";

export default async function Home() {
  // Events, results, courses, awards and reviews come from the admin. When it cannot be
  // reached, every section shows its built-in content (src/data) instead.
  // The IELTS and PTE exam and mock test cards are set on each program's courses page there.
  const [content, exams, registrations] = await Promise.all([
    getHomeContent(),
    getProgramExams(),
    getExamRegistrations(),
  ]);

  const ielts = withProgramExam(
    content
      ? { ...ieltsProgram, courses: content.courses.ielts }
      : ieltsProgram,
    exams,
    registrations,
  );
  const pte = withProgramExam(
    content ? { ...pteProgram, courses: content.courses.pte } : pteProgram,
    exams,
    registrations,
  );

  return (
    <>
      <Hero />
      {/* Every section below the hero fades in and slides up as it scrolls into view */}
      <Reveal>
        <Stats />
      </Reveal>
      {/* No upcoming events in the admin: the section is left out */}
      {(!content || content.events.length > 0) && (
        <Reveal>
          <UpcomingEvents events={content?.events} />
        </Reveal>
      )}
      {(!content || content.testimonials.length > 0) && (
        <Reveal>
          <Testimonials
            exams={content?.exams}
            testimonials={content?.testimonials}
          />
        </Reveal>
      )}
      <Reveal>
        <ProgramSection program={ielts} />
      </Reveal>
      <Reveal>
        <ProgramSection program={pte} />
      </Reveal>
      {(!content || content.languageCourses.length > 0) && (
        <Reveal>
          <LanguageCourses courses={content?.languageCourses} />
        </Reveal>
      )}
      <Reveal>
        <CustomCourse />
      </Reveal>
      {(!content || content.awards.length > 0) && (
        <Reveal>
          <Awards awards={content?.awards} />
        </Reveal>
      )}
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      {/* "Here's What Our Students Say" — left out when the admin has no published reviews */}
      {(!content || content.reviews.length > 0) && (
        <Reveal>
          <StudentReviews reviews={content?.reviews} />
        </Reveal>
      )}
      <Reveal>
        <Partners />
      </Reveal>
    </>
  );
}
