"use client";

import { useRef } from "react";
import Link from "next/link";
import useDragScroll from "@/hooks/useDragScroll";

// "Explore by Category" bar of the blog list page. categories is a list of { label, href }.
// Always one row: if the categories do not fit, the row scrolls sideways instead of wrapping -
// by dragging with the mouse, or swiping on touch screens.
export default function BlogCategoryBar({ categories }) {
  const listRef = useRef(null);
  useDragScroll(listRef);

  return (
    <div className="border-b border-ink/10 bg-white">
      <div className="site-container flex flex-col gap-x-4 gap-y-2 py-4 text-xs sm:flex-row sm:items-center sm:text-sm">
        <span className="shrink-0 text-ink/70">Explore by Category:</span>
        <ul
          ref={listRef}
          className="flex min-w-0 cursor-grab select-none items-center divide-x divide-ink/30 overflow-x-auto whitespace-nowrap [scrollbar-width:none] active:cursor-grabbing"
        >
          {categories.map((category) => (
            <li key={category.href} className="px-3 first:pl-0 last:pr-0 sm:px-4">
              <Link href={category.href} draggable={false} className="font-semibold text-accent hover:underline">
                {category.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
