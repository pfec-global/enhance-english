import Image from "next/image";
import Reveal from "@/components/Reveal";
import { eventAudience } from "@/data/eventAudience";

// "Who Should Attend?" on an event details page: the kinds of students the event is for, each a
// picture in a circle with a caption (1 per row on phones, 3 from tablets up), with a
// call to action underneath (`children`).
export default function EventAudience({ audience = eventAudience, children }) {
  return (
    <section aria-labelledby="who-should-attend" className="bg-cream">
      <div className="site-container py-12 lg:py-16">
        <h2
          id="who-should-attend"
          className="text-center text-2xl font-bold sm:text-3xl"
        >
          <span className="font-coiny font-normal text-brand-orange">Who</span>{" "}
          Should Attend?
        </h2>

        <ul className="mx-auto mt-8 grid max-w-4xl gap-8 sm:grid-cols-3 sm:gap-6">
          {audience.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={index * 120} className="text-center">
                <div className="relative mx-auto size-32 overflow-hidden rounded-full bg-white shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)] lg:size-36">
                  {/* The photos have a cream margin around their circle: zoom past it */}
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="160px"
                    className="scale-[1.15] object-cover"
                  />
                </div>
                <p className="mx-auto mt-4 max-w-56 text-sm sm:text-base">
                  {item.label}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        {children}
      </div>
    </section>
  );
}
