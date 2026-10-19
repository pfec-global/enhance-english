import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { CalendarIcon, GiftIcon, TicketIcon } from "@/components/icons";

// "2026-10-23" -> "Fri, 23 Oct 2026" (read as a plain date, so the time zone can't shift it)
const formatDate = (value) =>
  new Date(`${value}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const detail = "flex items-start gap-2 text-[0.9375rem]";

const detailIcon = "mt-0.5 size-5 shrink-0 text-brand-orange";

// One exam on the /exam-registration list: logo on the exam's colour, what we offer and
// the two buttons. The whole card opens the exam's page: the title link stretches over
// the card, and the buttons sit above it (see components/Button.jsx).
// `page` is in the shape of data/examRegistration.js.
export default function RegistrationCard({ page }) {
  return (
    // Hover: the card lifts and its coloured edge grows (same as the event cards)
    <article
      className="group relative flex h-full flex-col border border-black/15 bg-card shadow-[0.25rem_0.25rem_0_var(--main)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0.5rem_0.5rem_0_var(--main)]"
      style={{ "--main": page.colors.main }}
    >
      <div className="flex min-h-28 items-center justify-between gap-4 bg-(--main) px-5 py-5">
        {page.logo ? (
          <span className="rounded-lg bg-white px-3 py-2">
            <Image
              src={page.logo.src}
              alt={page.logo.alt}
              title={page.logo.title}
              width={page.logo.width}
              height={page.logo.height}
              sizes="176px"
              className="h-9 w-auto max-w-44 object-contain"
            />
          </span>
        ) : (
          <span className="text-3xl font-bold text-white">{page.name}</span>
        )}
        {page.cashback && (
          <span className="shrink-0 rounded-xl border border-black/10 bg-white px-3 py-1.5 text-center leading-tight text-ink shadow-[0.2rem_0.2rem_0_var(--color-brand-yellow)]">
            <strong className="block">৳{page.cashback}</strong>
            <span className="text-xs">Cashback</span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pt-4 pb-6">
        <h2 className="text-2xl leading-tight font-semibold text-brand-orange">
          <Link
            href={page.href}
            className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-brand-orange focus-visible:after:ring-offset-2"
          >
            {page.name} Exam Registration
          </Link>
        </h2>
        {page.tagline && (
          <p className="mt-1 text-sm font-semibold text-ink/70">
            {page.tagline}
          </p>
        )}
        <p className="mt-3 text-[0.9375rem]">{page.text}</p>

        <ul className="mt-4 space-y-2.5">
          {page.cashback && (
            <li className={detail}>
              <GiftIcon className={detailIcon} strokeWidth={1.5} />৳
              {page.cashback} cashback, zero extra fees
            </li>
          )}
          {page.actualPrice && (
            <li className={detail}>
              <TicketIcon className={detailIcon} strokeWidth={1.5} />
              <span>
                {page.cashback ? (
                  <>
                    <s className="text-ink/60">৳{page.actualPrice}</s>{" "}
                    <strong>৳{page.effectivePrice}</strong> after cashback
                  </>
                ) : (
                  <strong>৳{page.actualPrice}</strong>
                )}
              </span>
            </li>
          )}
          {page.options.items.length > 0 && (
            <li className={detail}>
              <TicketIcon className={detailIcon} strokeWidth={1.5} />
              {page.options.items.length === 1
                ? "1 test option"
                : `${page.options.items.length} test options`}
            </li>
          )}
          {page.examDates.length > 0 && (
            <li className={detail}>
              <CalendarIcon className={detailIcon} strokeWidth={1.5} />
              Next exam: {formatDate(page.examDates[0])}
            </li>
          )}
        </ul>

        {/* mt-auto keeps the buttons on the bottom line of every card */}
        <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
          <Button href={`${page.href}#join`}>Register Now</Button>
          <Button href={page.href} variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </article>
  );
}
