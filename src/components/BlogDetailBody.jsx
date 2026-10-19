import { getHeadings } from "@/lib/markdown";
import BlogToc from "@/components/BlogToc";
import BlogContent from "@/components/BlogContent";
import BlogSideCta from "@/components/BlogSideCta";
import PromoBanner from "@/components/PromoBanner";

// Body of the blog details page: everything under the hero.
// content is markdown. The sidebar is optional: showCta shows the promo card (cta changes its
// title, text, button and link, see BlogSideCta), banners is the list of extra dark promo cards (can be empty).
// Also used for the description of the exam registration pages.
export default function BlogDetailBody({ content, showCta = false, cta = {}, banners = [] }) {
  // Every h2 of the markdown becomes one line of the "Jump to Topic" box
  const headings = getHeadings(content);
  // The sidebar only appears if the page has the promo card or at least one banner
  const hasSidebar = showCta || banners.length > 0;

  return (
    <section className="py-8 lg:py-12">
      {/* Content on the left, promo cards on the right (below the content on mobile and tablet).
          Without promo cards the content takes the full width. */}
      <div
        className={`site-container grid gap-10 lg:items-start ${
          hasSidebar ? "lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12" : ""
        }`}
      >
        {/* The "Jump to Topic" box floats inside this column, so it needs to be next to the content */}
        <div className="min-w-0">
          <BlogToc headings={headings} />
          <div className="mt-8">
            <BlogContent markdown={content} headings={headings} />
          </div>
        </div>

        {/* The sidebar floats beside the content while scrolling (desktop only - on smaller screens it is below the content) */}
        {hasSidebar && (
          <div className="mx-auto w-full max-w-xs space-y-6 lg:sticky lg:top-28">
            {showCta && <BlogSideCta {...cta} />}
            {banners.map((banner) => (
              <PromoBanner key={banner.title} {...banner} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
