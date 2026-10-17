import { useEffect } from "react";

// Lets the user drag a horizontal slider with the mouse (touch swiping already works without this)
export default function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;
    let snapTimer;

    const onMouseDown = (e) => {
      dragging = true;
      moved = false;
      startX = e.pageX;
      startScroll = el.scrollLeft;
      clearTimeout(snapTimer);
    };

    const onMouseMove = (e) => {
      if (!dragging) return;
      const distance = e.pageX - startX;
      // Only count it as a drag after 5px, so a normal click still works
      if (!moved && Math.abs(distance) > 5) {
        moved = true;
        el.style.scrollSnapType = "none"; // snapping fights the drag, so switch it off meanwhile
      }
      if (moved) el.scrollLeft = startScroll - distance;
    };

    const onMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      if (!moved) return;

      // Glide to the nearest card, then switch snapping back on
      const firstLeft = el.firstElementChild.offsetLeft;
      let target = 0;
      for (const child of el.children) {
        const left = child.offsetLeft - firstLeft;
        if (Math.abs(left - el.scrollLeft) < Math.abs(target - el.scrollLeft)) target = left;
      }
      el.scrollTo({ left: target, behavior: "smooth" });
      snapTimer = setTimeout(() => (el.style.scrollSnapType = ""), 500);
    };

    // Stop a drag from also opening the link under the mouse
    const onClick = (e) => {
      if (!moved) return;
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    };

    // Stop the browser's own image/link dragging
    const onDragStart = (e) => e.preventDefault();

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("click", onClick, true);
    el.addEventListener("dragstart", onDragStart);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      clearTimeout(snapTimer);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("dragstart", onDragStart);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [ref]);
}
