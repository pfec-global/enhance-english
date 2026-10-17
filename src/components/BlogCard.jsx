import Image from "next/image";
import Link from "next/link";

// One blog card on the blog list page: cover image, category tag, title, author and the updated / read time line.
// The card has three separate links: the category tag, the author name, and the post itself (everywhere else).
export default function BlogCard({ post, className = "" }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl ${className}`}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          // Image placeholder - shown until the post has a cover image
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-300 to-slate-500 text-xs text-white/80 transition-transform duration-500 group-hover:scale-110">
            Image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* relative z-10 keeps the tag and author links above the post link, which covers the whole card */}
        <Link
          href={post.tagHref}
          className="relative z-10 self-start rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent transition-colors duration-300 hover:bg-accent hover:text-white"
        >
          {post.tag}
        </Link>
        <h3 className="mt-2 text-sm font-medium leading-snug transition-colors duration-300 group-hover:text-accent">
          {/* after:inset-0 stretches this link over the whole card, so clicking the image or text opens the post */}
          <Link href={post.href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-auto pt-2 text-xs text-ink/75">
          By{" "}
          <Link
            href={post.authorHref}
            className="relative z-10 font-semibold text-ink transition-colors duration-300 hover:text-accent hover:underline"
          >
            {post.author}
          </Link>
        </p>
        <p className="mt-1 text-[11px] text-ink/60">
          Last Updated on {post.updated} | {post.readTime}
        </p>
      </div>
    </article>
  );
}
