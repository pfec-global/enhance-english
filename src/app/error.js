"use client";

import Link from "next/link";
import ErrorScreen, {
  errorButton,
  errorButtonOutline,
} from "@/components/ErrorScreen";
import { ReturnIcon } from "@/components/icons";

// Shown in place of a page that fails with an unexpected error, in the style of the 404 page
// but without its "404" illustration. "Try Again" renders the page once more.
export default function Error({ reset }) {
  return (
    <ErrorScreen
      title="Something Went Wrong"
      text="We couldn’t load this page just now. Please try again in a moment."
      illustration={false}
    >
      <button type="button" onClick={reset} className={errorButton}>
        Try Again
      </button>
      <Link
        href="/"
        className={errorButtonOutline}
      >
        Back to Homepage
        <ReturnIcon className="size-4" />
      </Link>
    </ErrorScreen>
  );
}
