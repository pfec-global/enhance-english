import Image from "next/image";

// One full set of items. It is at least as wide as the screen, so there is never a gap.
function Group({ items, reverse, hidden }) {
  return (
    <ul
      aria-hidden={hidden}
      className={`flex min-w-full shrink-0 animate-marquee items-center justify-around group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none ${
        reverse ? "[animation-direction:reverse]" : ""
      }`}
    >
      {/* The items are listed twice so the band is also full on very wide screens */}
      {[...items, ...items].map((item, index) => (
        <li key={index} className="flex items-center whitespace-nowrap">
          <span className="px-4 sm:px-6">{item}</span>
          <Image
            src="/image/ee_small_logo.png"
            alt=""
            width={70}
            height={70}
            className="size-6 sm:size-8"
          />
        </li>
      ))}
    </ul>
  );
}

/*
  Yellow band with text that scrolls sideways forever (pauses under the mouse).
  `items` is a list of short lines. `reverse` scrolls left-to-right instead.
*/
export default function Marquee({ items, reverse = false, className = "" }) {
  return (
    <div
      className={`group/marquee flex h-10 overflow-hidden bg-brand-yellow font-medium text-ink sm:h-12 sm:text-xl lg:text-[1.375rem] ${className}`}
    >
      {/* Two identical groups side by side: when the first has scrolled away, the second has taken its place */}
      <Group items={items} reverse={reverse} />
      <Group items={items} reverse={reverse} hidden />
    </div>
  );
}
