import BlogPostList from "@/components/BlogPostList";
import BlogSideCta from "@/components/BlogSideCta";

// Body of the author and category pages:
// the posts on the left and the promo card on the right (below the posts on mobile and tablet).
// showCta={false} leaves the promo card out and the posts take the full width.
// searchable={false} hides the search box of the list (the blog search results have their own).
// emptyText replaces the message shown when there are no posts.
export default function BlogListing({ posts, showCta = true, searchable = true, emptyText }) {
  return (
    <section className="bg-[#f9f9f9] py-10 lg:py-14">
      <div
        className={`site-container grid gap-10 lg:items-start lg:gap-8 ${
          showCta ? "lg:grid-cols-[minmax(0,1fr)_20rem]" : ""
        }`}
      >
        <BlogPostList posts={posts} searchable={searchable} emptyText={emptyText} />
        {showCta && (
          <div className="mx-auto w-full max-w-sm lg:sticky lg:top-28">
            <BlogSideCta />
          </div>
        )}
      </div>
    </section>
  );
}
