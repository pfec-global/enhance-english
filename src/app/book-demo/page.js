import RegistrationForm from "@/components/RegistrationForm";
import { getRegistrationPage } from "@/data/examRegistration";
import { getExamRegistration } from "@/lib/api";

export const metadata = {
  title: "Book a Free Demo Class | Enhance English",
  description:
    "Try a class with our expert trainers before you join. Leave your details and we'll call you to fix a time that suits you.",
};

// Normally the "Book Free Demo Class" buttons open the pop-up
// (components/DemoClassModal.jsx). This page has the same form, for a link
// opened in a new tab, shared, or clicked before the page has fully loaded.
export default async function BookDemoPage() {
  const page =
    (await getExamRegistration("ielts")) ?? getRegistrationPage("ielts");

  return (
    <section className="relative bg-surface">
      {/* Doodle background, turned grey and faded (same as components/CourseCovered.jsx) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url(/image/ielts_bg.png)] bg-size-[max(100%,75rem)_auto] bg-top opacity-50 grayscale"
      />
      <div className="site-container relative py-12 lg:py-16">
        <div className="mx-auto max-w-lg">
          <RegistrationForm
            page={page}
            title="Book Your Free Demo Class"
            titleAs="h1"
          />
        </div>
      </div>
    </section>
  );
}
