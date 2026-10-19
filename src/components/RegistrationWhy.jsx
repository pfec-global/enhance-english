import LazyExamCalendar from "@/components/LazyExamCalendar";
import RegistrationForm from "@/components/RegistrationForm";
import Reveal from "@/components/Reveal";
import {
  CertificateIcon,
  GiftIcon,
  HeartHandshakeIcon,
  InfoIcon,
} from "@/components/icons";

const icons = {
  cashback: GiftIcon,
  handshake: HeartHandshakeIcon,
  certificate: CertificateIcon,
};

const card =
  "border border-black/15 shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)]";

/*
  "Why Register through us?" on an exam registration page: reasons, notes and
  the exam calendar on the left, the sign-up form on the right.
  `page` is in the shape of data/examRegistration.js; empty lists and a page
  without exam days leave their part out. id="join" is where the "Join Now"
  and "Sign me Up!" buttons lead.
*/
export default function RegistrationWhy({ page }) {
  return (
    <section
      id="join"
      aria-labelledby="why-register"
      className="relative scroll-mt-24 bg-surface lg:scroll-mt-28"
    >
      {/* Doodle background, turned grey and faded (same as components/CourseCovered.jsx) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url(/image/ielts_bg.png)] bg-size-[max(100%,75rem)_auto] bg-top opacity-50 grayscale"
      />

      {/*
        phones, tablets: reasons and calendar, then the form below them
        desktop:         those on the left, the form on the right (it stays in view while scrolling)
      */}
      <div className="site-container relative grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 lg:py-16">
        <div>
          {page.reasons.length > 0 && (
            <>
              <h2
                id="why-register"
                className="mb-6 text-3xl font-bold lg:text-4xl"
              >
                Why Register through us?
              </h2>

              {/* The highlighted cards sit two per row from tablets up; the others take a full row */}
              <ul className="mb-4 grid max-w-2xl gap-4 sm:grid-cols-2">
                {page.reasons.map((reason, index) => {
                  const ReasonIcon = icons[reason.icon] ?? CertificateIcon;
                  return (
                    <li
                      key={reason.title}
                      className={reason.highlight ? "" : "sm:col-span-2"}
                    >
                      <Reveal delay={(index % 2) * 120} className="grid h-full">
                        <article
                          className={`${card} px-4 pt-3 pb-4 ${
                            reason.highlight ? "bg-[#fff6dc]" : "bg-white"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="leading-snug font-bold">
                              {reason.title}
                            </h3>
                            <ReasonIcon
                              className="size-5 shrink-0"
                              strokeWidth={1.5}
                            />
                          </div>
                          <p className="mt-1 text-sm">{reason.text}</p>
                        </article>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {page.notes.length > 0 && (
            <div className="flex max-w-md items-center gap-4 rounded-lg bg-[#5f5f5f] px-4 py-3 text-xs text-white/90">
              <InfoIcon className="size-8 shrink-0" strokeWidth={1.5} />
              <ul>
                {page.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {page.examDates.length > 0 && (
            <>
              <h2 className="mt-10 text-3xl font-bold first:mt-0 lg:text-4xl">
                Upcoming Exam Dates
              </h2>
              <Reveal className="mt-6 max-w-md">
                <div
                  className={`${card} bg-white p-6`}
                  style={{ "--accent": page.colors.main }}
                >
                  <LazyExamCalendar dates={page.examDates} />

                  {/* The prices, as on the exam card of the home page */}
                  {page.actualPrice && (
                    <div className="mt-4 border-t border-black/10 pt-4">
                      <p className="text-[0.8125rem] font-semibold">
                        Actual Price{" "}
                        <span className="text-lg font-bold">
                          ৳{page.actualPrice}
                        </span>
                      </p>
                      {page.cashback && (
                        <p className="mt-1">
                          Effective Price after Cashback{" "}
                          <strong className="text-2xl whitespace-nowrap">
                            ৳{page.effectivePrice}
                          </strong>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Reveal>
            </>
          )}
        </div>

        <div className="lg:sticky lg:top-28">
          <RegistrationForm page={page} />
        </div>
      </div>
    </section>
  );
}
