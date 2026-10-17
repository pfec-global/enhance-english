import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/icons";

// "… Exam Options, Formats & Fees": one white card per test, on the exam's
// colour. `page` comes from data/examRegistration.js.
export default function RegistrationOptions({ page }) {
  const { options } = page;

  return (
    <section
      aria-labelledby="exam-options"
      style={{ backgroundColor: page.colors.main, "--main": page.colors.main }}
    >
      <div className="site-container py-12 text-center lg:py-16">
        <h2
          id="exam-options"
          className="text-3xl font-semibold text-white lg:text-4xl"
        >
          {options.title}
        </h2>

        {/* 1 card per row on phones, 3 in a row from tablets up */}
        <ul className="mt-8 grid gap-6 text-left md:grid-cols-3">
          {options.items.map((item, index) => (
            <li key={item.name.join(" ")}>
              <Reveal delay={index * 120} className="grid h-full">
                <article className="rounded-xl bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <h3 className="text-2xl leading-tight font-bold">
                    {item.name[0]}
                    <br />
                    {item.name[1]}
                  </h3>
                  <span className="mt-4 block h-1 w-14 bg-(--main)" />

                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="font-bold">Best for:</dt>
                      <dd>{item.bestFor}</dd>
                    </div>
                    <div>
                      <dt className="font-bold">{options.formatLabel}</dt>
                      <dd>{item.format}</dd>
                    </div>
                    <div>
                      <dt className="font-bold">Official Fee:</dt>
                      <dd>{item.fee}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-white/90">
          Considering any one of these? We can help you out with the next
          steps.
        </p>
        <Link
          href="#join"
          className="mt-4 inline-flex items-center gap-2 rounded-sm bg-[#2d0097] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#2d0097]"
        >
          Sign me Up!
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  );
}
