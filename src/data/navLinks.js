// Main navigation. `hasDropdown` shows the arrow next to the label.
// `menu` is the dropdown (components/Header.jsx):
// - `items`: the links on the left. `icon` is one of: cap, book, monitor,
//   hourglass, calendar, speaker, letter, certificate, ticket (see Header.jsx).
// - `feature`: the coloured box on the right. `color` is its background and
//   the colour of the item icons.
// - `alignRight: true` opens the menu towards the left, for items at the
//   right end of the bar.
// An item is highlighted on its own page and the pages under it (IELTS on
// /ielts/crash-course); `activeFor` adds other paths (see Header.jsx).
// The IELTS, PTE and Learn English course lists and the Exam Registration list
// below are the built-in ones; the site shows the admin's instead (see
// navLinksWithCourses).

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
        links: [],
      },
    },
  },
  // Also active on the blog's category and author pages
  {
    label: "Blog",
    href: "/blogs",
    hasDropdown: false,
    activeFor: ["/category", "/author"],
  },
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
          {
            label: "Request a Callback",
            href: "/exam-registration/ielts#join",
          },
        ],
      },
    },
  },
  { label: "Contact Us", href: "/contact", hasDropdown: false },
];

// ---------- Course lists from the admin ----------

// The admin has no icon per course, so the courses get these in order, as in the design
const courseIcons = {
  ielts: ["cap", "book", "monitor", "hourglass", "calendar"],
  pte: ["cap", "book", "monitor", "hourglass", "calendar"],
  "learn-english": ["speaker", "letter"],
};

// A course card from the API (lib/api.js getCourses) -> a dropdown item,
// e.g. "2 Months · 25 IELTS Classes" or "Basic to Advanced · 2 Months (24 Classes)"
const toMenuItem = (course, index) => {
  const icons = courseIcons[course.program];
  return {
    icon: icons[index % icons.length],
    label: course.title,
    text: [
      course.level?.replace(/^\((.*)\)$/, "$1"),
      course.duration,
      course.classes,
    ]
      .filter(Boolean)
      .join(" · "),
    href: course.href,
  };
};

const priceValue = (price) => Number(price.replace(/,/g, ""));

// The Exam Registration dropdown with the admin's exam registration pages
// (lib/api.js getExamRegistrations), in its order. "Upcoming Exam Dates" and
// "Request a Callback" lead to the sign-up form of the first exam with exam days.
function examRegistrationMenu(menu, registrations) {
  const items = registrations.map((page, index) => ({
    icon: index % 2 === 0 ? "certificate" : "ticket",
    label: `${page.name} Exam Registration`,
    text: page.tagline ?? "Register with expert assistance",
    href: page.href,
  }));

  const withDates = registrations.filter((page) => page.examDates.length > 0);
  const join = `${(withDates[0] ?? registrations[0])?.href ?? "/exam-registration"}#join`;
  if (withDates.length > 0) {
    const names = withDates.slice(0, 3).map((page) => page.name);
    const listed =
      names.length > 1
        ? `${names.slice(0, -1).join(", ")} & ${names.at(-1)}`
        : names[0];
    items.push({
      icon: "calendar",
      label: "Upcoming Exam Dates",
      text: `See the next ${listed} test days`,
      href: join,
    });
  }

  // "Get flat ৳2,000 Cashback!": the cashback of the first exam that has one
  const cashback = registrations.find((page) => page.cashback)?.cashback;

  return {
    ...menu,
    items,
    feature: {
      ...menu.feature,
      badge: cashback ? `Get flat ৳${cashback} Cashback!` : null,
      links: menu.feature.links.map((featureLink) => ({
        ...featureLink,
        href: join,
      })),
    },
  };
}

// navLinks with the admin's courses in the IELTS, PTE and Learn English
// dropdowns, and its exam registration pages in the Exam Registration dropdown.
// `exams` (lib/api.js getProgramExams) gives the IELTS and PTE cashback badges.
// Whatever the admin could not give (undefined) keeps the built-in list.
export function navLinksWithCourses(courses, registrations, exams) {
  return navLinks.map((link) => {
    if (link.href === "/exam-registration") {
      return registrations
        ? { ...link, menu: examRegistrationMenu(link.menu, registrations) }
        : link;
    }

    const program = link.href.slice(1);
    if (!courseIcons[program]) return link;

    const menu = { ...link.menu };

    // IELTS and PTE: "Get flat ৳2,000 Cashback!" follows the cashback set on the program's courses page
    if (exams && menu.feature.badge?.includes("Cashback")) {
      const cashback = exams[program]?.cashback;
      menu.feature = {
        ...menu.feature,
        badge: cashback ? `Get flat ৳${cashback} Cashback!` : null,
      };
    }

    if (!courses) return { ...link, menu };

    const own = courses.filter((course) => course.program === program);
    menu.items = own.map(toMenuItem);

    // "Courses from ৳5,500": the lowest English course price
    if (program === "learn-english" && own.length > 0) {
      const cheapest = own.reduce((low, course) =>
        priceValue(course.price) < priceValue(low.price) ? course : low,
      );
      menu.feature = {
        ...menu.feature,
        badge: `Courses from ৳${cheapest.price}`,
      };
    }

    return { ...link, menu };
  });
}
