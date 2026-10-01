// "Master the English Language" section on the home page.
// `icon` is one of: sound, letter, chat, speaker, board (see LanguageCourseCard.jsx).
// Prices are written without the ৳ sign — the card adds it.

// TODO: both cards list the same five points in the design — replace with the real ones.
const features = [
  { icon: "sound", label: "Phonetics and Pronunciation" },
  { icon: "letter", label: "Usage of Idioms" },
  { icon: "chat", label: "Speaking Club (1 Month)" },
  { icon: "speaker", label: "Speaking Fluency Development" },
  { icon: "board", label: "Presentation Skill" },
];

export const languageCourses = [
  {
    id: 1,
    title: "Spoken and Presentation Coaching",
    level: "(Basic to Advanced)",
    duration: "2 Months (24 Classes)",
    features,
    price: "5,500",
    image: "/image/avater_image_1.png",
    imageColor: "var(--color-brand-orange)", // colour behind the picture
    href: "/learn-english/spoken-and-presentation",
  },
  {
    id: 2,
    title: "Writing and Grammar Coaching",
    level: "(Basic to Advanced)",
    duration: "2 Months (24 Classes)",
    features,
    price: "5,500",
    image: "/image/avater_image_2.png",
    imageColor: "var(--color-brand-blue)",
    href: "/learn-english/writing-and-grammar",
  },
];
