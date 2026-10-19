// The IELTS and PTE sections on the home page: courses, mock tests and exam registration.
// Both sections use the same layout (components/ProgramSection.jsx) with the data below.
// The site shows the admin's courses, mock tests and exam card (see withProgramExam below
// and app/page.js); these are shown when the admin cannot be reached.
// Prices are written without the ৳ sign — the components add it.

// Every Thursday and Friday of the next six months, as "2026-10-23": the built-in exam dates
function builtInExamDates() {
  const dates = [];
  const day = new Date();
  const end = new Date(day.getFullYear(), day.getMonth() + 6, day.getDate());
  for (; day < end; day.setDate(day.getDate() + 1)) {
    if (day.getDay() === 4 || day.getDay() === 5) {
      const pad = (number) => String(number).padStart(2, "0");
      dates.push(
        `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`,
      );
    }
  }
  return dates;
}

// The mock test card is the same in both sections.
const mockTests = {
  title: "Paper Based Mock Tests",
  href: "/mock-tests",
  packages: [
    { label: "1 Test", price: "1,800" },
    { label: "3 Tests", price: "1,800" },
    { label: "5 Tests", price: "2,500" },
    { label: "10 Tests", price: "4,000" },
  ],
};

export const ieltsProgram = {
  id: "ielts",
  name: "IELTS",
  heading: "Coaching Programs, Mock Test and Exam",
  logo: { src: "/image/ielts_transparent.png", width: 253, height: 100 },
  background: "/image/ielts_bg.png",
  backgroundColor: "#ffe9e9",
  accentColor: "var(--color-brand-orange)", // the word "IELTS" and the calendar circles
  // Course pages (components/CourseHero.jsx, components/CourseExplore.jsx)
  coursePageColors: {
    hero: "var(--color-cream)", // hero background
    heroBlock: "var(--color-brand-orange)", // block behind the hero photo
    title: "var(--color-brand-orange)", // hero title
    explore: "var(--color-brand-orange)", // "Explore Other" section background
  },

  courses: [
    {
      id: 1,
      title: "Foundation to Excellence IELTS Course 2026",
      duration: "2 Months",
      classes: "25 IELTS Classes",
      price: "7,000",
      href: "/ielts/foundation-to-excellence",
    },
    {
      id: 2,
      title: "Essential IELTS Course",
      duration: "Up to 4 Months",
      classes: "75 Classes*",
      price: "12,000",
      href: "/ielts/essential-ielts-course",
    },
    {
      id: 3,
      title: "IELTS Online Course",
      duration: "Up to 1 Year",
      classes: "300+ Classes (Unlimited Access)",
      price: "20,000",
      href: "/ielts/online-course",
    },
    {
      id: 4,
      title: "IELTS Crash Course",
      duration: "2 Months",
      classes: "25 IELTS Classes",
      price: "7,000",
      href: "/ielts/crash-course",
    },
    {
      id: 5,
      title: "IELTS Weekend Batch",
      duration: "2 Months",
      classes: "25 IELTS Classes",
      price: "7,000",
      href: "/ielts/weekend-batch",
    },
  ],

  mockTests,

  exam: {
    title: "Register for IELTS Exam",
    description:
      "As a Certified IELTS Registration Center, we help you enrol for your IELTS exam with ease and clarity.",
    image: "/image/exam_student_1.png",
    href: "/exam-registration/ielts",
    actualPrice: "24,000",
    cashback: "2,000",
    effectivePrice: "22,000",
    // Exam dates ("2026-10-23"). They show as coloured circles in the calendar.
    examDates: builtInExamDates(),
  },
};

export const pteProgram = {
  id: "pte",
  name: "PTE",
  heading: "Coaching Programs, Mock Test and Exams",
  logo: { src: "/image/pearson_pte_logo.png", width: 3488, height: 1070 },
  background: "/image/pearson_bg.png",
  backgroundColor: "#eafaff",
  accentColor: "var(--color-brand-blue)",
  coursePageColors: {
    hero: "#e4f6fa",
    heroBlock: "var(--color-brand-blue)",
    title: "var(--color-brand-orange)",
    explore: "var(--color-brand-blue)",
  },

  courses: [
    {
      id: 1,
      title: "Foundation to Excellence PTE Course",
      duration: "2 Months",
      classes: "25 PTE Classes",
      price: "7,000",
      href: "/pte/foundation-to-excellence",
    },
    {
      id: 2,
      title: "Essential PTE Course",
      duration: "Up to 4 Months",
      classes: "75 Classes*",
      price: "12,000",
      href: "/pte/essential-pte-course",
    },
    {
      id: 3,
      title: "PTE Online Course",
      duration: "Up to 1 Year",
      classes: "300+ Classes (Unlimited Access)",
      price: "20,000",
      href: "/pte/online-course",
    },
    {
      id: 4,
      title: "PTE Crash Course",
      duration: "2 Months",
      classes: "25 PTE Classes",
      price: "7,000",
      href: "/pte/crash-course",
    },
    {
      id: 5,
      title: "PTE Weekend Batch",
      duration: "2 Months",
      classes: "25 PTE Classes",
      price: "7,000",
      href: "/pte/weekend-batch",
    },
  ],

  mockTests,

  exam: {
    title: "Register for PTE Exam",
    description: "We help you enrol for your PTE exam with ease and clarity.",
    image: "/image/exam_student_2.png",
    href: "/exam-registration/pte",
    actualPrice: "24,000",
    cashback: "2,000",
    effectivePrice: "22,000",
    examDates: builtInExamDates(), // every Thursday and Friday, same as IELTS
  },
};

// The program with the admin's exam card and mock test card:
// - the prices, cashback, exam dates and mock test packages are set on the program's courses
//   page in the admin (lib/api.js getProgramExams); until they are saved there both cards are left out;
// - the card's heading, intro, student photo and link follow the exam's registration page
//   (lib/api.js getExamRegistrations) when it has a published one.
// Without `exams` (the admin cannot be reached) the built-in cards stay.
export function withProgramExam(program, exams, registrations) {
  if (!exams) return program;

  const settings = exams[program.id];
  if (!settings) return { ...program, exam: null, mockTests: null };

  const page = registrations?.find((item) => item.exam === program.id);

  return {
    ...program,
    exam: {
      ...program.exam,
      ...(page && {
        title: `Register for ${page.name} Exam`,
        description: page.text,
        image: page.heroImage,
        href: page.href,
      }),
      actualPrice: settings.actualPrice,
      cashback: settings.cashback,
      effectivePrice: settings.effectivePrice,
      examDates: settings.examDates,
    },
    mockTests:
      settings.mockTests.packages.length > 0
        ? {
            ...mockTests,
            title: settings.mockTests.title,
            packages: settings.mockTests.packages,
          }
        : null,
  };
}
