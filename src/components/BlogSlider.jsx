"use client";

import { useEffect, useRef } from "react";
import useDragScroll from "@/hooks/useDragScroll";
import BlogCard from "@/components/BlogCard";

const GAP = 16; // gap-4 between cards

// Slider of blog cards with autoplay. It can also be dragged with the mouse or swiped on touch screens.
export default function BlogSlider({ posts }) {
  const trackRef = useRef(null);
  useDragScroll(trackRef);
  const pausedRef = useRef(false);

  // Autoplay: move one page every 5 seconds and return to the start after the last page.
  // Paused while the mouse or a finger is on the slider.
  useEffect(() => {
    const timer = setInterval(() => {
      if (pausedRef.current) return;
      const track = trackRef.current;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + track.clientWidth + GAP, behavior: "smooth" });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    // 1 card per page on mobile, 2 on tablet, 3 on small laptops, 4 on desktop
    <div
      ref={trackRef}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={() => (pausedRef.current = true)}
      onTouchEnd={() => (pausedRef.current = false)}
      className="grid cursor-grab snap-x snap-mandatory select-none grid-flow-col auto-cols-[100%] gap-4 overflow-x-auto py-4 [scrollbar-width:none] active:cursor-grabbing sm:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-2rem)/3)] xl:auto-cols-[calc((100%-3rem)/4)]"
    >
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} className="snap-start" />
      ))}
    </div>
  );
}
