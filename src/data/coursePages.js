// The course pages (app/[program]/[course]/page.js), one for every course card on
// the home page: IELTS and PTE (data/programs.js) and Learn English
// (data/languageCourses.js). All of them use the same template
// (components/CourseHero.jsx, components/CourseCovered.jsx, components/CourseExplore.jsx).
import { englishPageColors, languageCourses } from "@/data/languageCourses";
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

// TODO: like the exam courses above, both English courses show these details
// until each has its own. To give one course its own details, add them to that
// course in data/languageCourses.js under `page: { ... }`.
const englishDetails = {
  highlights: ["2 Months of Course Access", "48 Hours of Expert Instruction"],
  features: [
    "Real-Life English | Easy Grammar",
    "Interview Skills | Presentation Skills",
    "Phonetics & Pronunciation",
    "Idioms",
    "Language & Interactive Club",
  ],
  actualPrice: "24,000",
  offer: { label: "Limited Time Offer:", value: "35% Discount" },
  effectivePrice: "22,000",
  buyHref: "/checkout", // TODO: link to the real payment page
  demoHref: "/book-demo",

  covered: [
    {
      icon: "calendar",
      title: "2 Months of Complete Course Access",
      text: "24 classes over 2 months – 48 hours of expert instruction with practice support throughout the course.",
    },
    {
      icon: "book",
      half: true,
      title: "Real-Life English & Easy Grammar",
      text: "Learn the English used in everyday conversations, with grammar explained simply and practised in context.",
    },
    {
      icon: "list",
      half: true,
      title: "Interview & Presentation Skills",
      text: "Prepare for interviews and practise presenting with confidence, with feedback from your teacher.",
    },
    {
      icon: "hourglass",
      half: true,
      title: "Phonetics & Pronunciation",
      text: "Learn the sounds of English and how to pronounce words clearly and naturally.",
    },
    {
      icon: "letter",
      half: true,
      title: "Usage of Idioms",
      text: "Learn common idioms and expressions and when to use them.",
    },
    {
      icon: "ticket",
      title: "Language & Interactive Club",
      text: "Join our Language Club and Interactive Club for regular speaking activities, tongue twisters, vocabulary-building activities, debates, and confidence-building sessions.",
    },
  ],
};

const programs = [ieltsProgram, pteProgram];

// "/ielts/crash-course" → "crash-course"
const slugOf = (href) => href.split("/").pop();

const examPages = programs.flatMap((program) =>
  program.courses.map((course) => ({
    program: program.id,
    slug: slugOf(course.href),
    programName: program.name,
    title: course.title,
    colors: program.coursePageColors,
    testimonials: program.id, // only this exam's results
    // "Explore Other" section: the exam's other courses, mock tests and exam registration
    explore: {
      program: program.id,
      programName: program.name,
      courses: program.courses.filter((other) => other !== course),
      mockTests: program.mockTests,
      exam: program.exam,
      accentColor: program.accentColor, // calendar circles
    },
    ...sharedDetails(program),
    ...course.page,
  })),
);

const englishPages = languageCourses.map((course) => ({
  program: "learn-english",
  slug: slugOf(course.href),
  programName: "English",
  title: course.title,
  level: course.level, // shown after the title, not bold
  colors: englishPageColors,
  image: course.image,
  imageAlt: "",
  illustration: true, // shown whole, not cropped to a square photo
  // "Explore Other" section: one row of IELTS course cards, then IELTS mock tests and exam registration
  explore: {
    program: ieltsProgram.id,
    programName: ieltsProgram.name,
    courses: ieltsProgram.courses.slice(0, 4),
    mockTests: ieltsProgram.mockTests,
    exam: ieltsProgram.exam,
    accentColor: ieltsProgram.accentColor,
  },
  ...englishDetails,
  ...course.page,
}));

export const coursePages = [...examPages, ...englishPages];

export function getCoursePage(program, slug) {
  return coursePages.find(
    (page) => page.program === program && page.slug === slug,
  );
}
