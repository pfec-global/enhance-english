import { notFound } from "next/navigation";
import { authors, getAuthorPosts } from "@/data/blogs";
import { getBlogAuthor } from "@/lib/blogs";
import AuthorHero from "@/components/AuthorHero";
import BlogListing from "@/components/BlogListing";

// The posts are fetched from the blog CMS on every visit (nothing is cached), so the page is always up to date.
export const dynamic = "force-dynamic";

// The author with their posts: from the blog CMS, or the built-in dummy author if the CMS cannot be reached.
// Returns null when there is no such author.
async function loadAuthor(slug) {
  const author = await getBlogAuthor(slug);
  if (author) return author;
  if (author === null) return null; // the CMS answered: no author with this slug

  const fallback = authors.find((item) => item.slug === slug);
  return fallback ? { ...fallback, posts: getAuthorPosts(slug) } : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = await loadAuthor(slug);
  if (!author) return {};
  return {
    title: `${author.name} - Author | Enhance English`,
    description: author.bio || `Articles written by ${author.name} for Enhance English.`,
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = await loadAuthor(slug);
  if (!author) notFound();

  // "Active Since" is left out for an author without a start date in the CMS
  const stats = [
    { label: "Articles Published", value: String(author.posts.length).padStart(2, "0") },
    author.activeSince && { label: "Active Since", value: author.activeSince },
  ].filter(Boolean);

  return (
    <>
      <AuthorHero author={author} stats={stats} />
      <BlogListing posts={author.posts} />
    </>
  );
}
