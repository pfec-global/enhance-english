import Link from "next/link";
import { ChevronDownIcon } from "@/components/icons";

// The pieces shared by the pop-up forms ("Book Your Free Demo Class",
// "Design Your Own Course") and their pages.

export const field =
  "w-full rounded-lg border border-black/20 bg-white px-3.5 py-2.5 text-sm outline-none placeholder:text-ink/50 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20";

export const submitButton =
  "cursor-pointer rounded-md border border-brand-orange bg-brand-orange py-3 font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange";

export const courses = [
  "IELTS",
  "PTE",
  "Spoken and Presentation Coaching",
  "Writing and Grammar Coaching",
  "Not sure yet",
];

// The course chosen at first: the one of the page the visitor is on, if any
export function courseOfPage(pathname) {
  if (pathname.startsWith("/ielts") || pathname.endsWith("/ielts"))
    return "IELTS";
  if (pathname.startsWith("/pte") || pathname.endsWith("/pte")) return "PTE";
  if (pathname.startsWith("/learn-english/writing"))
    return "Writing and Grammar Coaching";
  if (pathname.startsWith("/learn-english"))
    return "Spoken and Presentation Coaching";
  return "";
}

// A required select with the arrow drawn on top of it. `label` is also its empty first choice.
export function Select({ label, children, ...props }) {
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

export function PrivacyAgreement() {
  return (
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
  );
}

// Shown in place of a form once it is sent. In a pop-up (`inDialog`) it has a "Close" button.
export function SentMessage({ children, inDialog }) {
  return (
    <div role="status" className="mt-6 rounded-lg bg-[#fdecea] p-6 text-center">
      <strong className="block text-xl">Thank you!</strong>
      <p className="mt-1">{children}</p>
      {inDialog && (
        // method="dialog": the button closes the pop-up it is in
        <form method="dialog">
          <button className="mt-4 cursor-pointer rounded-md border border-brand-orange px-5 py-2 text-sm font-semibold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white">
            Close
          </button>
        </form>
      )}
    </div>
  );
}
