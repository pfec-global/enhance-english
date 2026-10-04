import Marquee from "@/components/Marquee";
import { highlights } from "@/data/awards";

/*
  Blue section with a yellow scrolling band along the top and a tilted one along
  its angled bottom edge. Used for "Awards & Recognitions" and for the student
  reviews. `labelledBy` is the id of the heading inside; `className` sets the
  space kept free above the tilted band.
*/
export default function MarqueeBand({
  labelledBy,
  className = "pb-[calc(1.75vw+7rem)]",
  children,
}) {
  return (
    // The section's own background shows as the light strip under the tilted band.
    <section
      aria-labelledby={labelledBy}
      className="overflow-hidden bg-surface pb-12"
    >
      <div className="relative">
        {/* Blue area. Its bottom edge is cut at an angle (3.5vw of drop = 2 degrees). */}
        <div
          className={`bg-brand-royal text-white [clip-path:polygon(0_0,100%_0,100%_calc(100%-3.5vw),0_100%)] ${className}`}
        >
          <Marquee items={highlights} />
          {children}
        </div>

        {/* Tilted band, centred on the angled edge of the blue area */}
        <Marquee
          items={highlights}
          reverse
          className="absolute -inset-x-[3%] bottom-[1.75vw] translate-y-1/2 -rotate-2"
        />
      </div>
    </section>
  );
}
