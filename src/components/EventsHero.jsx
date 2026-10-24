import Image from "next/image";

// Hero of the events list page (app/events/page.js): the "Events" tag, title and intro on the
// left, students around a calendar on the right (below on phones), on an indigo band with
// blue edges.
export default function EventsHero() {
  return (
    <section className="overflow-hidden border-y-4 border-brand-blue bg-[#232a7a] text-white">
      <div className="site-container grid items-center gap-8 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:py-12">
        <div>
          <p className="inline-block animate-fade-up bg-brand-orange px-2 py-1 text-xs font-semibold motion-reduce:animate-none">
            Events
          </p>
          <h1 className="mt-4 max-w-2xl animate-fade-up text-3xl leading-tight font-bold [animation-delay:100ms] motion-reduce:animate-none sm:text-4xl lg:text-[2.75rem]">
            Level Up Your English Language Skills by Attending Events
          </h1>
          <p className="mt-4 max-w-xl animate-fade-up text-sm text-white/85 [animation-delay:200ms] motion-reduce:animate-none sm:text-base">
            Enhance English curates events that bring together students, English
            language experts &amp; study abroad counselors. These events aim to
            help students achieve their goals.
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm animate-pop-in [animation-delay:200ms] motion-reduce:animate-none md:max-w-none">
          <Image
            src="/image/blog-hero.png"
            alt="Students studying around a calendar of upcoming events"
            width={933}
            height={507}
            preload
            sizes="(min-width: 1024px) 512px, (min-width: 768px) 384px, 384px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
