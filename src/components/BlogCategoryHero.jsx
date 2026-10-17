import Link from "next/link";

// Hero of the blog category page: back link, title and description, all centred
export default function BlogCategoryHero({ title, description }) {
  return (
    <section className="bg-[#E4F6FA] px-4 py-8 text-center sm:px-6 lg:py-10">
      <div className="animate-fade-up motion-reduce:animate-none">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 12H4m6-6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to All Blogs
        </Link>
      </div>
      <h1 className="mt-4 animate-fade-up [animation-delay:100ms] motion-reduce:animate-none text-3xl font-bold text-navy sm:text-4xl">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-2xl animate-fade-up [animation-delay:200ms] motion-reduce:animate-none text-sm text-ink/75">
        {description}
      </p>
    </section>
  );
}
