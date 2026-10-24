import Link from "next/link";
import ErrorScreen, { errorButton } from "@/components/ErrorScreen";
import { ReturnIcon } from "@/components/icons";

export const metadata = {
  title: "Page Not Found | Enhance English",
};

// Shown for every address the site does not have (e.g. /ielts/no-such-course), and wherever
// a page calls notFound() because the admin has no such blog, event, course or exam page.
export default function NotFound() {
  return (
    <ErrorScreen
      title="The Page Doesn’t Exist"
      text="But don’t worry, we can get you back on track."
    >
      <Link href="/" className={errorButton}>
        Back to Homepage
        <ReturnIcon className="size-4" />
      </Link>
    </ErrorScreen>
  );
}
