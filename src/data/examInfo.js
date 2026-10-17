// The "What is IELTS?" and "What is PTE?" pages (app/ielts/what-is-ielts,
// app/pte/what-is-pte). Both use components/ExamInfoPage.jsx with the details below.
// TODO: test lengths, result times and other figures follow the test owners'
// websites at the time of writing — check them again before going live.
import { ieltsProgram, pteProgram } from "@/data/programs";

export const ieltsInfo = {
  exam: "ielts",
  name: "IELTS",
  fullName: "International English Language Testing System",
  colors: ieltsProgram.coursePageColors,
  accent: "var(--color-brand-orange)",
  logo: { src: "/image/ielts_logo.png", width: 253, height: 100 },
  intro:
    "IELTS is the world’s most popular English language test for study, work and migration. It checks how well you listen, read, write and speak in English, and is accepted by more than 12,500 organisations in over 140 countries, including universities, employers and immigration authorities in the UK, Australia, Canada, New Zealand and the USA.",
  owners:
    "IELTS is jointly owned by the British Council, IDP: IELTS Australia and Cambridge University Press & Assessment.",

  // The four cards in the hero
  facts: [
    { label: "Test length", value: "2 h 45 min" },
    { label: "Score", value: "Band 0 – 9" },
    { label: "Results in", value: "3 – 13 days" },
    { label: "Valid for", value: "2 years" },
  ],

  types: [
    {
      name: "IELTS Academic",
      text: "For students who want to study at a university or college abroad, or register with a professional body such as for nursing or medicine.",
    },
    {
      name: "IELTS General Training",
      text: "For people moving abroad to work, train or live, including permanent residency in Australia, Canada and New Zealand.",
    },
    {
      name: "IELTS for UKVI",
      text: "The same Academic or General Training test, taken at an approved centre for a UK visa application.",
    },
  ],

  // Test format. `icon` is one of: listening, reading, writing, speaking.
  format: [
    {
      icon: "listening",
      name: "Listening",
      time: "30 minutes",
      text: "Four recordings of native English speakers — conversations and talks — with 40 questions.",
    },
    {
      icon: "reading",
      name: "Reading",
      time: "60 minutes",
      text: "Three long texts with 40 questions. Academic texts come from books and journals; General Training texts from everyday life and work.",
    },
    {
      icon: "writing",
      name: "Writing",
      time: "60 minutes",
      text: "Two tasks: describe a chart or write a letter (150 words), then write an essay (250 words).",
    },
    {
      icon: "speaking",
      name: "Speaking",
      time: "11 – 14 minutes",
      text: "A face-to-face conversation with an examiner in three parts, recorded for marking.",
    },
  ],
  formatNote:
    "Listening, Reading and Writing are taken together, on paper or on a computer. Speaking can be on the same day or up to a week before or after.",

  scoring: {
    text: "Each skill gets a band score from 0 to 9, in whole or half bands. Your overall band is the average of the four, rounded to the nearest half band. Most universities ask for an overall 6.0 – 7.0.",
    // What a band means, from the official band descriptions
    scale: [
      { score: "9", label: "Expert user" },
      { score: "8", label: "Very good user" },
      { score: "7", label: "Good user" },
      { score: "6", label: "Competent user" },
      { score: "5", label: "Modest user" },
      { score: "4", label: "Limited user" },
    ],
  },

  faqs: [
    {
      question: "Is IELTS paper-based or computer-based?",
      answer:
        "You can choose. Both have the same questions, timing and scoring. Computer-delivered IELTS gives results faster (usually in 3–5 days) and has more test dates; paper-based results come in 13 days.",
    },
    {
      question: "How long is an IELTS score valid?",
      answer:
        "Your Test Report Form is valid for 2 years. Most universities and immigration authorities do not accept results older than that.",
    },
    {
      question: "How many times can I take IELTS?",
      answer:
        "As many times as you like — there is no limit and no waiting period between tests.",
    },
    {
      question: "Which IELTS test should I take?",
      answer:
        "Take Academic for university study or professional registration, General Training for work or migration, and IELTS for UKVI if you are applying for a UK visa. If you are not sure, our team can help you choose.",
    },
    {
      question: "Can I register for IELTS through Enhance English?",
      answer:
        "Yes. As a British Council certified IELTS registration center, we help you book your test with no extra charges — and you get ৳2,000 cashback after you take the exam.",
    },
  ],

  courseHref: "/ielts",
  registerHref: "/exam-registration/ielts",
};

export const pteInfo = {
  exam: "pte",
  name: "PTE",
  fullName: "Pearson Test of English",
  colors: pteProgram.coursePageColors,
  accent: "var(--color-brand-blue)",
  logo: { src: "/image/pearson_pte_logo.png", width: 3488, height: 1070 },
  intro:
    "PTE is a computer-based English test by Pearson. It checks your speaking, writing, reading and listening in one sitting, is marked by computer for fair and fast results, and is accepted by thousands of universities as well as the governments of Australia, New Zealand, the UK and Canada.",
  owners: "PTE is owned and run by Pearson, a global education company.",

  facts: [
    { label: "Test length", value: "About 2 hours" },
    { label: "Score", value: "10 – 90" },
    { label: "Results in", value: "Usually 2 days" },
    { label: "Valid for", value: "2 years" },
  ],

  types: [
    {
      name: "PTE Academic",
      text: "For study abroad, and for work and migration visas in Australia and New Zealand.",
    },
    {
      name: "PTE Academic UKVI",
      text: "The PTE Academic test, taken at an approved centre for a UK visa application.",
    },
    {
      name: "PTE Core",
      text: "For Canadian permanent residency, work permits and citizenship, with everyday English topics.",
    },
  ],

  format: [
    {
      icon: "speaking",
      name: "Speaking & Writing",
      time: "54 – 67 minutes",
      text: "Introduce yourself, read aloud, repeat sentences, describe images, summarise texts and write an essay.",
    },
    {
      icon: "reading",
      name: "Reading",
      time: "29 – 30 minutes",
      text: "Multiple-choice, re-ordering paragraphs and fill-in-the-blanks questions on short texts.",
    },
    {
      icon: "listening",
      name: "Listening",
      time: "30 – 43 minutes",
      text: "Summarise recordings, fill in blanks, choose the right summary and write from dictation.",
    },
  ],
  formatNote:
    "The whole test is taken on a computer in one sitting of about two hours, with a headset for the speaking and listening tasks.",

  scoring: {
    text: "You get an overall score from 10 to 90 and a score for each skill. Many questions test more than one skill, so one answer can count towards two scores. Universities usually ask for an overall 50 – 65.",
    // Rough match with IELTS bands — each university sets its own requirement
    scale: [
      { score: "79+", label: "About IELTS 8.0" },
      { score: "65", label: "About IELTS 7.0" },
      { score: "58", label: "About IELTS 6.5" },
      { score: "50", label: "About IELTS 6.0" },
      { score: "42", label: "About IELTS 5.5" },
      { score: "36", label: "About IELTS 5.0" },
    ],
  },

  faqs: [
    {
      question: "Is PTE easier than IELTS?",
      answer:
        "Neither is easier — they test the same skills differently. Many students like PTE because it is fully computer-based, marked by computer, and gives results fast. Try a mock test of each to see which suits you.",
    },
    {
      question: "How long is a PTE score valid?",
      answer:
        "PTE scores are valid for 2 years from your test date. You can send them to as many universities as you like at no extra cost.",
    },
    {
      question: "How soon can I retake PTE?",
      answer:
        "You can book your next test as soon as you receive your results — there is no fixed waiting period.",
    },
    {
      question: "Which PTE test should I take?",
      answer:
        "Take PTE Academic for study abroad and Australian or New Zealand visas, PTE Academic UKVI for a UK visa, and PTE Core for Canadian immigration. Our team can help you choose.",
    },
    {
      question: "Can I prepare for PTE at Enhance English?",
      answer:
        "Yes. We run PTE courses from foundation to crash courses and weekend batches, with computer-based mock tests in our venue.",
    },
  ],

  courseHref: "/pte",
  registerHref: "/exam-registration/pte",
};
