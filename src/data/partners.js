// "Our Partners" section on the home page. Logos live in public/image.
// `width` and `height` are the part of the picture that is shown: every logo gets
// the same height on the page and its width follows from these two numbers.
export const partners = [
  {
    id: 1,
    name: "British Council IELTS",
    logo: { src: "/image/ielts_british_logo.png", width: 444, height: 113 },
  },
  {
    id: 2,
    name: "ETS GRE",
    logo: { src: "/image/ielts_gre.png", width: 300, height: 109 },
  },
  {
    id: 3,
    name: "ETS TOEFL",
    // The file is 900x500 with a lot of empty space above and below the logo,
    // so only the middle 270px of its height is shown.
    logo: { src: "/image/ielts_toefl.png", width: 900, height: 270 },
  },
  {
    id: 4,
    name: "Pearson PTE Academic",
    logo: { src: "/image/pearson_pte_logo.png", width: 3488, height: 1070 },
  },
];
