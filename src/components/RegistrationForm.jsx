"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
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
  "Sign up for … Registration Assistance" card on an exam registration page.
  `page` comes from data/examRegistration.js; its colours tint the card
  (pink for IELTS, light blue for PTE).
*/
export default function RegistrationForm({ page }) {
  const [sent, setSent] = useState(false);

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
    // registration API once there is one.
    setSent(true);
  }

  return (
    <div
      className="border border-black/25 p-6 shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)] lg:p-7"
      style={{
        backgroundColor: page.colors.form,
        "--form-border": page.colors.formBorder,
      }}
    >
      <h2 className="text-center text-xl leading-snug font-bold lg:text-[1.375rem]">
        {page.form.title}
      </h2>

      {sent ? (
        <p role="status" className="mt-6 rounded-lg bg-white p-5 text-center">
          <strong className="block text-lg">Thank you!</strong>
          Our team will call you soon to help with your {page.name}{" "}
          registration.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
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

          <label className="flex items-start gap-2 text-xs">
            <input
              type="checkbox"
              name="agree"
              required
              className="mt-0.5 size-4 shrink-0 accent-brand-orange"
            />
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
            className="cursor-pointer rounded-md border border-brand-orange bg-brand-orange py-2.5 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
          >
            Request a Callback
          </button>
        </form>
      )}
    </div>
  );
}
