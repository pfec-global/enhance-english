import RegistrationForm from "@/components/RegistrationForm";
import { getRegistrationPage } from "@/data/examRegistration";
import { getExamRegistration } from "@/lib/api";

export const metadata = {
  title: "Make Your Own Course | Enhance English",
  description:
    "Tell us your goals and we'll call you with a course plan made for you.",
};

// Normally the "Make my Own Course" button opens the pop-up
// (components/CustomCourseModal.jsx). This page has the same form, for a link
// opened in a new tab, shared, or clicked before the page has fully loaded.
export default async function CustomCoursePage() {
  const page =
    (await getExamRegistration("ielts")) ?? getRegistrationPage("ielts");

  return (
    <section className="relative bg-surface">
      {/* Doodle background, turned grey and faded (same as app/book-demo/page.js) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url(/image/ielts_bg.png)] bg-size-[max(100%,75rem)_auto] bg-top opacity-50 grayscale"
      />
      <div className="site-container relative py-12 lg:py-16">
        <div className="mx-auto max-w-lg">
          <RegistrationForm
            page={page}
            title="Design Your Own Course"
            titleAs="h1"
          />
        </div>
      </div>
    </section>
  );
}
