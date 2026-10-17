import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  ArrowRightIcon,
  CalendarHeartIcon,
  ChatIcon,
  HeartHandshakeIcon,
  ListCheckIcon,
} from "@/components/icons";

const icons = {
  handshake: HeartHandshakeIcon,
  calendar: CalendarHeartIcon,
  chat: ChatIcon,
  list: ListCheckIcon,
};

// The 4 numbered steps of registering through us, joined by a bar in the
// exam's colour. `page` comes from data/examRegistration.js.
export default function RegistrationSteps({ page }) {
  return (
    <section
      aria-labelledby="how-it-works"
      className="bg-linear-to-b from-[#fff1e000] to-[#fff1e0]"
      style={{ "--main": page.colors.main }}
    >
      <div className="site-container py-12 text-center lg:py-16">
        <h2 id="how-it-works" className="text-3xl font-bold lg:text-4xl">
          How to Register through Us
        </h2>

        {/* 1 step per row on phones, 2 on tablets, all 4 in a row on desktop */}
        <ol className="mx-auto mt-8 grid max-w-5xl gap-8 text-left sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-0">
          {page.steps.map((step, index) => {
            const StepIcon = icons[step.icon];
            const last = index === page.steps.length - 1;

            return (
              <li key={step.text}>
                {/* Each step appears after the one before it */}
                <Reveal delay={index * 150}>
                  <span className="block text-4xl font-bold text-black/15 lg:text-5xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-2 flex items-center">
                    <span className="grid size-12 shrink-0 place-items-center border border-black/25 bg-white text-brand-royal shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)]">
                      <StepIcon className="size-6" strokeWidth={1.5} />
                    </span>
                    {/* Bar to the next step, desktop only */}
                    {!last && (
                      <span className="mx-3 hidden h-1.5 flex-1 rounded-full bg-(--main) lg:block" />
                    )}
                  </div>
                  <p className="mt-3 max-w-[13em] leading-snug font-bold">
                    {step.text}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 text-sm">
          Don’t wait! Free expert guidance &amp; ৳{page.cashback} Cashback are
          yours to grab!
        </p>
        <Link
          href="#join"
          className="mt-4 inline-flex items-center gap-2 rounded-sm border border-brand-orange bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
        >
          Sign me Up!
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  );
}
