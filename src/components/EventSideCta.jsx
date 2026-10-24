import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

// Students in circles, with soft empty circles between them
const circles = [
  { image: "/image/avater_image_1.png", color: "bg-brand-orange" },
  {},
  { image: "/image/avater.webp", color: "bg-brand-yellow" },
  {},
  { image: "/image/avater_image_2.png", color: "bg-brand-blue" },
  {},
];

// "Can't find the event you need?" card beside the events timeline. The button opens the
// free demo class / consultation form (components/DemoClassModal.jsx).
export default function EventSideCta() {
  return (
    <aside className="border border-black/15 bg-[#fdeceb] p-5 text-center shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)]">
      <div className="mx-auto grid max-w-64 grid-cols-3 gap-2">
        {circles.map((circle, index) =>
          circle.image ? (
            <div
              key={index}
              className={`relative aspect-square overflow-hidden rounded-full ${circle.color}`}
            >
              <Image
                src={circle.image}
                alt=""
                fill
                sizes="80px"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div
              key={index}
              className="aspect-square rounded-full bg-[#d6cfe4]"
            />
          ),
        )}
      </div>

      <h2 className="mt-4 text-lg leading-snug font-bold">
        Can&apos;t Find the Event that You Need?
      </h2>
      <p className="mt-2 text-xs text-ink/75">
        You can still join us for a free consultation and get free expert
        assistance.
      </p>
      <Link
        href="/book-demo"
        className="mt-4 inline-flex items-center gap-2 border border-brand-orange bg-brand-orange px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
      >
        Book Free Consultation
        <ArrowRightIcon className="size-4" />
      </Link>
    </aside>
  );
}
