// Everything shown in the footer (components/Footer.jsx).

// TODO: the design only has dummy contact details — replace with the real ones.
// `icon` is one of: pin, phone, mail. Add `href` (e.g. "tel:+880..." or "mailto:...")
// to turn a line into a link.
export const contacts = [
  { id: 1, icon: "pin", text: "Dummy Address\nDummy Address" },
  { id: 2, icon: "phone", text: "Dummy phone Number" },
  { id: 3, icon: "mail", text: "Dummy Email ID" },
];

// TODO: replace `href` with the real profile links.
// `icon` is one of: linkedin, youtube, facebook, instagram, twitter.
// `background` is the colour of the square behind the white logo.
export const socials = [
  {
    id: 1,
    name: "LinkedIn",
    icon: "linkedin",
    background: "#0e76a8",
    href: "#",
  },
  { id: 2, name: "YouTube", icon: "youtube", background: "#e02f2f", href: "#" },
  {
    id: 3,
    name: "Facebook",
    icon: "facebook",
    background: "#1f3c88",
    href: "#",
  },
  {
    id: 4,
    name: "Instagram",
    icon: "instagram",
    background: "linear-gradient(45deg, #f9a825, #e1306c 50%, #6a3fd1)",
    href: "#",
  },
  { id: 5, name: "Twitter", icon: "twitter", background: "#1da1f2", href: "#" },
];

// Link columns, in the order they appear.
export const linkGroups = [
  {
    title: "IELTS",
    links: [
      { label: "Coaching Classes", href: "/ielts" },
      { label: "Mock Tests", href: "/ielts/mock-tests" },
      { label: "Exam Registration", href: "/exam-registration" },
      { label: "What is IELTS?", href: "/ielts/what-is-ielts" },
    ],
  },
  {
    title: "PTE",
    links: [
      { label: "Coaching Classes", href: "/pte" },
      { label: "Mock Tests", href: "/pte/mock-tests" },
      { label: "What is PTE?", href: "/pte/what-is-pte" },
    ],
  },
  {
    title: "Learn English",
    links: [
      {
        label: "Speaking & Presentation Classes",
        href: "/learn-english/speaking-and-presentation",
      },
      {
        label: "Writing & Grammar Classes",
        href: "/learn-english/writing-and-grammar",
      },
    ],
  },
  {
    title: "Enhance English",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blogs", href: "/resources/blogs" },
      { label: "Downloadable Content", href: "/resources/downloads" },
      { label: "Upcoming Events", href: "/resources/events" },
    ],
  },
];

export const copyright = "© 2023 eetutorials.com | All Rights Reserved";

export const legalLinks = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];
