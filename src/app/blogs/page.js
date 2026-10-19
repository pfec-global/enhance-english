import Link from "next/link";
import { blogCategories, blogSections } from "@/data/blogs";
import { getBlogSections, MAX_SEARCH_LENGTH, searchBlogs } from "@/lib/blogs";
import BlogHero from "@/components/BlogHero";
import BlogCategoryBar from "@/components/BlogCategoryBar";
import BlogListing from "@/components/BlogListing";
import BlogSlider from "@/components/BlogSlider";
import CustomCourse from "@/components/CustomCourse";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Blogs | Enhance English",
  description:
    "Articles packed with practical advice, trends, and expert perspectives to help you make an informed decision.",
};

// The posts are fetched from the blog CMS on every visit (nothing is cached), so the page is always up to date.
export const dynamic = "force-dynamic";

// The posts that match a search: from the blog CMS, or the built-in dummy posts whose title
// matches if the CMS cannot be reached.
async function loadSearchResults(query) {
  const posts = await searchBlogs(query);
  if (posts) return posts;
  const search = query.toLowerCase();
  return blogSections.flatMap((section) => section.posts).filter((post) => post.title.toLowerCase().includes(search));
}

export default async function BlogsPage({ searchParams }) {
  // The search box of the hero opens /blogs?q=...: then the page shows the matching posts instead of the categories
  const { q } = await searchParams;
  const query = (typeof q === "string" ? q : "").trim().slice(0, MAX_SEARCH_LENGTH);

  if (query) {
    const results = await loadSearchResults(query);
    return (
      <>
        <BlogHero query={query} />

        <div className="border-b border-ink/10 bg-white">
          <div className="site-container flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4 text-xs sm:text-sm">
            <p className="text-ink/70" role="status">
              {results.length} {results.length === 1 ? "result" : "results"} for{" "}
              <span className="font-semibold text-ink">“{query}”</span>
            </p>
            <Link href="/blogs" className="font-semibold text-accent hover:underline">
              Clear search
            </Link>
          </div>
        </div>

        <BlogListing
          posts={results}
          searchable={false}
          emptyText={`No posts found for “${query}”. Try another word, or explore the categories.`}
        />
      </>
    );
  }

  // The posts come from the blog CMS, grouped by category (12 newest per category).
  // If the CMS cannot be reached, the built-in dummy sections are shown instead.
  const cmsSections = await getBlogSections();
  const sections = cmsSections ?? blogSections;
  // The "Explore by Category" bar lists the categories that have posts
  const categories = cmsSections
    ? cmsSections.map((section) => ({ label: section.name, href: section.href }))
    : blogCategories;

  return (
    <>
      <BlogHero />

      <BlogCategoryBar categories={categories} />

      <section className="bg-[#f9f9f9] py-10 lg:py-14">
        <div className="site-container space-y-10 lg:space-y-14">
          {/* One slider per category */}
          {sections.map((section) => (
            <Reveal key={section.slug}>
              <div id={section.slug} className="scroll-mt-28 lg:scroll-mt-32">
              {/* Title, a line filling the space in between, and the Explore All button */}
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-indigo sm:text-2xl">{section.title}</h2>
                <span className="h-px flex-1 bg-indigo/40" />
                <Link
                  href={section.href}
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-accent px-3 py-2 text-xs font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white sm:px-4 sm:text-sm"
                >
                  Explore All
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
              <div className="mt-2">
                <BlogSlider posts={section.posts} />
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Same section as on the home page (the PFEC India site has its contact form here) */}
      <Reveal>
        <CustomCourse />
      </Reveal>
    </>
  );
}
