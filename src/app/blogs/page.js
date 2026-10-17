import Link from "next/link";
import { blogCategories, blogSections } from "@/data/blogs";
import { getBlogSections } from "@/lib/blogs";
import BlogHero from "@/components/BlogHero";
import BlogCategoryBar from "@/components/BlogCategoryBar";
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

export default async function BlogsPage() {
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
