import Image from "next/image";
import Link from "next/link";
import ShareLinks from "@/components/ShareLinks";

// Hero of the blog details page: a card with the tag, title, author line, summary, share icons and cover image.
// Desktop: text on the left, image on the right.
// Mobile: title and author line, then the image, then the summary and share icons.
// Without a cover image the text takes the full width.
export default function BlogPostHero({ post }) {
  // The upright line between the items of the author line (only when they are on one row)
  const divider = <span aria-hidden="true" className="hidden h-3.5 w-px bg-ink/50 sm:block" />;

  return (
    <section className="site-container pt-4">
      <div
        className={`grid gap-6 rounded-xl bg-[#F3F3F8] p-5 shadow-md sm:p-8 lg:gap-x-12 lg:p-10 ${
          post.image ? "lg:grid-cols-2" : ""
        }`}
      >
        <div className="animate-fade-up motion-reduce:animate-none lg:col-start-1 lg:self-end">
          <Link
            href={post.tagHref}
            className="inline-block rounded bg-accent px-2 py-1 text-xs font-semibold text-white transition-opacity duration-300 hover:opacity-85"
          >
            {post.tag}
          </Link>
          <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">{post.title}</h1>
          {/* Mobile: one item per line. From tablet up: one row with dividers. */}
          <p className="mt-3 flex flex-col gap-1 text-xs sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:text-sm">
            <span>
              Author:{" "}
              <Link href={post.authorHref} className="font-semibold text-accent hover:underline">
                {post.author}
              </Link>
            </span>
            {divider}
            <span>Last Updated on {post.updated}</span>
            {divider}
            <span>{post.readTime}</span>
          </p>
        </div>

        {/* On desktop the image sits in the second column, beside both text blocks */}
        {post.image && (
          <div
            className="relative mx-auto aspect-3/2 animate-fade-up [animation-delay:200ms] motion-reduce:animate-none w-full max-w-xl overflow-hidden rounded-xl border-2 border-accent lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
          >
            <Image
              src={post.image}
              alt={post.imageAlt ?? ""}
              fill
              preload
              sizes="(min-width: 1024px) 576px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-6 animate-fade-up [animation-delay:100ms] motion-reduce:animate-none lg:col-start-1">
          {post.summary && (
            <div>
              <h2 className="text-sm text-accent">Summary</h2>
              {/* At least 16px, like the post's text (components/BlogContent.jsx) */}
              <p className="mt-1 text-[max(16px,1rem)] text-ink/85">{post.summary}</p>
            </div>
          )}
          <ShareLinks title={post.title} />
        </div>
      </div>
    </section>
  );
}
