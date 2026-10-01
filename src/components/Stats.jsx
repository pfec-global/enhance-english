import Image from "next/image";
import CountUp from "@/components/CountUp";

// On phones the text size follows the screen width so three numbers fit in one row.
const stat =
  "shrink-0 text-[min(3vw,1rem)] leading-tight sm:text-lg lg:text-2xl";

const number =
  "w-fit bg-linear-to-r from-brand-navy to-brand-navy/45 bg-clip-text font-coiny text-[min(6vw,2rem)] leading-[1.1] text-transparent sm:text-4xl lg:text-5xl";

const divider = "w-px shrink-0 self-stretch bg-brand-orange/50";

export default function Stats() {
  return (
    <section aria-label="Enhance English in numbers" className="bg-surface">
      {/*
        Everything starts on the same left line as the hero text.
        phones, tablets: three numbers in one row, badge in a second row
        desktop:         everything in one row
      */}
      <div className="site-container flex flex-wrap items-center justify-between gap-x-2 gap-y-6 py-8 sm:gap-x-8 sm:gap-y-8 sm:py-10 lg:gap-x-12 lg:py-12 xl:flex-nowrap 2xl:gap-x-16">
        <div className={stat}>
          <p>Trusted by</p>
          <p className={number}>
            <CountUp end={5000} />+
          </p>
          <p>Students</p>
        </div>

        <span className={divider} />

        <div className={stat}>
          <p className={number}>
            <CountUp end={12} />+ Years
          </p>
          <p>Average Experience</p>
          <p className="font-bold">of our Instructors</p>
        </div>

        <span className={divider} />

        <div className={stat}>
          <p className={number}>
            <CountUp end={10} />
          </p>
          <p>Certified</p>
          <p className="font-bold">Instructors</p>
        </div>

        <span className={`${divider} hidden xl:block`} />

        <Image
          src="/image/british_council_ielts.png"
          alt="Official IELTS Registration Center and Associate Member, recognized by British Council IELTS"
          width={1228}
          height={228}
          sizes="(min-width: 640px) 612px, 100vw"
          className="h-auto w-full max-w-[38.25rem] basis-full xl:min-w-0 xl:shrink xl:basis-auto"
        />
      </div>
    </section>
  );
}
