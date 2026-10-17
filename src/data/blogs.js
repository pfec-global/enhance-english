import { blogContent } from "@/data/blogContent";

// Built-in posts for the blog pages, shown only when the blog CMS cannot be reached
// (the real posts come from the CMS, see src/lib/blogs.js).
// Same shape as on the PFEC India site these pages were copied from.
// A post can also have an image: "/image/..." for its cover.

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum nisi eget ante varius, at dapibus justo dignissim. Praesent interdum pretium turpis. Suspendisse nec neque sodales, bibendum velit id, ultrices augu";

// Each category has a page at /category/<slug>.
// name is the short label (card tag, category bar), title is the heading of its page.
// inBar: true = listed in the "Explore by Category" bar under the hero of the blog list page.
export const categories = [
  { slug: "ielts", name: "IELTS", title: "IELTS Blogs", description: lorem, inBar: true },
  { slug: "pte", name: "PTE", title: "PTE Blogs", description: lorem, inBar: true },
  { slug: "spoken-english", name: "Spoken English", title: "Spoken English Blogs", description: lorem, inBar: true },
  { slug: "grammar", name: "Grammar", title: "Grammar Blogs", description: lorem, inBar: true },
];

const categoryHref = (slug) => `/category/${slug}`;

// Each author has a page at /author/<slug>
export const authors = [
  {
    slug: "enhance-english",
    name: "Enhance English",
    avatar: "/image/avater.webp",
    bio: lorem,
    linkedin: null,
    activeSince: "May 2026",
  },
];

// Categories used as the tag on the post cards
const tags = ["ielts", "pte", "spoken-english", "grammar"];

// The posts. Each one has a details page at /blogs/<slug>
const postList = [
  { slug: "what-is-ielts", title: "What is IELTS and Why is It Important?", category: "ielts" },
  { slug: "pte-speaking-tips", title: "PTE Speaking: 5 Proven Tips to Boost Fluency & Pronunciation", category: "pte" },
  { slug: "spoken-english-daily-practice", title: "Spoken English: 10 Minutes of Daily Practice That Works", category: "spoken-english" },
  { slug: "common-grammar-mistakes", title: "Common Grammar Mistakes and How to Avoid Them", category: "grammar" },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Timestamp -> "19th February 2024 · 1:55PM"
const formatUpdated = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getUTCDate();
  const suffix = day > 3 && day < 21 ? "th" : (["th", "st", "nd", "rd"][day % 10] ?? "th");
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${day}${suffix} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} · ${hours % 12 || 12}:${minutes}${hours < 12 ? "AM" : "PM"}`;
};

const NEWEST = Date.UTC(2026, 9, 1, 13, 55); // 1st October 2026, 1:55PM
const DAY = 24 * 60 * 60 * 1000;

// count posts, each one 3 days older than the one before it.
// tag is a category slug, post is an entry of postList. No tag / post given = mixed tags / posts.
const makePosts = (slug, count, { tag, post } = {}) =>
  Array.from({ length: count }, (_, i) => {
    const date = NEWEST - i * 3 * DAY;
    const item = post ?? postList[i % postList.length];
    const category = categories.find((entry) => entry.slug === (tag ?? tags[i % tags.length]));
    return {
      id: `${slug}-${i + 1}`,
      tag: category.name,
      tagHref: categoryHref(category.slug),
      title: item.title,
      author: authors[0].name,
      authorHref: `/author/${authors[0].slug}`,
      date, // used for sorting
      updated: formatUpdated(date),
      readTime: "8 Min Read",
      href: `/blogs/${item.slug}`, // the post itself
    };
  });

// Blog list page: links of the "Explore by Category" bar
export const blogCategories = categories
  .filter((category) => category.inBar)
  .map((category) => ({ label: category.name, href: categoryHref(category.slug) }));

// Blog list page: one slider per section. href is where the section's "Explore All" button goes.
export const blogSections = ["ielts", "pte", "spoken-english"].map((slug) => {
  const category = categories.find((entry) => entry.slug === slug);
  return {
    slug,
    title: category.title,
    href: categoryHref(slug),
    posts: makePosts(slug, 8, { tag: slug, post: postList.find((post) => post.category === slug) }),
  };
});

// Category page: every post of the category
export const getCategoryPosts = (slug) => makePosts(slug, 40, { tag: slug });

// Author page: every post written by the author
export const getAuthorPosts = (slug) => makePosts(slug, 40);

// Blog details page: one full post, or undefined if there is no post with that slug.
// content is markdown. image (cover) and summary are optional.
// Sidebar: showCta: false hides the default promo card, banners is the list of extra dark promo cards (can be empty).
export const getPost = (slug) => {
  const post = postList.find((item) => item.slug === slug);
  if (!post) return undefined;
  const category = categories.find((item) => item.slug === post.category);
  return {
    slug: post.slug,
    title: post.title,
    tag: category.name,
    tagHref: categoryHref(category.slug),
    author: authors[0].name,
    authorHref: `/author/${authors[0].slug}`,
    updated: formatUpdated(NEWEST),
    readTime: "8 Min Read",
    image: "/image/course-hero.jpg",
    imageAlt: "",
    summary: lorem,
    showCta: true,
    banners: [
      {
        title: "Want to Score Higher in IELTS?",
        text: "Join a free demo class and see how our expert trainers can help you reach your target band.",
        buttonLabel: "Book Free Demo Class",
        href: "/book-demo",
      },
    ],
    content: blogContent, // every built-in post has the same body
  };
};

// Blog details page: the posts of the "Related Blogs" slider (the post being read is left out)
export const getRelatedPosts = (slug) => makePosts("related", 8).filter((post) => post.href !== `/blogs/${slug}`);
