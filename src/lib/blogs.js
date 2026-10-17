import { timingSafeEqual } from "node:crypto";
import { cache } from "react";
import { faqToMarkdown, prepareBlogMarkdown, stripMarkdown } from "@/lib/blogMarkdown";

// Blog posts come from the shared PFEC "country" CMS - the same one as the PFEC India site,
// which this file was copied from. Only the posts marked "Enhance English" are used.
// It is public, so no token is needed. Server only. Nothing here is cached for now.

const BLOG_CMS_URL = (process.env.BLOG_CMS_URL || "https://countrycms.pfecglobal.com").replace(/\/+$/, "");
// Only the posts written for this country's site. Set BLOG_COUNTRY in .env (BD = Bangladesh).
const COUNTRY = (process.env.BLOG_COUNTRY || "BD").trim();

// The filters that pick this site's posts out of the CMS
const SITE_FILTERS = [
  `filters[country][$eq]=${encodeURIComponent(COUNTRY)}`,
  "filters[is_enhanceenglish][$eq]=true",
  "filters[is_courseFiender][$eq]=false",
];

// How many posts one category shows on the blog list page, and how many a category page shows per page
export const BLOGS_PER_PAGE = 12;

// "/uploads/x.webp" -> "https://countrycms.pfecglobal.com/uploads/x.webp"
const absolute = (url) => (url.startsWith("http") ? url : `${BLOG_CMS_URL}/${url.replace(/^\/+/, "")}`);

export const categoryHref = (slug) => `/category/${slug}`;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// "2026-09-21" -> "21st September 2026"
const formatDate = (value) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return "";
  const day = date.getUTCDate();
  const suffix = day > 3 && day < 21 ? "th" : (["th", "st", "nd", "rd"][day % 10] ?? "th");
  return `${day}${suffix} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

// One post of the CMS -> the shape the blog cards use
const toPost = (post) => {
  // The medium size (750px wide) is plenty for a card; older uploads may only have the original
  const cover = post.cover_image?.formats?.medium ?? post.cover_image;
  const category = post.category;
  return {
    id: post.documentId ?? post.id,
    title: post.title,
    href: `/blogs/${post.slug}`,
    image: cover?.url ? absolute(cover.url) : null,
    imageAlt: post.image_alt_text || post.title,
    tag: category?.name?.trim() ?? "Blog",
    tagSlug: category?.slug ?? null,
    tagHref: category?.slug ? categoryHref(category.slug) : "/blogs",
    author: post.author?.name?.trim() ?? "Enhance English",
    authorHref: post.author?.slug ? `/author/${post.author.slug}` : "/blogs",
    date: new Date(post.published_time).getTime() || 0, // used for sorting
    updated: formatDate(post.published_time),
    readTime: post.reading_time ? `${post.reading_time} Min Read` : "",
  };
};

// One page of posts of this country's site, newest first. extraFilters is a list like ["filters[title][$containsi]=visa"].
// Throws if the CMS cannot be reached or answers with an error.
async function fetchPosts({ page = 1, pageSize = BLOGS_PER_PAGE, extraFilters = [] } = {}) {
  const query = [
    ...SITE_FILTERS,
    ...extraFilters,
    "fields=title,slug,published_time,reading_time,image_alt_text",
    "populate=cover_image",
    "populate=author",
    "populate=category",
    `pagination[page]=${page}`,
    `pagination[pageSize]=${pageSize}`,
    "sort[0]=published_time:desc",
  ].join("&");

  const response = await fetch(`${BLOG_CMS_URL}/api/blogs?${query}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`answered ${response.status}`);
  const { data, meta } = await response.json();
  return { posts: Array.isArray(data) ? data.map(toPost) : [], pageCount: meta?.pagination?.pageCount ?? 1 };
}

// Every post that matches, 100 at a time (stops after 1000 posts as a safety net)
async function fetchAllPosts(extraFilters = []) {
  const all = [];
  for (let page = 1; page <= 10; page++) {
    const { posts, pageCount } = await fetchPosts({ page, pageSize: 100, extraFilters });
    all.push(...posts);
    if (page >= pageCount) break;
  }
  return all;
}

// Runs a blog CMS call and returns undefined instead of failing, so the page can show its built-in content.
// cache(): within one page view the same question is only asked once (a page and its SEO tags share the answer).
const safely = (load) =>
  cache(async (...args) => {
    try {
      return await load(...args);
    } catch (error) {
      const reason = error.cause?.message ?? error.cause?.code;
      console.warn(`[blogs] ${error.message}${reason ? ` (${reason})` : ""} - using the built-in posts`);
      return undefined;
    }
  });

// Blog list page: the posts grouped by category - one group per category that has posts.
// Returns [{ slug, title, href, posts }], each with its newest BLOGS_PER_PAGE posts.
// The categories are ordered by their newest post, so the most recently active category comes first.
export const getBlogSections = safely(async () => {
  const posts = await fetchAllPosts();
  if (posts.length === 0) return undefined;

  const groups = new Map();
  for (const post of posts) {
    if (!post.tagSlug) continue;
    if (!groups.has(post.tagSlug)) {
      groups.set(post.tagSlug, { slug: post.tagSlug, name: post.tag, title: post.tag, href: post.tagHref, posts: [] });
    }
    const group = groups.get(post.tagSlug);
    if (group.posts.length < BLOGS_PER_PAGE) group.posts.push(post);
  }
  return [...groups.values()];
});

// Category page: { name, slug, posts } with every post of the category, or null if the category does not exist.
export const getBlogCategory = safely(async (slug) => {
  const safeSlug = encodeURIComponent(slug);
  const response = await fetch(`${BLOG_CMS_URL}/api/categories?filters[slug][$eq]=${safeSlug}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`answered ${response.status}`);
  const category = (await response.json()).data?.[0];
  if (!category) return null;

  const posts = await fetchAllPosts([`filters[category][slug][$eq]=${safeSlug}`]);
  return { name: category.name.trim(), slug: category.slug, posts };
});

// Strapi rich text ([{ type: "paragraph", children: [{ text }] }]) -> plain text
const plainText = (blocks) =>
  Array.isArray(blocks)
    ? blocks
        .map((block) => (block.children ?? []).map((child) => child.text ?? "").join(""))
        .filter(Boolean)
        .join(" ")
    : typeof blocks === "string"
      ? blocks
      : "";

// "2024-03-01" -> "March 2024"
const monthAndYear = (value) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return null;
  return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

// Author page: the author with every post they wrote for this country's site, or null if there is no such author.
// Returns { name, slug, avatar, bio, linkedin, activeSince, posts } - avatar, linkedin and activeSince can be null.
export const getBlogAuthor = safely(async (slug) => {
  const safeSlug = encodeURIComponent(slug);
  const response = await fetch(`${BLOG_CMS_URL}/api/authors?filters[slug][$eq]=${safeSlug}&populate=image`, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`answered ${response.status}`);
  const author = (await response.json()).data?.[0];
  if (!author) return null;

  const photo = author.image?.formats?.small ?? author.image;
  const posts = await fetchAllPosts([`filters[author][slug][$eq]=${safeSlug}`]);
  return {
    name: author.name.trim(),
    slug: author.slug,
    avatar: photo?.url ? absolute(photo.url) : null,
    bio: plainText(author.description),
    linkedin: author.social_url || null,
    activeSince: monthAndYear(author.active_since),
    posts,
  };
});

// ---------- Blog details page ----------

// Draft preview: Strapi opens a post as /blogs/<slug>?status=draft&secret=<BLOG_PREVIEW_SECRET>.
// Only when the secret matches is the unpublished draft fetched (with BLOG_CMS_TOKEN). Both live in .env, never in the code.
export function isBlogPreview({ status, secret } = {}) {
  const expected = process.env.BLOG_PREVIEW_SECRET;
  if (status !== "draft" || !expected || typeof secret !== "string") return false;
  const given = Buffer.from(secret);
  const wanted = Buffer.from(expected);
  return given.length === wanted.length && timingSafeEqual(given, wanted);
}

// One full post, or null if there is no post with that slug for this country's site.
// preview: true fetches the draft version (see isBlogPreview).
// content is markdown ready for BlogContent: the body, followed by the FAQ of the post as its last section.
export const getBlogPost = safely(async (slug, preview = false) => {
  const query = [
    `filters[slug][$eq]=${encodeURIComponent(slug)}`,
    ...SITE_FILTERS,
    "populate[cover_image]=true",
    "populate[category]=true",
    "populate[author]=true",
    "populate[content_blocks][on][blog.blog-content][populate]=*",
    "populate[content_blocks][on][blog.faq][populate]=*",
    ...(preview ? ["status=draft"] : []),
  ].join("&");

  const response = await fetch(`${BLOG_CMS_URL}/api/blogs?${query}`, {
    headers: preview && process.env.BLOG_CMS_TOKEN ? { Authorization: `Bearer ${process.env.BLOG_CMS_TOKEN}` } : {},
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`answered ${response.status}`);
  const post = (await response.json()).data?.[0];
  if (!post) return null;

  // The body can be split over several content blocks; the FAQ block always goes last
  const blocks = Array.isArray(post.content_blocks) ? post.content_blocks : [];
  const body = blocks
    .filter((block) => block.__component === "blog.blog-content")
    .map((block) => prepareBlogMarkdown(block.BlogContent));
  const faq = blocks
    .filter((block) => block.__component === "blog.faq")
    .map((block) => faqToMarkdown(block.question_answer));

  const card = toPost(post);
  const cover = post.cover_image?.formats?.large ?? post.cover_image;
  const summary = stripMarkdown(post.summary);
  return {
    ...card,
    slug: post.slug,
    image: cover?.url ? absolute(cover.url) : null,
    // "21st September 2026 · 10:30 AM"
    updated: [card.updated, post.time?.trim()].filter(Boolean).join(" · "),
    summary,
    content: [...body, ...faq].filter(Boolean).join("\n\n"),
    seo: {
      title: post.seo_title?.trim() || post.title,
      description: post.seo_description?.trim() || summary,
      keywords: post.seo_keyword?.trim() || undefined,
    },
  };
});

// "Related Blogs" of a post: the newest posts of the same category, without the post itself
export const getRelatedBlogs = safely(async (slug, categorySlug, count = 8) => {
  const { posts } = await fetchPosts({
    pageSize: count,
    extraFilters: [
      `filters[slug][$ne]=${encodeURIComponent(slug)}`,
      ...(categorySlug ? [`filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}`] : []),
    ],
  });
  return posts;
});
