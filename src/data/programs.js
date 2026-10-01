// The IELTS and PTE sections on the home page: courses, mock tests and exam registration.
// Both sections use the same layout (components/ProgramSection.jsx) with the data below.
// Prices are written without the ৳ sign — the components add it.

// The mock test card is the same in both sections.
const mockTests = {
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
    href: "/exam-registration",
    actualPrice: "24,000",
    cashback: "2,000",
    effectivePrice: "22,000",
    // Weekdays with an exam, every month. They show as coloured circles in the calendar.
    // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
    examWeekdays: [4, 5],
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
    description:
      "We help you enrol for your PTE exam with ease and clarity.",
    image: "/image/exam_student_2.png",
    href: "/exam-registration",
    actualPrice: "24,000",
    cashback: "2,000",
    effectivePrice: "22,000",
    examWeekdays: [4, 5], // every Thursday and Friday, same as IELTS
  },
};
