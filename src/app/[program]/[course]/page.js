import { notFound } from "next/navigation";
import CourseCovered from "@/components/CourseCovered";
import CourseExplore from "@/components/CourseExplore";
import CourseHero from "@/components/CourseHero";
import CustomCourse from "@/components/CustomCourse";
import Reveal from "@/components/Reveal";
import StudentReviews from "@/components/StudentReviews";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import {
  coursePages,
  getCoursePage,
  getOtherCourses,
} from "@/data/coursePages";

// Course page, e.g. /ielts/foundation-to-excellence. Every course in
// data/programs.js gets one; any other address shows "page not found".
export const dynamicParams = false;

export function generateStaticParams() {
  return coursePages.map(({ program, slug }) => ({ program, course: slug }));
}

export async function generateMetadata({ params }) {
  const { program, course } = await params;
  const page = getCoursePage(program, course);

  return { title: page && `${page.title} | Enhance English` };
}

export default async function CoursePage({ params }) {
  const { program, course } = await params;
  const page = getCoursePage(program, course);
  if (!page) notFound();

  return (
    <>
      <CourseHero course={page} />
      <CourseCovered course={page} />
      {/* Same sections as on the home page; the results are limited to this page's exam */}
      <Reveal>
        <Testimonials exam={page.program} />
      </Reveal>
      <Reveal>
        <CustomCourse />
      </Reveal>
      <Reveal>
        <CourseExplore
          course={page}
          courses={getOtherCourses(program, course)}
        />
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
