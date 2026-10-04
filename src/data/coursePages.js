// The course pages (app/[program]/[course]/page.js), one for every course card on
// the home page. All of them use the same template (components/CourseHero.jsx
// and components/CourseCovered.jsx).
import { ieltsProgram, pteProgram } from "@/data/programs";

// TODO: only one course page has been designed so far, so every course shows
// these details (with its own name and title). To give one course its own
// details, add them to that course in data/programs.js under `page: { ... }`
// using the same field names as below.
// Prices are written without the ৳ sign — the components add it.
const sharedDetails = (program) => ({
  image: "/image/course-hero.jpg",
  imageAlt: `Student writing notes in an Enhance English ${program.name} class`,
  // Bold lines under the title
  highlights: [
    "108 Hours of Expert Instruction",
    `24 ${program.name} Classes | 24 Grammar Classes | 24 Spoken Classes`,
  ],
  // List with orange dots
  features: [
    "6 Months Course Access",
    "Cambridge 17–21",
    `15 Full ${program.name} Mocks`,
    "12-Month Club Access",
    "1-Month Intensive Care Batch",
  ],
  actualPrice: "24,000",
  offer: { label: "Limited Time Offer:", value: "35% Discount" },
  effectivePrice: "22,000",
  buyHref: "/checkout", // TODO: link to the real payment page
  demoHref: "/book-demo",

  // "What's Covered?" cards.
  // `icon` is one of: calendar, book, hourglass, list, letter, ticket (see CourseCovered.jsx).
  // `half: true` puts a card next to the following one instead of on its own row.
  // `points` is an optional short list under the text.
  covered: [
    {
      icon: "calendar",
      title: "6 Months of Complete Course Access",
      text: `Get 6 months of full course access with continuous learning and practice support throughout your ${program.name} preparation journey.`,
    },
    {
      icon: "book",
      title: "Comprehensive Study Materials",
      text: `Receive ${program.name} Cambridge Series 17–21, along with expert-led lecture materials in both printed and soft-copy formats. You’ll also get access to carefully selected websites and resources for additional practice.`,
    },
    {
      icon: "hourglass",
      title: `${program.name}-Based Grammar Foundation – 36 Hours`,
      text: `Master all four ${program.name} modules through 24 specialized classes, with each class lasting 1.5 hours.`,
      points: [
        "Listening: 7 Classes",
        "Reading: 7 Classes",
        "Writing Task 1: 5 Classes",
        "Writing Task 2: 3 Classes",
        "Speaking: 4 Classes",
      ],
    },
    {
      icon: "hourglass",
      half: true,
      title: `Complete ${program.name} Course – 36 Hours of Expert Instruction`,
      text: `Build a strong grammatical foundation with 24 specialized Grammar classes, each lasting 1.5 hours, designed specifically to support your ${program.name} preparation.`,
    },
    {
      icon: "hourglass",
      half: true,
      title: `${program.name}-Based Spoken English Foundation – 36 Hours`,
      text: "Develop your speaking confidence and communication skills through 24 Foundation Spoken classes, with 1.5 hours per class, focusing on fluency, vocabulary, pronunciation, and practical communication.",
    },
    {
      icon: "list",
      half: true,
      title: `15 Full-Length ${program.name} Mock Tests`,
      text: `Experience 15 complete ${program.name} mock tests in simulated exam conditions at our premium ${program.name} mock venue, with expert teacher feedback to identify your strengths and areas for improvement.`,
    },
    {
      icon: "letter",
      half: true,
      title: "12 Months Free Language & Interactive Club Access",
      text: "Get 12 months of free access to our Language Club and Interactive Club, featuring regular speaking activities, tongue twisters, vocabulary-building activities, debates, and confidence-building sessions.",
    },
    {
      icon: "ticket",
      title: "Intensive Care Batch – 1 Month Extra Support",
      text: `After completing your ${program.name} course and booking your exam, receive 1 additional month of Intensive Care classes, including 12 focused sessions on problem-solving, key exam areas, tips & tricks, and full practice sessions.`,
    },
  ],
});

const programs = [ieltsProgram, pteProgram];

export const coursePages = programs.flatMap((program) =>
  program.courses.map((course) => ({
    // "/ielts/crash-course" → program "ielts", slug "crash-course"
    program: program.id,
    slug: course.href.split("/").pop(),
    programName: program.name,
    title: course.title,
    ...sharedDetails(program),
    ...course.page,
  })),
);

export function getCoursePage(program, slug) {
  return coursePages.find(
    (page) => page.program === program && page.slug === slug,
  );
}

// The other courses of the same exam, for the "Explore Other Courses" cards.
export function getOtherCourses(program, slug) {
  return programs
    .find(({ id }) => id === program)
    .courses.filter((course) => !course.href.endsWith(`/${slug}`));
}
