import { cache } from "react";
import { registrationThemes } from "@/data/examRegistration";

// Content managed in the Enhance English admin (the Laravel app in enhance_english_admin).
// Its public API lives under /api/v1. Server only. Nothing here is cached for now,
// so changes made in the admin show on the next page view.

const API_URL = (process.env.API_URL || "http://localhost:8010").replace(/\/+$/, "");

// GET /api/v1/<path> -> its `data`, or null if there is no such thing (404).
// Throws if the admin cannot be reached or answers with another error.
async function fetchApi(path) {
  const response = await fetch(`${API_URL}/api/v1/${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`${path} answered ${response.status}`);
  return (await response.json()).data;
}

// Runs an API call and returns undefined instead of failing, so the page can show its built-in content.
// cache(): within one page view the same question is only asked once.
const safely = (load) =>
  cache(async (...args) => {
    try {
      return await load(...args);
    } catch (error) {
      const reason = error.cause?.message ?? error.cause?.code;
      console.warn(`[api] ${error.message}${reason ? ` (${reason})` : ""} - using the built-in content`);
      return undefined;
    }
  });

// ---------- From the API's shapes to the ones the components use (the files in src/data) ----------

// The API sends images as { src, alt, title }; the cards take the address and, separately, the alt text.

// The admin's event details are plain text with a blank line between paragraphs; the page takes them as `about`.
const toEvent = (event) => ({
  ...event,
  image: event.image?.src,
  imageAlt: event.image?.alt,
  about: (event.description ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean),
  highlights: event.highlights ?? [],
  href: `/events/${event.slug}`,
});

// A testimonial category is one of the "Filter By" exams; its slug is the exam id.
const toExam = (category) => ({
  id: category.slug,
  name: category.name,
  logo: category.logo?.src,
});

const toTestimonial = (testimonial) => ({
  ...testimonial,
  exam: testimonial.category,
  image: testimonial.image?.src,
  imageAlt: testimonial.image?.alt,
});

const toLanguageCourse = (course) => ({
  ...course,
  features: course.cardFeatures,
  image: course.image?.src,
});

const toAward = (award) => ({
  ...award,
  image: award.image?.src,
  imageAlt: award.image?.alt,
});

// An exam page from the API -> the shape of data/examInfo.js (components/ExamInfoPage.jsx).
// The API sends every heading, filled with the default wording when the admin left it empty.
const toExamInfo = (page) => ({
  exam: page.program,
  name: page.programName,
  title: page.title,
  fullName: page.fullName,
  intro: page.intro,
  logo: page.logo,
  owners: page.types.intro,
  facts: page.facts,
  types: page.types.items,
  format: page.format.items,
  formatNote: page.format.note,
  scoring: { text: page.scoring.text, scale: page.scoring.scale },
  faqs: page.faq.items,
  headings: {
    types: page.types.heading,
    format: page.format.heading,
    scoring: page.scoring.heading,
    faq: page.faq.heading,
    cta: page.cta.heading,
  },
  ctaText: page.cta.text,
  courseHref: page.courseHref,
  registerHref: page.registerHref,
  seo: page.seo,
});

// An exam page such as /ielts/what-is-ielts: the info for ExamInfoPage (without its colours),
// null if the admin has no such published page, or undefined when the admin cannot be reached.
export const getExamPage = safely(async (program, slug) => {
  const page = await fetchApi(`exam-pages/${encodeURIComponent(program)}/${encodeURIComponent(slug)}`);
  return page && toExamInfo(page);
});

// Every published course card (IELTS, PTE and English), in the admin's order, or undefined when
// the admin cannot be reached. Each has `program`, `title`, `duration`, `classes`, `level`, `price`
// and `href`; English cards are in the shape of data/languageCourses.js.
export const getCourses = safely(async () => {
  const courses = await fetchApi("courses");
  return courses.map((course) => (course.program === "learn-english" ? toLanguageCourse(course) : course));
});

// One course page such as /ielts/crash-course, in the shape of data/coursePages.js without the
// parts the admin does not manage (see coursePageExtras there). null if the admin has no such
// published course, undefined when the admin cannot be reached.
export const getCourse = safely(async (program, slug) => {
  const course = await fetchApi(`courses/${encodeURIComponent(program)}/${encodeURIComponent(slug)}`);
  return (
    course && {
      ...course,
      image: course.image?.src,
      imageAlt: course.image?.alt ?? "",
    }
  );
});

// The top of a course list page (/ielts, /pte, /learn-english), in the shape of
// data/programPages.js without its colours. null until the page is saved in the admin,
// undefined when the admin cannot be reached.
export const getProgram = safely(async (program) => {
  const page = await fetchApi(`programs/${encodeURIComponent(program)}`);
  return (
    page && {
      program: page.program,
      name: page.name,
      title: page.title,
      text: page.text,
      image: page.image?.src,
      imageAlt: page.image?.alt ?? "",
      illustration: page.illustration,
      seo: page.seo,
    }
  );
});

// The exam card and mock test card of IELTS and PTE, set on each program's courses page in the
// admin: { ielts, pte }, each { actualPrice, cashback, effectivePrice, examDates,
// mockTests: { title, packages } } or null until saved there. undefined when the admin cannot be reached.
export const getProgramExams = safely(() => fetchApi("program-exams"));

// The published events that have not happened yet, soonest first, in the shape of data/events.js,
// or undefined when the admin cannot be reached.
export const getEvents = safely(async () => (await fetchApi("events")).map(toEvent));

// The same events grouped by month for the timeline on /events, soonest first:
// [{ month: "2026-10", label: "Oct", year: 2026, events: [...] }], each event in the shape of
// data/events.js. undefined when the admin cannot be reached.
export const getEventMonths = safely(async () =>
  (await fetchApi("event-months")).map((month) => ({ ...month, events: month.events.map(toEvent) })),
);

// One event for its details page, e.g. /events/ielts-grammar-workshop, in the shape of data/events.js.
// Past events are included so old links keep working. null if the admin has no such published event,
// undefined when the admin cannot be reached.
export const getEvent = safely(async (slug) => {
  const event = await fetchApi(`events/${encodeURIComponent(slug)}`);
  return event && toEvent(event);
});

// An exam registration page from the API -> the shape of data/examRegistration.js.
// Images the admin left empty are null; heroImage falls back to the built-in student photo.
const toRegistrationPage = (page) => ({
  ...page,
  colors: registrationThemes[page.theme] ?? registrationThemes.orange,
  heroImage: page.heroImage?.src ?? "/image/exam_student_1.png",
  heroImageAlt: page.heroImage?.alt ?? "",
  heroImageTitle: page.heroImage?.title,
  venuePhotos: page.venue.photos,
});

// Every published exam registration page (IELTS, PTE…) in the admin's menu order,
// or undefined when the admin cannot be reached.
export const getExamRegistrations = safely(async () =>
  (await fetchApi("exam-registrations")).map(toRegistrationPage),
);

// One exam registration page such as /exam-registration/ielts. null if the admin has no such
// published page, undefined when the admin cannot be reached.
export const getExamRegistration = safely(async (slug) => {
  const page = await fetchApi(`exam-registrations/${encodeURIComponent(slug)}`);
  return page && toRegistrationPage(page);
});

// "Meet the Team behind Enhance English" on the About Us page, in the shape of data/team.js:
// { id, name, role, photo, photoAlt, socials: [{ network, label, url }] }, only the filled-in
// profiles. undefined when the admin cannot be reached.
export const getTeamMembers = safely(async () =>
  (await fetchApi("team-members")).map((member) => ({
    ...member,
    photo: member.photo?.src,
    photoAlt: member.photo?.alt,
  })),
);

// The "Here's What Our Students Say" reviews, in the shape of data/reviews.js,
// or undefined when the admin cannot be reached.
export const getStudentReviews = safely(() => fetchApi("student-reviews"));

// The student results for the Testimonials section: { exams, testimonials } in the shape of
// data/testimonials.js, or undefined when the admin cannot be reached.
export const getTestimonials = safely(async () => {
  const [categories, testimonials] = await Promise.all([
    fetchApi("testimonial-categories"),
    fetchApi("testimonials"),
  ]);
  return {
    exams: categories.map(toExam),
    testimonials: testimonials.map(toTestimonial),
  };
});

// Home page: { events, exams, testimonials, courses: { ielts, pte }, languageCourses, awards,
// reviews }, or undefined when the admin cannot be reached.
export const getHomeContent = safely(async () => {
  const home = await fetchApi("home");
  return {
    events: home.events.map(toEvent),
    exams: home.testimonialCategories.map(toExam),
    testimonials: home.testimonials.map(toTestimonial),
    courses: home.courses,
    languageCourses: home.languageCourses.map(toLanguageCourse),
    awards: home.awards.map(toAward),
    reviews: home.studentReviews,
  };
});
