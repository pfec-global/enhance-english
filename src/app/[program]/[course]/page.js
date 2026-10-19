import { notFound } from "next/navigation";
import CourseCovered from "@/components/CourseCovered";
import CourseExplore from "@/components/CourseExplore";
import CourseHero from "@/components/CourseHero";
import CustomCourse from "@/components/CustomCourse";
import ExamInfoPage from "@/components/ExamInfoPage";
import Reveal from "@/components/Reveal";
import StudentReviews from "@/components/StudentReviews";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import { coursePageExtras, getCoursePage } from "@/data/coursePages";
import { withProgramExam } from "@/data/programs";
import { builtInExamPages, examStyles } from "@/data/examInfo";
import {
  getCourse,
  getCourses,
  getExamPage,
  getExamRegistrations,
  getProgramExams,
  getStudentReviews,
  getTestimonials,
} from "@/lib/api";

// A page under a program, both managed in the admin:
// - a course page, e.g. /ielts/foundation-to-excellence or
//   /learn-english/spoken-and-presentation
// - otherwise an exam page, e.g. /ielts/what-is-ielts
// When the admin cannot be reached, the built-in pages are shown instead
// (data/coursePages.js, data/examInfo.js). Any other address shows "page not found".

// The course at /program/slug with the parts the admin does not manage, or null if there is none
async function findCourse(program, slug) {
  const course = await getCourse(program, slug);
  if (course === undefined) return getCoursePage(program, slug) ?? null;
  if (!course) return null;

  // "Explore Other": the exam's other courses; English pages show the IELTS ones
  const explored =
    course.program === "learn-english" ? "ielts" : course.program;
  const courses = ((await getCourses()) ?? []).filter(
    (card) => card.program === explored,
  );

  return {
    ...coursePageExtras(course.program, course.slug, courses),
    ...course,
  };
}

// The exam page at /program/slug with its colours, or null if there is none
async function findExamPage(program, slug) {
  const page = await getExamPage(program, slug);
  if (page === undefined) return builtInExamPages[`${program}/${slug}`] ?? null;
  return page && { ...examStyles[page.exam], ...page };
}

// "Explore Other …" with the admin's exam and mock test cards of the explored exam
function exploreWithProgramExam(explore, exams, registrations) {
  const cards = withProgramExam(
    { id: explore.program, exam: explore.exam, mockTests: explore.mockTests },
    exams,
    registrations,
  );
  return { ...explore, exam: cards.exam, mockTests: cards.mockTests };
}

export async function generateMetadata({ params }) {
  const { program, course: slug } = await params;
  const page =
    (await findCourse(program, slug)) ?? (await findExamPage(program, slug));
  if (!page) return {};

  return {
    title: page.seo?.title ?? `${page.title} | Enhance English`,
    description: page.seo?.description ?? page.intro,
    keywords: page.seo?.keywords?.length ? page.seo.keywords : undefined,
  };
}

export default async function CoursePage({ params }) {
  const { program, course: slug } = await params;
  const [course, results, reviews, exams, registrations] = await Promise.all([
    findCourse(program, slug),
    getTestimonials(),
    getStudentReviews(),
    getProgramExams(),
    getExamRegistrations(),
  ]);

  if (!course) {
    const exam = await findExamPage(program, slug);
    if (!exam) notFound();
    return <ExamInfoPage info={exam} results={results} />;
  }

  return (
    <>
      <CourseHero course={course} />
      <CourseCovered course={course} />
      {/* Same sections as on the home page; on exam pages the results are limited to that exam */}
      <Reveal>
        <Testimonials exam={course.testimonials} {...results} />
      </Reveal>
      <Reveal>
        <CustomCourse />
      </Reveal>
      <Reveal>
        <CourseExplore
          explore={exploreWithProgramExam(course.explore, exams, registrations)}
          color={course.colors.explore}
        />
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
