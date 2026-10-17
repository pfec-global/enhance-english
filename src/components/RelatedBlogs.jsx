import Link from "next/link";
import Reveal from "@/components/Reveal";
import BlogSlider from "@/components/BlogSlider";

// "Related Blogs" section at the bottom of the blog details page.
// href is where the "Explore All" button goes.
export default function RelatedBlogs({ posts, href = "/blogs" }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-[#f0f3f7] py-12 lg:py-16">
      <div className="site-container">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-navy">Related Blogs</h2>
            <p className="mt-2 text-sm text-ink/80 sm:text-base">
              Explore articles packed with practical advice, trends, and expert perspectives to help you make an
              informed decision
            </p>
          </div>
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white"
          >
            Explore All
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>

        <Reveal delay={150} className="mt-4">
          <BlogSlider posts={posts} />
        </Reveal>
      </div>
    </section>
  );
}
