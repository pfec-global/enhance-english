import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

// A line of text and an orange button, centred under a section on an event details page.
// The button goes to the registration form (#register) unless another `href` is given.
export default function SignUpCta({
  text,
  href = "#register",
  label = "Sign up for Free",
  className = "",
}) {
  return (
    <div className={`text-center ${className}`}>
      {text && <p className="text-sm">{text}</p>}
      <Link
        href={href}
        className="mt-3 inline-flex items-center gap-2 rounded-md border border-brand-orange bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
      >
        {label}
        <ArrowRightIcon className="size-4" />
      </Link>
    </div>
  );
}
