import Image from "next/image";

// Hero of the blog list page: title and search on the left, the students in
// circles on the right (below on phones), on an indigo background.
// query is the current search, shown in the search box.
export default function BlogHero({ query = "" }) {
  return (
    <section className="overflow-hidden bg-[#1d297c] text-white">
      <div className="site-container grid items-center gap-8 py-10 md:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:py-14">
        <div>
          <h1 className="animate-fade-up text-3xl font-bold motion-reduce:animate-none sm:text-4xl">
            Blogs
          </h1>
          <p className="mt-5 max-w-xl animate-fade-up text-sm text-white/85 [animation-delay:100ms] motion-reduce:animate-none">
            Tips, guides and updates on IELTS, PTE and spoken English from the Enhance English team, to help you
            prepare smarter and reach your target score.
          </p>

          {/* Search box: opens /blogs?q=..., where the page asks the blog CMS for the matching posts */}
          <form
            key={query}
            role="search"
            action="/blogs"
            className="relative mt-6 max-w-sm animate-fade-up [animation-delay:200ms] motion-reduce:animate-none"
          >
            <input
              type="search"
              name="q"
              defaultValue={query}
              maxLength={100}
              required
              placeholder="Search Topic"
              aria-label="Search blog topics"
              className="w-full rounded-xl bg-white py-3.5 pr-12 pl-4 text-sm text-ink shadow-sm outline-none ring-accent/40 transition placeholder:text-ink/60 focus:ring-2"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer p-2 text-ink transition-colors hover:text-accent"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
          </form>
        </div>

        <div className="mx-auto w-full max-w-sm animate-fade-up [animation-delay:300ms] motion-reduce:animate-none md:w-[24rem] md:max-w-none lg:w-[31rem]">
          <Image
            src="/image/blog-hero.png"
            alt="Smiling Enhance English students"
            width={704}
            height={463}
            preload
            sizes="(min-width: 1024px) 496px, (min-width: 768px) 384px, 384px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
