import AwardCard from "@/components/AwardCard";
import MarqueeBand from "@/components/MarqueeBand";
import Slider from "@/components/Slider";
import { CalendarHeartIcon } from "@/components/icons";
import { awards } from "@/data/awards";

export default function Awards() {
  return (
    <MarqueeBand labelledBy="awards">
      <div className="site-container pt-10 text-center lg:pt-12">
        <CalendarHeartIcon className="mx-auto size-9" strokeWidth={1.5} />
        <h2
          id="awards"
          className="mt-2 text-3xl font-semibold sm:text-4xl lg:text-[2.5rem]"
        >
          <span className="font-coiny font-normal">Awards</span> &amp;
          Recognitions
        </h2>
        <p className="mt-2 text-sm sm:text-base">
          Specifically curated to help you improve your English skills and
          achieve your goals.
        </p>

        {/* One award at a time: slides on its own, by swipe, by mouse drag, or by the dots */}
        <div className="mx-auto mt-6 max-w-[49.5rem]">
          <Slider
            loop
            onDark
            className="sm:scroll-px-2 sm:px-2"
            slideClassName="w-full"
          >
            {awards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </Slider>
        </div>
      </div>
    </MarqueeBand>
  );
}
