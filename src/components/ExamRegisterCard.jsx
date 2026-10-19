import Image from "next/image";
import Button from "@/components/Button";
import LazyExamCalendar from "@/components/LazyExamCalendar";
import { GiftIcon } from "@/components/icons";

// "Register for … Exam" next to the mock test card (home page, course pages).
// `exam` is in the shape of `exam` in data/programs.js; the admin's prices and dates are
// set on the program's courses page (see withProgramExam there). Without a cashback or prices those lines
// are left out, and without exam dates the calendar.
export default function ExamRegisterCard({ exam }) {
  return (
    <article className="grid border border-black/15 bg-card shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)] md:grid-cols-2">
      {/* Left: what you get */}
      <div className="flex flex-col px-6 pt-6">
        <h3 className="font-coiny text-[1.625rem] leading-tight">
          {exam.title}
        </h3>
        {exam.cashback && (
          <p className="mt-2 flex w-fit items-center gap-2 bg-brand-yellow px-2 py-1.5 text-[1.0625rem] font-bold">
            <GiftIcon className="size-5 shrink-0 text-brand-orange" />
            Get flat ৳{exam.cashback} Cashback!
          </p>
        )}
        <p className="mt-4 text-sm">{exam.description}</p>
        <p className="mt-3 text-sm font-bold">
          Zero Extra Fees. 100% Reliable Guidance
        </p>
        <Image
          src={exam.image}
          alt=""
          width={800}
          height={604}
          sizes="(min-width: 768px) 400px, 90vw"
          className="mx-auto mt-auto h-auto w-full max-w-[25rem] pt-5 md:mx-0"
        />
      </div>

      {/* Right: exam dates and price */}
      <div className="border-t border-black/25 p-6 md:my-4 md:border-t-0 md:border-l md:py-2">
        {exam.examDates.length > 0 && (
          <LazyExamCalendar dates={exam.examDates} />
        )}

        {exam.actualPrice && (
          <>
            <p className="mt-4 text-[0.8125rem] font-semibold">
              Actual Price{" "}
              <span className="text-lg font-bold">৳{exam.actualPrice}</span>
            </p>
            {exam.cashback && (
              <p className="mt-1">
                Effective Price after Cashback{" "}
                <strong className="text-2xl whitespace-nowrap">
                  ৳{exam.effectivePrice}
                </strong>
              </p>
            )}
          </>
        )}
        <div className="mt-3 flex flex-wrap gap-2.5">
          <Button href={`${exam.href}#join`}>Join Now</Button>
          <Button href={exam.href} variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </article>
  );
}
