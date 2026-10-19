import Image from "next/image";
import Link from "next/link";
import { FaqItem, FaqList } from "@/components/FaqAccordion";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarIcon,
  ChatIcon,
  ChevronDownIcon,
  LetterIcon,
  SpeakerIcon,
} from "@/components/icons";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";

const formatIcons = {
  listening: SpeakerIcon,
  reading: BookOpenIcon,
  writing: LetterIcon,
  speaking: ChatIcon,
};

const card =
  "border border-black/15 bg-white shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)]";

const button =
  "inline-flex items-center gap-3 rounded-sm border border-brand-orange px-4 py-2.5 text-sm font-semibold transition-colors";

const sectionTitle = "text-3xl font-bold lg:text-4xl";

/*
  Exam page such as "What is IELTS?" / "What is PTE?": what the test is, its
  types, format, scoring and FAQs. `info` is in the shape of data/examInfo.js
  (from the admin, or the built-in pages there); its colours follow the exam's
  course pages (orange for IELTS, blue for PTE). Sections the admin left empty
  are not shown.
*/
// `results` ({ exams, testimonials }, optional) are the admin's student results (see lib/api.js).
export default function ExamInfoPage({ info, results }) {
  // The admin sends every heading; the built-in pages use this wording
  const title = info.title ?? `What is ${info.name}?`;
  const headings = {
    types: `Types of ${info.name} Test`,
    format: `${info.name} Test Format`,
    scoring: `How is ${info.name} Scored?`,
    faq: "Frequently Asked Questions",
    cta: `Ready to Start Your ${info.name} Preparation?`,
    ...info.headings,
  };
  const ctaText =
    info.ctaText ??
    "Join expert-led courses and mock tests designed to help you achieve your target score.";

  return (
    <div style={{ "--accent-exam": info.accent }}>
      {/* ---------- Hero: intro on the left, quick facts on the right ---------- */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: info.colors.hero }}
      >
        <Image
          src="/image/rebon.png"
          alt=""
          width={3840}
          height={1219}
          sizes="(min-width: 1024px) 100vw, 1024px"
          className="absolute bottom-0 left-0 h-auto w-[max(100%,64rem)] max-w-none"
        />

        <div className="site-container relative grid items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-16 lg:py-16">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="animate-fade-up text-sm motion-reduce:animate-none"
            >
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-brand-orange">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronDownIcon className="size-4 -rotate-90 text-brand-orange" />
                </li>
                <li>
                  <Link href={info.courseHref} className="hover:text-brand-orange">
                    {info.name} Courses
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronDownIcon className="size-4 -rotate-90 text-brand-orange" />
                </li>
                <li aria-current="page" className="font-semibold">
                  {title}
                </li>
              </ol>
            </nav>

            {info.logo && (
              <Image
                src={info.logo.src}
                alt={info.logo.alt ?? info.name}
                width={info.logo.width}
                height={info.logo.height}
                sizes="160px"
                preload
                className="mt-6 h-12 w-auto animate-fade-up [animation-delay:100ms] motion-reduce:animate-none"
              />
            )}
            <h1
              className="mt-4 animate-fade-up text-3xl leading-tight font-bold [animation-delay:100ms] motion-reduce:animate-none sm:text-4xl lg:text-[2.625rem]"
              style={{ color: info.colors.title }}
            >
              {title}
            </h1>
            {info.fullName && (
              <p className="mt-1 animate-fade-up text-sm font-semibold tracking-wider text-ink/60 uppercase [animation-delay:100ms] motion-reduce:animate-none">
                {info.fullName}
              </p>
            )}
            <p className="mt-5 max-w-2xl animate-fade-up [animation-delay:200ms] motion-reduce:animate-none sm:text-lg">
              {info.intro}
            </p>

            <div className="mt-7 flex animate-fade-up flex-wrap gap-x-4 gap-y-3 [animation-delay:300ms] motion-reduce:animate-none">
              <Link
                href="/book-demo"
                className={`${button} bg-brand-orange text-white hover:bg-transparent hover:text-brand-orange`}
              >
                Book Free Demo Class
                <CalendarIcon className="size-5" />
              </Link>
              <Link
                href={info.registerHref}
                className={`${button} bg-white/60 hover:bg-brand-orange hover:text-white`}
              >
                Register for {info.name} Exam
                <ArrowRightIcon className="size-5" />
              </Link>
            </div>
          </div>

          {/* Quick facts, 2 per row */}
          {info.facts.length > 0 && (
            <dl className="grid grid-cols-2 gap-4 sm:gap-5">
              {info.facts.map((fact, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                  className={`${card} animate-pop-in p-5 motion-reduce:animate-none`}
                >
                  <dt className="text-sm text-ink/70">{fact.label}</dt>
                  <dd className="mt-1 text-xl font-bold text-(--accent-exam) sm:text-2xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* ---------- Types of test ---------- */}
      {info.types.length > 0 && (
        <section aria-labelledby="types" className="bg-surface">
          <div className="site-container py-12 lg:py-16">
            <h2 id="types" className={sectionTitle}>
              {headings.types}
            </h2>
            {info.owners && (
              <p className="mt-3 max-w-3xl sm:text-lg">{info.owners}</p>
            )}

            {/* 1 card per row on phones, 3 in a row from tablets up */}
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {info.types.map((type, index) => (
                <li key={index}>
                  <Reveal delay={index * 120} className="grid h-full">
                    <article className={`${card} border-t-4 border-t-(--accent-exam) p-6`}>
                      <h3 className="text-xl font-bold">{type.name}</h3>
                      <p className="mt-2">{type.text}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- Test format ---------- */}
      {info.format.length > 0 && (
        <section aria-labelledby="format">
          <div className="site-container py-12 lg:py-16">
            <h2 id="format" className={sectionTitle}>
              {headings.format}
            </h2>

            {/* 1 card per row on phones, 2 on tablets, all in one row on desktop */}
            <ol
              className={`mt-8 grid gap-6 sm:grid-cols-2 ${
                info.format.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              }`}
            >
              {info.format.map((part, index) => {
                const PartIcon = formatIcons[part.icon];
                return (
                  <li key={index}>
                    <Reveal delay={index * 120} className="grid h-full">
                      {/* Hover: the card lifts and its yellow edge grows */}
                      <article className={`${card} flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0.5rem_0.5rem_0_var(--color-brand-yellow)]`}>
                        <div className="flex items-start justify-between">
                          <span className="grid size-12 place-items-center rounded-lg bg-(--accent-exam)/10 text-(--accent-exam)">
                            <PartIcon className="size-6" strokeWidth={1.5} />
                          </span>
                          <span className="text-4xl font-bold text-black/10">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="mt-4 text-xl font-bold">{part.name}</h3>
                        {part.time && (
                          <p className="mt-1 w-fit rounded-sm bg-brand-yellow px-2 py-0.5 text-sm font-semibold">
                            {part.time}
                          </p>
                        )}
                        <p className="mt-3">{part.text}</p>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
            {info.formatNote && (
              <p className="mt-6 text-sm text-ink/70 sm:text-base">
                {info.formatNote}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ---------- Scoring: text on the left, score scale on the right ---------- */}
      {(info.scoring.text || info.scoring.scale.length > 0) && (
        <section aria-labelledby="scoring" className="bg-surface">
          <div className="site-container grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
            <div>
              <h2 id="scoring" className={sectionTitle}>
                {headings.scoring}
              </h2>
              {info.scoring.text && (
                <p className="mt-4 sm:text-lg">{info.scoring.text}</p>
              )}
            </div>

            {info.scoring.scale.length > 0 && (
              <Reveal>
                <ul className={`${card} divide-y divide-black/10`}>
                  {info.scoring.scale.map((step, index) => (
                    <li key={index} className="flex items-center gap-4 px-5 py-3">
                      <span className="grid h-10 min-w-14 place-items-center rounded-md bg-(--accent-exam) px-2 font-bold text-white">
                        {step.score}
                      </span>
                      {step.label}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ---------- FAQ ---------- */}
      {info.faqs.length > 0 && (
        <section aria-labelledby="faq">
          <div className="site-container py-12 lg:py-16">
            <h2 id="faq" className={`${sectionTitle} text-center`}>
              {headings.faq}
            </h2>
            <div className="mx-auto mt-6 max-w-3xl">
              <FaqList>
                {info.faqs.map((faq, index) => (
                  <FaqItem key={index}>
                    {faq.question}
                    <p className="px-4 pb-4 whitespace-pre-line text-ink/80">{faq.answer}</p>
                  </FaqItem>
                ))}
              </FaqList>
            </div>
          </div>
        </section>
      )}

      {/* Same section as on the home page, limited to this exam's results */}
      <Reveal>
        <Testimonials exam={info.exam} {...results} />
      </Reveal>

      {/* ---------- Call to action, on the exam's colour ---------- */}
      <section style={{ backgroundColor: info.accent }} className="text-white">
        <div className="site-container py-12 text-center lg:py-14">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            {headings.cta}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl sm:text-lg">{ctaText}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={info.courseHref}
              className="inline-flex items-center gap-3 rounded-sm bg-white px-5 py-3 font-semibold text-ink transition-colors hover:bg-brand-yellow"
            >
              Explore {info.name} Courses
              <ArrowRightIcon className="size-5" />
            </Link>
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-3 rounded-sm border border-white px-5 py-3 font-semibold transition-colors hover:bg-white hover:text-ink"
            >
              Book Free Demo Class
              <CalendarIcon className="size-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
