import { notFound } from "next/navigation";
import CustomCourse from "@/components/CustomCourse";
import LanguageCourses from "@/components/LanguageCourses";
import ProgramHero from "@/components/ProgramHero";
import ProgramSection from "@/components/ProgramSection";
import Reveal from "@/components/Reveal";
import StudentReviews from "@/components/StudentReviews";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import { getProgramPage, programPages } from "@/data/programPages";
import { ieltsProgram, pteProgram } from "@/data/programs";
import { getCourses, getProgram, getStudentReviews, getTestimonials } from "@/lib/api";

// Course list page: /ielts, /pte or /learn-english. The top section, the course
// cards, the student results and reviews come from the admin; when it cannot be reached
// (or the page has not been saved there yet) the built-in content is shown
// (data/programPages.js, data/programs.js, data/languageCourses.js).
// Any other address shows "page not found".
export const dynamicParams = false;

export function generateStaticParams() {
  return programPages.map(({ program }) => ({ program }));
}

const examPrograms = { ielts: ieltsProgram, pte: pteProgram };

// The built-in page with the admin's top section on it, when there is one
async function findProgramPage(program) {
  const builtIn = getProgramPage(program);
  if (!builtIn) return null;
  return { ...builtIn, ...(await getProgram(program)) };
}

export async function generateMetadata({ params }) {
  const { program } = await params;
  const page = await findProgramPage(program);
  if (!page) return {};

  return {
    title: page.seo?.title ?? `${page.name} Courses | Enhance English`,
    description: page.seo?.description ?? page.text,
    keywords: page.seo?.keywords?.length ? page.seo.keywords : undefined,
  };
}

export default async function ProgramPage({ params }) {
  const { program } = await params;
  const [page, allCourses, results, reviews] = await Promise.all([
    findProgramPage(program),
    getCourses(),
    getTestimonials(),
    getStudentReviews(),
  ]);
  if (!page) notFound();

  // The admin's course cards of this program (undefined: the built-in ones)
  const courses = allCourses?.filter((course) => course.program === program);

  return (
    <>
      <ProgramHero page={page} />
      {/* "Explore Courses" in the hero scrolls here; scroll-mt keeps it clear of the sticky header */}
      <div id="courses" className="scroll-mt-24 lg:scroll-mt-28">
        {/* The course cards: the same sections as on the home page */}
        {examPrograms[program] ? (
          <ProgramSection
            program={{ ...examPrograms[program], ...(courses && { courses }) }}
          />
        ) : (
          <LanguageCourses courses={courses} />
        )}
      </div>
      {/* On exam pages the results are limited to that exam */}
      <Reveal>
        <Testimonials exam={page.testimonials} {...results} />
      </Reveal>
      <Reveal>
        <CustomCourse />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <StudentReviews reviews={reviews} />
      </Reveal>
    </>
  );
}
