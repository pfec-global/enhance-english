"use client";

import { useRef, useState } from "react";
import BlogCard from "@/components/BlogCard";

const PER_PAGE = 12;

// A list of posts (author page, category page): sort, search by title, a grid of cards and the pagination.
// Sorting, searching and paging all happen here in the browser on the posts that were passed in.
export default function BlogPostList({ posts }) {
  const topRef = useRef(null);
  const [sort, setSort] = useState("recent");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const search = query.trim().toLowerCase();
  const results = posts
    .filter((post) => post.title.toLowerCase().includes(search))
    .sort((a, b) => (sort === "recent" ? b.date - a.date : a.date - b.date));
  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const visible = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Change page (kept between 1 and the last page) and scroll back to the top of the list
  const goTo = (next) => {
    setPage(Math.min(pages, Math.max(1, next || 1)));
    topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pagerButton =
    "inline-flex items-center gap-2 font-semibold text-accent transition-opacity hover:underline disabled:pointer-events-none disabled:opacity-40";

  return (
    <div ref={topRef} className="scroll-mt-28 lg:scroll-mt-32">
      {/* Sort on the left, search on the right */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 4v16m0 0l-3-3m3 3l3-3M17 20V4m0 0l-3 3m3-3l3 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="sr-only">Sort posts</span>
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="cursor-pointer bg-transparent py-2 pr-1 font-semibold outline-none"
          >
            <option value="recent">Recent First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </label>

        <div className="relative w-full sm:w-72">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search Topic"
            aria-label="Search posts"
            className="w-full rounded-lg border border-ink/10 bg-white py-2.5 pl-4 pr-10 text-sm outline-none transition focus:border-accent"
          />
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {visible.length > 0 ? (
        // 1 card per row on mobile, 2 on tablet, 3 on desktop
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-white px-4 py-12 text-center text-sm text-ink/70">
          {query.trim() ? `No posts found for “${query.trim()}”.` : "There are no posts here yet."}
        </p>
      )}

      {/* Pagination */}
      <div className="mt-8 flex flex-col items-center gap-4 text-xs sm:flex-row sm:justify-between sm:text-sm">
        <p className="text-ink/70">Displaying {PER_PAGE} Results per Page</p>

        <div className="flex items-center gap-8">
          <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} className={pagerButton}>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 12H4m6-6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Previous
          </button>
          <button type="button" onClick={() => goTo(page + 1)} disabled={page === pages} className={pagerButton}>
            Next
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Type a page number to jump straight to it */}
        <label className="flex items-center gap-2 text-ink/70">
          <span className="sr-only">Page</span>
          <input
            type="number"
            min={1}
            max={pages}
            value={page}
            onChange={(e) => goTo(Number(e.target.value))}
            className="w-12 rounded-md border border-ink/15 bg-white px-1 py-1.5 text-center font-semibold text-ink outline-none focus:border-accent"
          />
          of {pages} Pages
        </label>
      </div>
    </div>
  );
}
