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

// Course list page: /ielts, /pte or /learn-english. Any other address shows
// "page not found".
export const dynamicParams = false;

export function generateStaticParams() {
  return programPages.map(({ program }) => ({ program }));
}

export async function generateMetadata({ params }) {
  const { program } = await params;
  const page = getProgramPage(program);

  return { title: page && `${page.name} Courses | Enhance English` };
}

// The course cards: the same sections as on the home page
const courseLists = {
  ielts: <ProgramSection program={ieltsProgram} />,
  pte: <ProgramSection program={pteProgram} />,
  "learn-english": <LanguageCourses />,
};

export default async function ProgramPage({ params }) {
  const { program } = await params;
  const page = getProgramPage(program);
  if (!page) notFound();

  return (
    <>
      <ProgramHero page={page} />
      {/* "Explore Courses" in the hero scrolls here; scroll-mt keeps it clear of the sticky header */}
      <div id="courses" className="scroll-mt-24 lg:scroll-mt-28">
        {courseLists[program]}
      </div>
      {/* On exam pages the results are limited to that exam */}
      <Reveal>
        <Testimonials exam={page.testimonials} />
      </Reveal>
      <Reveal>
        <CustomCourse />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <StudentReviews />
      </Reveal>
    </>
  );
}
