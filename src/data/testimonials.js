// Exams shown as "Filter By" buttons. Logos live in public/image.
export const exams = [
  { id: "ielts", name: "IELTS", logo: "/image/ielts_logo.png" },
  { id: "pte", name: "Pearson PTE", logo: "/image/pearson_logo.png" },
];

// Student results. Images live in public/image/testimonial.
// `exam` must match an id above so the filter can find it.
export const testimonials = [
  {
    id: 1,
    name: "Mahabub",
    exam: "ielts",
    score: "7.5",
    image: "/image/testimonial/testimonial_1.png",
  },
  {
    id: 2,
    name: "Nazrin Akhter",
    exam: "ielts",
    score: "7.5",
    image: "/image/testimonial/testimonial_3.png",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    exam: "ielts",
    score: "7.0",
    image: "/image/testimonial/testimonial_2.png",
  },
];
