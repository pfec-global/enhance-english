import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

// Each statue sits in a box that hides its bottom part, so it looks like it
// rises from the yellow line at the bottom of the section (on phones and tablets
// the first one rises from the top edge of the card instead).
const statue =
  "relative w-full justify-self-center self-end overflow-hidden lg:row-start-1";

export default function CustomCourse() {
  return (
    <section
      aria-labelledby="custom-course"
      className="overflow-hidden border-b-[0.3125rem] border-brand-yellow bg-linear-to-b from-surface to-[#fff1e0]"
    >
      {/*
        phones, tablets: one statue above the card, the other below it, both centred
        desktop:         statue · card · statue in one row
                         (on small laptops the card narrows so the statues keep some size)
      */}
      <div className="site-container grid pt-10 lg:grid-cols-[minmax(12.5rem,1fr)_minmax(0,46.7rem)_minmax(12.5rem,1fr)] lg:gap-x-7 lg:pt-9">
        <div
          className={`${statue} row-start-1 aspect-[355/298] max-w-56 sm:max-w-64 lg:col-start-1 lg:max-w-[22.2rem] lg:justify-self-end`}
        >
          <Image
            src="/image/avater_image_3.png"
            alt=""
            width={4000}
            height={3690}
            sizes="(min-width: 1024px) 360px, 45vw"
            className="h-auto w-full"
          />
        </div>

        <div className="row-start-2 mx-auto mb-8 w-full max-w-[46.7rem] border border-black/25 bg-[#fdecea] px-6 pt-10 pb-9 text-center shadow-[0.375rem_0.375rem_0_#f8a206] lg:col-start-2 lg:row-start-1 lg:mb-0 lg:border-b-0 lg:pt-12 lg:shadow-[0.375rem_0_0_#f8a206]">
          <p className="text-sm tracking-[0.2em] uppercase">
            Design your own course
          </p>
          <h2
            id="custom-course"
            className="mt-3 text-3xl leading-tight font-semibold text-brand-orange lg:text-[2.125rem] xl:text-[2.5rem]"
          >
            Want Something{" "}
            <span className="font-coiny font-normal text-ink">
              Personalized?
            </span>
          </h2>
          <p className="mt-3 text-[0.9375rem]">
            You can pick the modules, learning hours, mode of learning
            <br className="hidden sm:block" /> based on your learning goals.
          </p>
          <Link
            href="/custom-course"
            className="mt-5 inline-flex items-center gap-3 border border-brand-orange bg-brand-orange px-5 py-3 font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
          >
            Make my Own Course
            <ArrowRightIcon className="size-5" />
          </Link>
        </div>

        {/* This picture has empty space around the statue, so it is enlarged and shifted */}
        <div
          className={`${statue} row-start-3 aspect-[343/290] max-w-56 sm:max-w-64 lg:col-start-3 lg:max-w-[21.4rem] lg:justify-self-start`}
        >
          <Image
            src="/image/avater_image_4.png"
            alt=""
            width={4096}
            height={4096}
            sizes="(min-width: 1024px) 520px, 70vw"
            className="absolute -top-[21.2%] -left-[21%] h-auto w-[150.8%] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
