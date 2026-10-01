import AwardCard from "@/components/AwardCard";
import Marquee from "@/components/Marquee";
import Slider from "@/components/Slider";
import { CalendarHeartIcon } from "@/components/icons";
import { awards, highlights } from "@/data/awards";

export default function Awards() {
  return (
    // The section's own background shows as the light strip under the tilted band.
    <section aria-labelledby="awards" className="overflow-hidden bg-surface pb-12">
      <div className="relative">
        {/* Blue area. Its bottom edge is cut at an angle (3.5vw of drop = 2 degrees). */}
        <div className="bg-brand-royal pb-[calc(1.75vw+7rem)] text-white [clip-path:polygon(0_0,100%_0,100%_calc(100%-3.5vw),0_100%)]">
          <Marquee items={highlights} />

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
        </div>

        {/* Tilted band, centred on the angled edge of the blue area */}
        <Marquee
          items={highlights}
          reverse
          className="absolute -inset-x-[3%] bottom-[1.75vw] translate-y-1/2 -rotate-2"
        />
      </div>
    </section>
  );
}
