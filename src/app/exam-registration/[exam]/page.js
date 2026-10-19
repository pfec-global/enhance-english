import { notFound } from "next/navigation";
import BlogDetailBody from "@/components/BlogDetailBody";
import RegistrationHero from "@/components/RegistrationHero";
import RegistrationOptions from "@/components/RegistrationOptions";
import RegistrationSteps from "@/components/RegistrationSteps";
import RegistrationWhy from "@/components/RegistrationWhy";
import Reveal from "@/components/Reveal";
import StudentReviews from "@/components/StudentReviews";
import Testimonials from "@/components/Testimonials";
import VenueSection from "@/components/VenueSection";
import { getRegistrationPage } from "@/data/examRegistration";
import { prepareBlogMarkdown } from "@/lib/blogMarkdown";
import {
  getExamRegistration,
  getStudentReviews,
  getTestimonials,
} from "@/lib/api";

// Exam registration page, e.g. /exam-registration/ielts, for every published
// page in the admin. When the admin cannot be reached, the built-in IELTS and
// PTE pages are shown instead (data/examRegistration.js).
// The student results and reviews also come from the admin.
// Any other address shows "page not found".

// The page with this slug, or null if there is none
async function findPage(exam) {
  const page = await getExamRegistration(exam);
  if (page === undefined) return getRegistrationPage(exam) ?? null;
  return page;
}

export async function generateMetadata({ params }) {
  const { exam } = await params;
  const page = await findPage(exam);
  if (!page) return {};

  return {
    title:
      page.seo?.title ?? `${page.name} Exam Registration | Enhance English`,
    description: page.seo?.description ?? page.text,
    keywords: page.seo?.keywords?.length ? page.seo.keywords : undefined,
  };
}

export default async function RegistrationPage({ params }) {
  const { exam } = await params;
  const page = await findPage(exam);
  if (!page) notFound();

  const [results, reviews] = await Promise.all([
    getTestimonials(),
    getStudentReviews(),
  ]);
  const description = prepareBlogMarkdown(page.description);

  return (
    <>
      <RegistrationHero page={page} />
      <RegistrationWhy page={page} />
      <Reveal>
        <RegistrationSteps page={page} />
      </Reveal>
      <Reveal>
        <RegistrationOptions page={page} />
      </Reveal>
      <Reveal>
        <VenueSection page={page} />
      </Reveal>
      {/* The admin's description (markdown), drawn like a blog post: "Jump to Topic" box, the text,
          and a card beside it that leads back to the sign-up form */}
      {description && (
        <BlogDetailBody
          content={description}
          showCta
          cta={{
            title: `Register for ${page.name} with Expert Assistance`,
            text: page.cashback
              ? `No extra charges, and ৳${page.cashback} cashback after your exam.`
              : "No extra charges. We help you choose the right test and date.",
            buttonLabel: "Request a Callback",
            href: "#join",
          }}
        />
      )}
      {/* Same sections as on the home page; the results are limited to this exam */}
      <Reveal>
        <Testimonials exam={page.exam} {...results} />
      </Reveal>
      <Reveal>
        <StudentReviews reviews={reviews} />
      </Reveal>
    </>
  );
}
