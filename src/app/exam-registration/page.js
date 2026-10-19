import CustomCourse from "@/components/CustomCourse";
import { TicketIcon } from "@/components/icons";
import RegistrationCard from "@/components/RegistrationCard";
import Reveal from "@/components/Reveal";
import StudentReviews from "@/components/StudentReviews";
import { registrationPages } from "@/data/examRegistration";
import { getExamRegistrations, getStudentReviews } from "@/lib/api";

export const metadata = {
  title: "Exam Registration | Enhance English",
  description:
    "Register for IELTS, PTE and other English tests with expert assistance: no extra charges, cashback and help choosing the right test and date.",
};

// "Exam Registration" in the main navigation: every exam that has a registration page,
// in the admin's order (data/examRegistration.js when the admin cannot be reached).
export default async function ExamRegistrationPage() {
  const [cmsPages, reviews] = await Promise.all([
    getExamRegistrations(),
    getStudentReviews(),
  ]);
  const pages = cmsPages ?? registrationPages;

  return (
    <>
      <section className="bg-[#e4f6fa]">
        <div className="site-container py-10 text-center lg:py-14">
          <TicketIcon
            className="mx-auto size-10 animate-fade-up text-brand-orange motion-reduce:animate-none"
            strokeWidth={1.5}
          />
          <h1 className="mt-3 animate-fade-up text-3xl font-semibold [animation-delay:100ms] motion-reduce:animate-none sm:text-4xl lg:text-5xl">
            Exam{" "}
            <span className="font-coiny font-normal text-brand-orange">
              Registration
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl animate-fade-up [animation-delay:200ms] motion-reduce:animate-none sm:text-lg">
            Register for your English test with expert assistance. We help you
            choose the right test, check seat availability and complete your
            registration, with no extra charges.
          </p>
        </div>
      </section>

      <section aria-label="Exams" className="bg-surface">
        {pages.length > 0 ? (
          // 1 card per row on phones, 2 on tablets, 3 on desktop
          <ul className="site-container grid gap-6 py-12 sm:grid-cols-2 lg:py-16 xl:grid-cols-3">
            {pages.map((page, index) => (
              <li key={page.exam}>
                {/* Each card appears as it comes into view, one after another along the row */}
                <Reveal delay={(index % 3) * 120} className="grid h-full">
                  <RegistrationCard page={page} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <div className="site-container py-12 lg:py-16">
            <p className="mx-auto max-w-xl border border-black/15 bg-card px-6 py-12 text-center shadow-[0.25rem_0.25rem_0_var(--color-brand-blue)] sm:text-lg">
              <strong className="block text-xl text-brand-orange">
                Registration opens soon
              </strong>
              Please check back shortly, or book a free demo class and our team
              will help you with your exam.
            </p>
          </div>
        )}
      </section>

      {/* "Here's What Our Students Say" — left out when the admin has no published reviews */}
      <Reveal>
        <StudentReviews reviews={reviews} />
      </Reveal>
      <Reveal>
        <CustomCourse />
      </Reveal>
    </>
  );
}
