// Main navigation. `hasDropdown` shows the arrow next to the label.
// `menu` is the dropdown (components/Header.jsx):
// - `items`: the links on the left. `icon` is one of: cap, book, monitor,
//   hourglass, calendar, speaker, letter, certificate, ticket (see Header.jsx).
// - `feature`: the coloured box on the right. `color` is its background and
//   the colour of the item icons.
// - `alignRight: true` opens the menu towards the left, for items at the
//   right end of the bar.

const examFeature = (name, color) => ({
  color,
  title: `${name} Mock Tests & Exam`,
  text: `Practise in real exam conditions, then register for your ${name} exam with us.`,
  badge: "Get flat ৳2,000 Cashback!",
  links: [
    {
      label: `Register for ${name} Exam`,
      href: `/exam-registration/${name.toLowerCase()}`,
    },
    {
      label: `What is ${name}?`,
      href: `/${name.toLowerCase()}/what-is-${name.toLowerCase()}`,
    },
  ],
});

const examItems = (name, id) => [
  {
    icon: "cap",
    label: `Foundation to Excellence ${name} Course`,
    text: "2 Months · 25 Classes",
    href: `/${id}/foundation-to-excellence`,
  },
  {
    icon: "book",
    label: `Essential ${name} Course`,
    text: "Up to 4 Months · 75 Classes",
    href: `/${id}/essential-${id}-course`,
  },
  {
    icon: "monitor",
    label: `${name} Online Course`,
    text: "Up to 1 Year · 300+ Classes",
    href: `/${id}/online-course`,
  },
  {
    icon: "hourglass",
    label: `${name} Crash Course`,
    text: "2 Months · 25 Classes",
    href: `/${id}/crash-course`,
  },
  {
    icon: "calendar",
    label: `${name} Weekend Batch`,
    text: "2 Months · 25 Classes",
    href: `/${id}/weekend-batch`,
  },
];

export const navLinks = [
  {
    label: "IELTS",
    href: "/ielts",
    hasDropdown: true,
    menu: {
      title: "IELTS Courses",
      items: examItems("IELTS", "ielts"),
      feature: examFeature("IELTS", "var(--color-brand-orange)"),
    },
  },
  {
    label: "PTE",
    href: "/pte",
    hasDropdown: true,
    menu: {
      title: "PTE Courses",
      items: examItems("PTE", "pte"),
      feature: examFeature("PTE", "var(--color-brand-blue)"),
    },
  },
  {
    label: "Learn English",
    href: "/learn-english",
    hasDropdown: true,
    menu: {
      title: "English Courses",
      items: [
        {
          icon: "speaker",
          label: "Spoken and Presentation Coaching",
          text: "Basic to Advanced · 2 Months (24 Classes)",
          href: "/learn-english/spoken-and-presentation",
        },
        {
          icon: "letter",
          label: "Writing and Grammar Coaching",
          text: "Basic to Advanced · 2 Months (24 Classes)",
          href: "/learn-english/writing-and-grammar",
        },
      ],
      feature: {
        color: "#2d0097",
        title: "Not Sure Where to Start?",
        text: "Try a free demo class, or pick the modules, hours and mode of learning that suit you.",
        badge: "Courses from ৳5,500",
        links: [
         
        ],
      },
    },
  },
  { label: "Blog", href: "/blogs", hasDropdown: false },
  { label: "Events", href: "/events", hasDropdown: false },
  {
    label: "Exam Registration",
    href: "/exam-registration",
    hasDropdown: true,
    menu: {
      title: "Register for Your Exam",
      alignRight: true,
      items: [
        {
          icon: "certificate",
          label: "IELTS Exam Registration",
          text: "British Council Certified Registration Center",
          href: "/exam-registration/ielts",
        },
        {
          icon: "ticket",
          label: "PTE Exam Registration",
          text: "PTE Academic, UKVI & Core",
          href: "/exam-registration/pte",
        },
        {
          icon: "calendar",
          label: "Upcoming Exam Dates",
          text: "See the next IELTS & PTE test days",
          href: "/exam-registration/ielts#join",
        },
      ],
      feature: {
        color: "var(--color-brand-royal)",
        title: "Register with Expert Assistance",
        text: "We help you choose the right test, check seat availability and complete your registration.",
        badge: "Get flat ৳2,000 Cashback!",
        links: [
          { label: "Request a Callback", href: "/exam-registration/ielts#join" },
        ],
      },
    },
  },
];
