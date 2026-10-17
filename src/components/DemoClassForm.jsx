"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@/components/icons";

const field =
  "w-full rounded-lg border border-black/20 bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-ink/50 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20";

const courses = [
  "IELTS",
  "PTE",
  "Spoken and Presentation Coaching",
  "Writing and Grammar Coaching",
  "Not sure yet",
];

// The course chosen at first: the one of the page the visitor is on, if any
function courseOfPage(pathname) {
  if (pathname.startsWith("/ielts") || pathname.endsWith("/ielts")) return "IELTS";
  if (pathname.startsWith("/pte") || pathname.endsWith("/pte")) return "PTE";
  if (pathname.startsWith("/learn-english/writing")) return "Writing and Grammar Coaching";
  if (pathname.startsWith("/learn-english")) return "Spoken and Presentation Coaching";
  return "";
}

// A select with the arrow drawn on top of it.
function Select({ label, children, ...props }) {
  return (
    <div className="relative">
      <select
        aria-label={label}
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
  "Book Your Free Demo Class" form: in the pop-up (components/DemoClassModal.jsx)
  and on the /book-demo page. Once sent it shows a thank-you message instead.
  `onDone` (optional) adds a "Close" button to that message.
*/
export default function DemoClassForm({ onDone }) {
  const pathname = usePathname();
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: send the details (new FormData(event.currentTarget)) to the real
    // demo class booking API once there is one.
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="mt-6 rounded-lg bg-[#fdecea] p-6 text-center">
        <strong className="block text-xl">Thank you!</strong>
        <p className="mt-1">
          Our team will call you soon to book your free demo class.
        </p>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="mt-4 cursor-pointer rounded-md border border-brand-orange px-5 py-2 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
          >
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <input
        name="name"
        placeholder="Full Name"
        aria-label="Full Name"
        autoComplete="name"
        required
        className={field}
      />
      {/* Email and phone side by side from tablets up */}
      <div className="grid gap-4 sm:grid-cols-2">
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
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          name="course"
          label="Course"
          defaultValue={courseOfPage(pathname)}
        >
          {courses.map((course) => (
            <option key={course}>{course}</option>
          ))}
        </Select>
        <Select name="mode" label="Class Mode" defaultValue="">
          <option>Offline (at our office)</option>
          <option>Online</option>
        </Select>
      </div>

      <label className="flex items-start gap-2 text-xs">
        <input
          type="checkbox"
          name="agree"
          required
          className="mt-0.5 size-4 shrink-0 accent-brand-orange"
        />
        <span>
          I agree to{" "}
          <Link href="/privacy-policy" className="text-brand-orange underline">
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
        className="cursor-pointer rounded-md border border-brand-orange bg-brand-orange py-3 font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
      >
        Book My Free Class
      </button>
    </form>
  );
}
