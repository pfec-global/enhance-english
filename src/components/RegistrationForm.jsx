"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@/components/icons";

const field =
  "w-full rounded-lg border border-(--form-border) bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-ink/50 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20";

// The first `count` exam dates after today. `dates` are "2026-10-23", in order.
function upcomingExamDays(today, dates, count) {
  return dates
    .map((value) => {
      const [year, month, day] = value.split("-").map(Number);
      return new Date(year, month - 1, day);
    })
    .filter((day) => day > today)
    .slice(0, count);
}

const noSubscription = () => () => {};

// A select with the arrow drawn on top of it.
function Select({ label, children, ...props }) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        defaultValue=""
        required
        className={`${field} cursor-pointer appearance-none pr-10 invalid:text-ink/50`}
        {...props}
      >
        <option value="" disabled>
          {label}
        </option>
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand-orange" />
    </div>
  );
}

/*
  The one sign-up form of the site: on the exam registration, event and contact pages,
  in the "Book Free Demo Class" and "Make my Own Course" pop-ups and on their pages.
  `page` comes from data/examRegistration.js (or the admin); its colours tint the card
  (pink for IELTS, light blue for PTE) and it gives the test modes and dates.
  - `title` replaces the page's "Sign up for … Registration Assistance";
    `titleAs` is its heading level ("h1" on a page of its own), `titleId` its id.
  - `inDialog`: in a pop-up, so the title leaves room for the close button.
  - `successHref`: the page it leads to once sent, the thank-you page
    (app/thank-you/page.js); event pages add the event to it.
*/
export default function RegistrationForm({
  page,
  title = page.form.title,
  titleAs: Title = "h2",
  titleId,
  inDialog = false,
  successHref = "/thank-you",
}) {
  const router = useRouter();

  // Today's date, known in the browser only (null while the page is built), so
  // the test dates are always the next ones.
  const today = useSyncExternalStore(
    noSubscription,
    () => new Date().toDateString(),
    () => null,
  );
  const examDays = today
    ? upcomingExamDays(new Date(today), page.examDates, 8)
    : [];

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: send the details (new FormData(event.currentTarget)) to the real
    // registration API once there is one, and only move on once it has been saved.
    // A pop-up the form is in closes first, so it does not stay open over the thank-you page.
    event.currentTarget.closest("dialog")?.close();
    router.push(successHref);
  }

  return (
    <div
      className="border border-black/25 p-6 shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)] lg:p-7"
      style={{
        backgroundColor: page.colors.form,
        "--form-border": page.colors.formBorder,
      }}
    >
      <Title
        id={titleId}
        className={`text-center text-xl leading-snug font-bold lg:text-[1.375rem] ${inDialog ? "px-8" : ""}`}
      >
        {title}
      </Title>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        {/* Which form was sent: the title, e.g. "Book Your Free Demo Class" */}
        <input type="hidden" name="form" value={title} />
        <input
          name="name"
          placeholder="Full Name"
          aria-label="Full Name"
          autoComplete="name"
          required
          className={field}
        />
        <input
          name="email"
          type="email"
          placeholder="Email ID"
          aria-label="Email ID"
          autoComplete="email"
          required
          className={field}
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          aria-label="Phone Number"
          autoComplete="tel"
          required
          className={field}
        />
        {/* The choice and the test dates are left out when the page has none */}
        {page.form.modes.length > 0 && (
          <Select name="mode" label={page.form.modeLabel}>
            {page.form.modes.map((mode) => (
              <option key={mode}>{mode}</option>
            ))}
          </Select>
        )}
        {page.examDates.length > 0 && (
          <Select name="date" label="Test Date">
            {examDays.map((day) => {
              const label = day.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              return <option key={label}>{label}</option>;
            })}
          </Select>
        )}

        <label className="flex items-start gap-2.5 text-xs">
          {/* Orange-edged box with a white tick when checked */}
          <span className="relative mt-px grid size-4 shrink-0">
            <input
              type="checkbox"
              name="agree"
              required
              className="peer size-4 cursor-pointer appearance-none rounded-[2px] border-[1.5px] border-brand-orange bg-white outline-none checked:bg-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/30"
            />
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden size-4 text-white peer-checked:block"
            >
              <path
                d="m4 8.5 2.5 2.5L12 5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>
            I agree to{" "}
            <Link
              href="/privacy-policy"
              className="text-brand-orange underline"
            >
              privacy policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms-and-conditions"
              className="text-brand-orange underline"
            >
              Terms of Use
            </Link>
          </span>
        </label>

        <button
          type="submit"
          className="cursor-pointer rounded-lg border border-brand-orange bg-brand-orange py-2.5 font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
        >
          Request a Callback
        </button>
      </form>
    </div>
  );
}
