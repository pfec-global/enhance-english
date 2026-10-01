import FeatureCard from "@/components/FeatureCard";
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

        {/* 1 card per row on phones, 2 on tablets, 3 on desktop (last row centred) */}
        <ul className="mt-8 flex flex-wrap justify-center gap-6 lg:mt-12">
          {reasons.map((reason) => (
            <li
              key={reason.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc((100%-3rem)/3)]"
            >
              <FeatureCard feature={reason} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
