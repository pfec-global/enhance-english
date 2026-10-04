import FeatureCard from "@/components/FeatureCard";
import Reveal from "@/components/Reveal";
import Slider from "@/components/Slider";
import { reasons } from "@/data/whyChooseUs";

export default function WhyChooseUs() {
  return (
    <section aria-labelledby="why-choose-us" className="bg-surface">
      <div className="site-container py-14 lg:py-16">
        <h2
          id="why-choose-us"
          className="text-center text-2xl font-bold sm:text-3xl lg:text-4xl"
        >
          <span className="text-brand-blue">Why Choose</span> Enhance English?
        </h2>

        {/* Auto-playing slider on phones, 2 cards per row on tablets, 3 on desktop (last row centred) */}
        <div className="mt-8 lg:mt-12">
          <Slider
            className="sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:py-0"
            slideClassName="w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-3rem)/3)]"
          >
            {/* Each card appears as it comes into view, one after another along the row */}
            {reasons.map((reason, index) => (
              <Reveal
                key={reason.id}
                delay={(index % 3) * 120}
                className="grid h-full"
              >
                <FeatureCard feature={reason} />
              </Reveal>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
