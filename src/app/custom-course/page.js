import CustomCourseForm from "@/components/CustomCourseForm";

export const metadata = {
  title: "Make Your Own Course | Enhance English",
  description:
    "Pick the modules, learning hours and mode of learning that fit your goals, and we'll call you with a course plan made for you.",
};

// Normally the "Make my Own Course" button opens the pop-up
// (components/CustomCourseModal.jsx). This page has the same form, for a link
// opened in a new tab, shared, or clicked before the page has fully loaded.
export default function CustomCoursePage() {
  return (
    <section className="relative bg-surface">
      {/* Doodle background, turned grey and faded (same as app/book-demo/page.js) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url(/image/ielts_bg.png)] bg-size-[max(100%,75rem)_auto] bg-top opacity-50 grayscale"
      />
      <div className="site-container relative py-12 lg:py-16">
        <div className="mx-auto max-w-xl border border-black/25 bg-white p-6 shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)] sm:p-8">
          <p className="w-fit bg-brand-orange px-2 py-1 text-sm font-bold text-white">
            Design your own course
          </p>
          <h1 className="mt-3 text-2xl leading-tight font-bold sm:text-3xl">
            Make Your{" "}
            <span className="font-coiny font-normal text-brand-orange">
              Own Course
            </span>
          </h1>
          <p className="mt-2 text-sm text-ink/75">
            Pick the modules, learning hours and mode of learning that fit your
            goals. We’ll call you with a course plan made for you.
          </p>
          <CustomCourseForm />
        </div>
      </div>
    </section>
  );
}
