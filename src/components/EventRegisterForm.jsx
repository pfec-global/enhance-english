"use client";

import { useState } from "react";
import Link from "next/link";

const field =
  "w-full rounded-lg border border-brand-blue/40 bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-ink/50 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20";

// "Register for Free" card on an event details page. `event` comes from data/events.js.
export default function EventRegisterForm({ event }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(submitEvent) {
    submitEvent.preventDefault();
    // TODO: send the details (new FormData(submitEvent.currentTarget)) to the
    // real event registration API once there is one.
    setSent(true);
  }

  return (
    <div className="border border-black/25 bg-[#e4f6fa] p-6 shadow-[0.375rem_0.375rem_0_var(--color-brand-blue)] lg:p-7">
      <h2 className="text-center text-xl leading-snug font-bold lg:text-[1.375rem]">
        Register for Free
      </h2>
      <p className="mt-1 text-center text-sm text-ink/70">
        {event.date} | {event.time}
      </p>

      {sent ? (
        <p role="status" className="mt-6 rounded-lg bg-white p-5 text-center">
          <strong className="block text-lg">You’re registered!</strong>
          We’ll call you to confirm your seat for {event.title}.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input type="hidden" name="event" value={event.slug} />
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
            Reserve My Seat
          </button>
        </form>
      )}
    </div>
  );
}
