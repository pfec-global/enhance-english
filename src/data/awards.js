// "Awards & Recognitions" section on the home page.

// Short lines that scroll across the two yellow bands.
export const highlights = [
  "Award Winning Coaching Institute",
  "5000+ Happy Students",
  "Expert Trainers with 10+ Years Experience",
  "Official Partner for IELTS & PTE",
];

// One slide per award. Photos live in public/image.
// TODO: only one award photo exists so far, so it is repeated to fill the three
// slides in the design — replace slides 2 and 3 with the real awards.
const pearsonAward = {
  title: "Award of Excellence",
  years: "2023 - 2024",
  recognizedBy: "Pearson",
  logo: { src: "/image/pearson_pte_logo.png", width: 3488, height: 1070 },
  description:
    "Enhance English was named a Top Performer by Pearson for its extraordinary contribution in 2023-2024.",
  image: "/image/awad.png",
};

export const awards = [
  { id: 1, ...pearsonAward },
  { id: 2, ...pearsonAward },
  { id: 3, ...pearsonAward },
];
