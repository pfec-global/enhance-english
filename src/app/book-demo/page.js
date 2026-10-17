import DemoClassForm from "@/components/DemoClassForm";

export const metadata = {
  title: "Book a Free Demo Class | Enhance English",
  description:
    "Try a class with our expert trainers before you join. Leave your details and we'll call you to fix a time that suits you.",
};

// Normally the "Book Free Demo Class" buttons open the pop-up
// (components/DemoClassModal.jsx). This page has the same form, for a link
// opened in a new tab, shared, or clicked before the page has fully loaded.
export default function BookDemoPage() {
  return (
    <section className="relative bg-surface">
      {/* Doodle background, turned grey and faded (same as components/CourseCovered.jsx) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url(/image/ielts_bg.png)] bg-size-[max(100%,75rem)_auto] bg-top opacity-50 grayscale"
      />
      <div className="site-container relative py-12 lg:py-16">
        <div className="mx-auto max-w-xl border border-black/25 bg-white p-6 shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)] sm:p-8">
          <p className="w-fit bg-brand-orange px-2 py-1 text-sm font-bold text-white">
            100% Free
          </p>
          <h1 className="mt-3 text-2xl leading-tight font-bold sm:text-3xl">
            Book Your Free{" "}
            <span className="font-coiny font-normal text-brand-orange">
              Demo Class
            </span>
          </h1>
          <p className="mt-2 text-sm text-ink/75">
            Try a class with our expert trainers before you join. Leave your
            details and we’ll call you to fix a time that suits you.
          </p>
          <DemoClassForm />
        </div>
      </div>
    </section>
  );
}
