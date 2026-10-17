import BlogPostList from "@/components/BlogPostList";
import BlogSideCta from "@/components/BlogSideCta";

// Body of the author and category pages:
// the posts on the left and the promo card on the right (below the posts on mobile and tablet).
// showCta={false} leaves the promo card out and the posts take the full width.
export default function BlogListing({ posts, showCta = true }) {
  return (
    <section className="bg-[#f9f9f9] py-10 lg:py-14">
      <div
        className={`site-container grid gap-10 lg:items-start lg:gap-8 ${
          showCta ? "lg:grid-cols-[minmax(0,1fr)_16rem]" : ""
        }`}
      >
        <BlogPostList posts={posts} />
        {showCta && (
          <div className="mx-auto w-full max-w-xs lg:sticky lg:top-28">
            <BlogSideCta />
          </div>
        )}
      </div>
    </section>
  );
}
