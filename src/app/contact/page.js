import Image from "next/image";
import CoachingCenters from "@/components/CoachingCenters";
import { MailIcon, PhoneIcon } from "@/components/icons";
import RegistrationForm from "@/components/RegistrationForm";
import { contactDetails, telLink } from "@/data/contact";
import { getRegistrationPage } from "@/data/examRegistration";
import { getExamRegistration } from "@/lib/api";

export const metadata = {
  title: "Contact Us | Enhance English",
  description:
    "Got some queries? Fill in the form or reach out to Enhance English by email or phone, or visit one of our coaching centres in Dhaka and Chattogram.",
};

const contactLine = "flex items-center gap-3 hover:text-brand-orange";

const contactIcon = "size-5 shrink-0 text-brand-orange";

// Contact Us: "Got some Queries?" with the email and phone on a cream half, the IELTS
// registration form (from the admin, or data/examRegistration.js) on an orange half; below,
// the coaching centres (components/CoachingCenters.jsx). On phones and tablets everything stacks.
export default async function ContactPage() {
  const registration =
    (await getExamRegistration("ielts")) ?? getRegistrationPage("ielts");

  return (
    <>
      <section className="relative overflow-hidden bg-cream lg:bg-[linear-gradient(90deg,var(--color-cream)_50%,var(--color-brand-orange)_50%)]">
        {/* The wave across the cream half */}
        <Image
          src="/image/404/vector-1.png"
          alt=""
          width={2880}
          height={914}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-60 select-none lg:w-1/2"
        />

        <div className="site-container relative grid lg:grid-cols-2">
          <div className="py-12 lg:self-center lg:py-16 lg:pr-12">
            <p className="inline-block animate-fade-up bg-brand-orange px-2 py-1 text-xs font-semibold text-white motion-reduce:animate-none">
              Contact Us
            </p>
            <h1 className="mt-3 animate-fade-up text-3xl font-bold text-brand-orange [animation-delay:100ms] motion-reduce:animate-none sm:text-4xl">
              Got some Queries?
            </h1>
            <p className="mt-4 max-w-sm animate-fade-up [animation-delay:200ms] motion-reduce:animate-none">
              We are here to answer all your questions. Please feel free to fill
              the form or reach out to us using the below mentioned modes
            </p>
            <ul className="mt-6 animate-fade-up space-y-3 [animation-delay:300ms] motion-reduce:animate-none">
              <li>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className={contactLine}
                >
                  <MailIcon className={contactIcon} strokeWidth={1.5} />
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <a href={telLink(contactDetails.phone)} className={contactLine}>
                  <PhoneIcon className={contactIcon} strokeWidth={1.5} />
                  {contactDetails.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Orange half: full width on phones and tablets (it reaches past the page side space) */}
          <div className="-mx-6 bg-brand-orange px-6 py-10 lg:mx-0 lg:bg-transparent lg:py-14 lg:pr-0 lg:pl-12">
            <div className="mx-auto max-w-md animate-pop-in [animation-delay:200ms] motion-reduce:animate-none">
              <RegistrationForm page={registration} />
            </div>
          </div>
        </div>
      </section>

      <CoachingCenters />
    </>
  );
}
