import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, ReturnIcon } from "@/components/icons";

const detail = "flex items-start gap-2 text-sm font-semibold";

const detailIcon = "mt-px size-4.5 shrink-0 text-brand-orange";

// White notes around the student. They drift slowly around their spot (animate-float),
// each at its own speed so they never move together.
const tag =
  "absolute animate-float rounded-sm bg-white px-2 py-1.5 text-[10px] leading-tight whitespace-nowrap text-ink shadow-md motion-reduce:animate-none sm:px-3 sm:py-2 sm:text-xs";

/*
  Top of the thank-you page: "Thank you for Registering with Enhance English", a line of
  text, and a button back home on the left; a student in front of soft shapes, with three
  notes around them, on the right (below on phones). Indigo band with blue edges and a faint
  wave, like the event details hero (EventHero.jsx).
  `event` (data/events.js shape, optional): the event just registered for. Its summary is the
  line of text, and a white box with when and where is added.
*/
export default function ThankYouHero({ event }) {
  return (
    <section className="relative overflow-hidden border-y-4 border-brand-blue bg-[#1d297c] text-white">
      {/* The faint wave across the band */}
      <Image
        src="/image/thank-you/rebon.png"
        alt=""
        width={2880}
        height={830}
        sizes="100vw"
        className="pointer-events-none absolute bottom-0 left-0 w-full select-none"
      />

      <div className="site-container relative grid items-center gap-10 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:py-14">
        <div>
          <h1 className="animate-fade-up text-3xl leading-tight motion-reduce:animate-none sm:text-4xl lg:text-[2.75rem]">
            <strong className="block font-bold">
              Thank you for Registering
            </strong>
            <span className="font-light">with Enhance English</span>
          </h1>
          <p className="mt-4 max-w-xl animate-fade-up text-sm text-white/85 [animation-delay:100ms] motion-reduce:animate-none sm:text-base">
            {event?.summary ||
              "We have received your details. Our team will call you soon to help you with the next steps towards your target score."}
          </p>

          {event && (
            <div className="mt-6 inline-block animate-fade-up space-y-2 bg-white px-4 py-3 text-ink shadow-[0.3rem_0.3rem_0_var(--color-brand-yellow)] [animation-delay:200ms] motion-reduce:animate-none">
              <p className={detail}>
                <CalendarIcon className={detailIcon} strokeWidth={1.5} />
                {event.date} | {event.time}
              </p>
              <p className={detail}>
                <MapPinIcon className={detailIcon} strokeWidth={1.5} />
                {event.location}
              </p>
            </div>
          )}

          <p className="mt-6 animate-fade-up [animation-delay:300ms] motion-reduce:animate-none">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-brand-orange bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-brand-orange"
            >
              Back to Homepage
              <ReturnIcon className="size-4" />
            </Link>
          </p>
        </div>

        {/* py: room for the student, who is taller than the shapes behind */}
        <div className="relative mx-auto w-full max-w-xl animate-pop-in py-[7%] [animation-delay:200ms] motion-reduce:animate-none">
          <Image
            src="/image/thank-you/back.png"
            alt=""
            width={1128}
            height={545}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="h-auto w-full"
          />
          <div className="absolute top-1/2 left-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/image/thank-you/hero-img.png"
              alt="Smiling Enhance English student with a backpack"
              width={707}
              height={707}
              preload
              sizes="(min-width: 768px) 28vw, 62vw"
              className="h-auto w-full"
            />
            <p className={`${tag} top-[14%] right-[72%]`}>
              <strong className="block">Award Winning</strong>
              Coaching Center
            </p>
            <p
              className={`${tag} top-[44%] -right-[8%] [animation-delay:-2s] [animation-direction:reverse] [animation-duration:9s]`}
            >
              <strong className="block">5000+</strong>
              Happy Students
            </p>
            <p
              className={`${tag} top-[72%] right-[78%] [animation-delay:-4s] [animation-duration:8s]`}
            >
              <strong className="block">12+ Years</strong>
              Tutor Experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
