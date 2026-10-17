// The course list pages (app/[program]/page.js): /ielts, /pte and /learn-english.
// The hero (components/ProgramHero.jsx) uses the details below; the course cards
// come from data/programs.js and data/languageCourses.js.
import { englishPageColors } from "@/data/languageCourses";
import { ieltsProgram, pteProgram } from "@/data/programs";

const examPage = (program) => ({
  program: program.id,
  name: program.name,
  title: `Achieve Your Target ${program.name} Score`,
  text: `From full foundation courses to crash courses and weekend batches – choose the ${program.name} course that fits your schedule, practise with real mock tests and register for your exam with us.`,
  colors: program.coursePageColors,
  image: "/image/course-hero.jpg",
  imageAlt: `Student writing notes in an Enhance English ${program.name} class`,
  testimonials: program.id, // only this exam's results
});

export const programPages = [
  examPage(ieltsProgram),
  examPage(pteProgram),
  {
    program: "learn-english",
    name: "English",
    title: "Speak and Write English with Confidence",
    text: "Practical courses in speaking, presenting, writing and grammar – from the basics to advanced – with clubs that keep you practising long after class.",
    colors: englishPageColors,
    image: "/image/avater_image_1.png",
    imageAlt: "",
    illustration: true, // shown whole, not cropped to a square photo
  },
];

export function getProgramPage(program) {
  return programPages.find((page) => page.program === program);
}
