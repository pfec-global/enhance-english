import Link from "next/link";
import MarqueeBand from "@/components/MarqueeBand";
import Slider from "@/components/Slider";
import { CalendarIcon } from "@/components/icons";
import { reviews } from "@/data/reviews";

// The word "Google" in its own colours, one letter at a time.
const googleLetters = [
  ["G", "#4285f4"],
  ["o", "#ea4335"],
  ["o", "#fbbc05"],
  ["g", "#4285f4"],
  ["l", "#34a853"],
  ["e", "#ea4335"],
];

// TODO: this badge is drawn with text — swap it for the official "Google Reviews" image when there is one.
function GoogleReviewsBadge() {
  return (
    <p
      aria-label="Google Reviews, 5 stars"
      className="shrink-0 rounded-sm bg-white px-3 py-1.5 text-center leading-none shadow-md"
    >
      <span
        aria-hidden="true"
        className="block text-2xl font-semibold sm:text-3xl"
      >
        {googleLetters.map(([letter, color], index) => (
          <span key={index} style={{ color }}>
            {letter}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="mt-1 block text-xs font-semibold text-ink/70"
      >
        Reviews <span className="text-[#fbbc05]">★★★★★</span>
      </span>
    </p>
  );
}

// Blue band with student reviews that slide past on their own.
export default function StudentReviews() {
  return (
    <MarqueeBand labelledBy="reviews" className="pb-[calc(1.75vw+5.5rem)]">
      {/* @container: the review cards below size themselves from this box's width */}
      <div className="site-container pt-10 lg:pt-12">
        <div className="@container">
          <div className="flex items-center justify-between gap-6">
            <h2
              id="reviews"
              className="text-2xl font-semibold sm:text-3xl lg:text-4xl"
            >
              Here’s What Our{" "}
              <span className="font-coiny font-normal">Students Say</span>
            </h2>
            <GoogleReviewsBadge />
          </div>

          {/*
            Always sliding. 1 card per view on phones, 2 on tablets, 3 on desktop.
            From tablets up the row runs on to the right edge of the screen, so the
            next card peeks in (the negative margin is the space beside the page).
          */}
          <div className="mt-5 text-ink sm:mt-7 sm:mr-[calc((100%-100vw)/2)]">
            <Slider
              loop
              showDots={false}
              className="sm:gap-6"
              slideClassName="w-[85%] sm:w-[calc((100cqw-1.5rem)/2)] lg:w-[calc((100cqw-3rem)/3)]"
            >
              {reviews.map((review) => (
                <figure
                  key={review.id}
                  className="h-full border border-black/15 bg-white px-6 pt-5 pb-6 shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)]"
                >
                  <figcaption className="font-coiny text-xl text-brand-orange lg:text-[1.375rem]">
                    {review.name}
                  </figcaption>
                  <blockquote className="mt-2 text-[0.9375rem] leading-snug whitespace-pre-line">
                    {review.text}
                  </blockquote>
                </figure>
              ))}
            </Slider>
          </div>

          <p className="mt-4 text-center text-sm">
            <strong>Long Story short:</strong> They love everything about us.
            Can’t believe them? You too could try and see!
          </p>
          <Link
            href="/book-demo"
            className="mx-auto mt-5 flex w-fit items-center gap-3 rounded-sm border border-brand-orange bg-brand-orange px-4 py-2.5 text-sm font-semibold transition-colors hover:border-white hover:bg-white hover:text-brand-orange"
          >
            Book Free Demo Class
            <CalendarIcon className="size-5" />
          </Link>
        </div>
      </div>
    </MarqueeBand>
  );
}
