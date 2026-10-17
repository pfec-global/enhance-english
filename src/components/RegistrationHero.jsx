import Image from "next/image";

const badge =
  "absolute z-10 animate-float rounded-xl border border-black/10 bg-white px-3 text-ink py-2 text-center leading-tight shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)] motion-reduce:animate-none sm:px-4";

// Top of an exam registration page: logo, title and intro on the left, a student
// with two floating badges on the right, all on the exam's colour (orange for
// IELTS, blue for PTE). `page` comes from data/examRegistration.js.
export default function RegistrationHero({ page }) {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: page.colors.main }}
    >
      {/* Background ribbon, turned into a faint white wave */}
      <Image
        src="/image/rebon.png"
        alt=""
        width={3840}
        height={1219}
        sizes="(min-width: 1024px) 100vw, 1024px"
        className="absolute bottom-0 left-0 h-auto w-[max(100%,64rem)] max-w-none opacity-25 brightness-0 invert"
      />

      {/*
        phones, tablets: intro, then the picture below it
        desktop:         intro on the left, picture on the right
      */}
      <div className="site-container relative grid items-center gap-8 py-10 lg:grid-cols-[1fr_auto] lg:py-12">
        {/* Intro — it slides in from the left one part after another on page load */}
        <div>
          <div className="w-fit animate-slide-in rounded-lg bg-white px-4 py-2.5 motion-reduce:animate-none">
            <Image
              src={page.logo.src}
              alt={page.logo.alt}
              width={page.logo.width}
              height={page.logo.height}
              sizes="208px"
              preload
              className="h-10 w-auto sm:h-12"
            />
          </div>

          <h1 className="mt-5 max-w-[16em] animate-slide-in text-3xl leading-[1.25] font-bold [animation-delay:100ms] motion-reduce:animate-none sm:text-4xl lg:text-[2.625rem]">
            {page.title}
          </h1>

          <div className="animate-slide-in [animation-delay:200ms] motion-reduce:animate-none">
            <hr className="mt-6 w-56 border-white/60" />
            <p className="mt-5 max-w-xl sm:text-lg">{page.text}</p>
            <p className="mt-4 font-bold sm:text-lg">
              Zero Extra Fees. 100% Reliable Guidance
            </p>
          </div>
        </div>

        {/* Picture with the two badges floating over its top corners */}
        <div className="relative mx-auto w-full max-w-md animate-pop-in pt-8 [animation-delay:200ms] motion-reduce:animate-none lg:w-[28rem]">
          <p className={`top-0 left-0 ${badge}`}>
            <strong className="block text-lg sm:text-xl">
              ৳{page.cashback}
              <br />
              Cashback
            </strong>
            <span className="text-xs">for all Registrants!</span>
          </p>
          <p
            className={`top-6 right-0 [animation-delay:-3s] ${badge}`}
          >
            <strong className="block text-lg sm:text-xl">
              No Extra
              <br />
              Charges
            </strong>
            <span className="text-xs">for Registration</span>
          </p>

          <Image
            src={page.heroImage}
            alt=""
            width={800}
            height={604}
            sizes="(min-width: 1024px) 448px, (min-width: 512px) 448px, 100vw"
            preload
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
