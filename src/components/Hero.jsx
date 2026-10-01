import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

const button =
  "flex items-center gap-3 border px-4 py-2.5 font-semibold transition-colors";

// Tags are placed with top + right so they grow away from the student's face.
const tag =
  "absolute rounded-sm bg-white px-2 py-1.5 text-[10px] leading-tight whitespace-nowrap text-ink shadow-md sm:px-3 sm:py-2 sm:text-xs lg:text-base";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-blue text-white">
      {/* Background wave */}
      <svg
        viewBox="0 0 1920 520"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 h-full w-full max-w-[1920px] -translate-x-1/2 overflow-visible"
      >
        <path
          d="M-1400 200C-800 200-300 250-60 290C120 320 300 540 560 530C800 520 860 40 1000 34C1100 30 1160 190 1260 300C1400 454 1640 300 1720 170C1780 70 1860 10 1960-20"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="50"
        />
      </svg>

      {/* Stacked on phones and tablets, side by side on desktop */}
      <div className="site-container py-12 lg:flex lg:items-center lg:justify-between lg:py-6">
        {/* Text */}
        <div className="relative lg:py-16">
          {/* Font size: phones → tablets → desktop */}
          <h1 className="text-[clamp(1.75rem,11vw,2.75rem)] leading-[1.13] font-light text-[#FDFDFD] sm:text-6xl lg:text-[4.75rem]">
            Score{" "}
            <span className="inline-block -rotate-3 bg-brand-orange px-[0.2em] font-display tracking-wide shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)]">
              7+ Band
            </span>
            <br />
            on <strong className="font-black">IELTS</strong>
          </h1>

          <p className="mt-6 w-fit bg-brand-yellow px-2 py-1.5 leading-snug text-ink sm:text-lg lg:text-xl">
            Join <strong>Enhance English’s Coaching Classes</strong> or{" "}
            <strong>Language Clubs</strong>
            <br className="hidden sm:block" /> And Build Confidence in English
            for <strong>Study, Work, and Life.</strong>
          </p>

          <div className="mt-6 flex flex-wrap gap-4 sm:gap-6">
            <Link
              href="/book-demo"
              className={`${button} border-brand-orange bg-brand-orange hover:border-white hover:bg-white hover:text-brand-orange`}
            >
              Book Free Demo Class
              <ArrowRightIcon className="size-5" />
            </Link>
            <Link
              href="/programs"
              className={`${button} border-white hover:bg-white hover:text-brand-blue`}
            >
              Explore Programs
              <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </div>

        {/* Photo — the circle, doodles and yellow edge are part of the image file */}
        <div className="relative mt-12 ml-auto w-[78%] max-w-sm sm:mx-auto lg:mt-0 lg:mr-[3.5%] lg:ml-0 lg:w-[30%] lg:max-w-none lg:shrink-0">
          <Image
            src="/image/hero-image.png"
            alt="Student taking notes in an Enhance English class"
            width={942}
            height={942}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 384px, 78vw"
            preload
            className="h-auto w-full"
          />

          <p className={`${tag} top-[19%] right-[82%]`}>
            <strong className="block">Online &amp; Offline</strong>
            Batches
          </p>
          <p className={`${tag} top-[53%] -right-[1%]`}>
            <strong className="block">5000+</strong>
            Happy Students
          </p>
          <p className={`${tag} top-[78%] right-[85%]`}>
            <strong className="block">5000+</strong>
            Happy Students
          </p>
        </div>
      </div>
    </section>
  );
}
