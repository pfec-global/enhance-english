// The exam registration pages (app/exam-registration/[exam]/page.js):
// /exam-registration/ielts and /exam-registration/pte. Both use the same
// layout; PTE only changes the colours, logos and wording below.
// Prices are written without the ৳ sign — the components add it.
import { ieltsProgram, pteProgram } from "@/data/programs";

// TODO: placeholders until there are real venue photos.
const venuePhotos = [
  { src: "/image/course-hero.jpg", alt: "Enhance English venue" },
  { src: "/image/course-hero.jpg", alt: "Enhance English venue" },
  { src: "/image/course-hero.jpg", alt: "Enhance English venue" },
];

// Shared by both exams. `name` is "IELTS" or "PTE".
const sharedDetails = (program) => ({
  exam: program.id,
  name: program.name,
  cashback: program.exam.cashback,
  examWeekdays: program.exam.examWeekdays, // calendar circles, see data/programs.js
  accentColor: program.accentColor,

  // Grey box under "Why Register through us?"
  notes: [
    "Test dates and locations are subject to availability.",
    "Bookings are confirmed only after official processing and seat confirmation.",
    "Fees are based on current official rates and may be updated by the test provider.",
  ],

  // The 4 numbered steps. `icon` is one of: handshake, calendar, chat, list.
  steps: [
    { icon: "handshake", text: "Request a callback through the form" },
    { icon: "calendar", text: "Our team contacts you to understand your needs" },
    { icon: "chat", text: `We recommend the right ${program.name} option` },
    { icon: "list", text: "Availability Check and Registration" },
  ],

  venuePhotos,
});

const ielts = {
  ...sharedDetails(ieltsProgram),
  colors: {
    main: "var(--color-brand-orange)", // hero and "Exam Options" backgrounds
    form: "#fdecea", // sign-up form background
    formBorder: "#f6b6ae", // sign-up form fields
  },
  logo: {
    src: "/image/ielts_british_logo.png",
    width: 444,
    height: 113,
    alt: "British Council IELTS",
  },
  // TODO: the design shows a photo of a student with a laptop — swap it in when there is one.
  heroImage: "/image/exam_student_1.png",
  title: "Register for IELTS Test with Expert Assistance",
  text: "As a British Council Certified IELTS Registration Center, we help you register for your IELTS exam with ease and clarity.",

  // "Why Register through us?" cards. `icon` is one of: cashback, handshake, certificate.
  // `highlight: true` gives the card the cream background.
  reasons: [
    {
      icon: "cashback",
      highlight: true,
      title: `৳${ieltsProgram.exam.cashback} Cashback!`,
      text: "Save more on your IELTS Exam fee! Register through us and get a cashback after you take the exam!",
    },
    {
      icon: "handshake",
      highlight: true,
      title: "Zero Extra Charges",
      text: "There are no hidden costs, no service charges, and no additional fees for registering through us.",
    },
    {
      icon: "certificate",
      title: "British Council Certified IELTS Registration Center",
      text: "We are an officially recognized partner for helping students with IELTS registrations.",
    },
  ],

  form: {
    title: "Sign up for IELTS Registration Assistance",
    modeLabel: "Test Mode",
    modes: ["Computer-Delivered", "Paper-Based"],
  },

  // TODO: copied from the design, which lists Sri Lanka and LKR — replace with
  // the Bangladesh formats and fees.
  options: {
    title: "IELTS Exam Options, Formats & Fees",
    items: [
      {
        name: ["IELTS", "Academic"],
        bestFor: "Higher education and professional registration",
        format: "Computer-Delivered Only",
        fee: "LKR 74,000",
      },
      {
        name: ["IELTS", "General Training"],
        bestFor: "PR, employment, and immigration purposes",
        format: "Computer-Delivered Only",
        fee: "LKR 74,000",
      },
      {
        name: ["IELTS", "for UKVI"],
        bestFor: "UK student visas, work visas, and migration",
        format: "Computer-Delivered Only",
        fee: "LKR 82,500",
      },
    ],
    formatLabel: "Format Available in Sri Lanka:",
  },

  venue: {
    logo: {
      src: "/image/ielts_british_logo.png",
      width: 444,
      height: 113,
      alt: "British Council IELTS — Testing Here",
    },
    title: "Enhance English is a Certified IELTS Test Venue in Bangladesh",
    text: "We maintain high standards in terms of venue maintenance, invigilation and student experience. Take a look at our venue before you take your exam!",
  },
};

const pte = {
  ...sharedDetails(pteProgram),
  colors: {
    main: "var(--color-brand-blue)",
    form: "#e4f6fa",
    formBorder: "#9fdcec",
  },
  logo: {
    src: "/image/pearson_pte_logo.png",
    width: 3488,
    height: 1070,
    alt: "Pearson PTE Academic",
  },
  // TODO: the design shows a photo of a student with a laptop — swap it in when there is one.
  heroImage: "/image/exam_student_2.png",
  title: "Register for PTE Test with Expert Assistance",
  text: "We help you choose the right PTE test and register for your exam with ease and clarity.",

  reasons: [
    {
      icon: "cashback",
      highlight: true,
      title: `৳${pteProgram.exam.cashback} Cashback!`,
      text: "Save more on your PTE Exam fee! Register through us and get a cashback after you take the exam!",
    },
    {
      icon: "handshake",
      highlight: true,
      title: "Zero Extra Charges",
      text: "There are no hidden costs, no service charges, and no additional fees for registering through us.",
    },
    {
      icon: "certificate",
      title: "Expert PTE Registration Support",
      text: "Our team guides you through every step, from choosing a test date to confirming your seat.",
    },
  ],

  form: {
    title: "Sign up for PTE Registration Assistance",
    modeLabel: "Test Type",
    modes: ["PTE Academic", "PTE Academic UKVI", "PTE Core"],
  },

  // TODO: add the official formats and fees.
  options: {
    title: "PTE Exam Options, Formats & Fees",
    items: [
      {
        name: ["PTE", "Academic"],
        bestFor: "Study abroad, work and migration visas",
        format: "Computer-Based at a Test Centre",
        fee: "Ask our team",
      },
      {
        name: ["PTE Academic", "for UKVI"],
        bestFor: "UK student visas, work visas, and migration",
        format: "Computer-Based at a Test Centre",
        fee: "Ask our team",
      },
      {
        name: ["PTE", "Core"],
        bestFor: "Canadian permanent residency and work visas",
        format: "Computer-Based at a Test Centre",
        fee: "Ask our team",
      },
    ],
    formatLabel: "Format Available in Bangladesh:",
  },

  venue: {
    logo: {
      src: "/image/pearson_pte_logo.png",
      width: 3488,
      height: 1070,
      alt: "Pearson PTE Academic",
    },
    title: "Visit Our Premium Venue in Bangladesh",
    text: "We maintain high standards in terms of venue maintenance, mock tests and student experience. Take a look at our venue before you visit us!",
  },
};

export const registrationPages = [ielts, pte];

export function getRegistrationPage(exam) {
  return registrationPages.find((page) => page.exam === exam);
}
