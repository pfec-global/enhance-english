import Image from "next/image";
import { MapPinIcon, PhoneIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { mapLink, offices, telLink } from "@/data/contact";

// "3 Coaching Centers Across Bangladesh": the map with the centres pinned on it, beside a card
// per centre with its address, a Google Maps link and its phone number. On the Contact Us and
// About Us pages. Phones: the map on top, the cards below (2 per row from tablets up).
export default function CoachingCenters() {
  return (
    <section aria-labelledby="coaching-centers" className="bg-surface">
      <div className="site-container grid items-center gap-10 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16 lg:py-16">
        <Reveal className="mx-auto w-full max-w-72 md:max-w-sm">
          <Image
            src="/image/bangladesh_map.png"
            alt="Map of Bangladesh showing Enhance English centres in Banani, Dhanmondi and Chattogram"
            width={808}
            height={1110}
            sizes="(min-width: 768px) 384px, 288px"
            className="h-auto w-full"
          />
        </Reveal>

        <div>
          <h2
            id="coaching-centers"
            className="text-2xl leading-tight font-bold sm:text-3xl"
          >
            <span className="block font-coiny font-normal text-brand-orange">
              {offices.length} Coaching Centers
            </span>
            Across Bangladesh
          </h2>
          <p className="mt-3 max-w-xl text-sm">
            Our state-of-the-art classrooms are equipped with the required
            technology for an optimized learning experience. We offer expert-led
            courses with tailored study material, flexible schedules, and
            premium IELTS &amp; PTE mock tests.
          </p>

          {/* 1 card per row on phones, 2 from tablets up */}
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {offices.map((office, index) => (
              <li key={office.id}>
                <Reveal delay={(index % 2) * 120} className="grid h-full">
                  <article className="h-full border border-black/15 bg-card p-4 shadow-[0.3rem_0.3rem_0_var(--color-brand-yellow)]">
                    <h3 className="font-semibold text-brand-orange sm:text-lg">
                      {office.name}
                    </h3>
                    <p className="mt-2 flex items-start gap-2 text-sm">
                      <MapPinIcon
                        className="mt-0.5 size-4.5 shrink-0 text-brand-orange"
                        strokeWidth={1.5}
                      />
                      <span>
                        {office.address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                        <a
                          href={mapLink(office)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:text-brand-orange hover:underline"
                        >
                          (Get Location on Google Map)
                        </a>
                      </span>
                    </p>
                    <p className="mt-2 text-sm">
                      <a
                        href={telLink(office.phone)}
                        className="flex items-center gap-2 hover:text-brand-orange"
                      >
                        <PhoneIcon
                          className="size-4.5 shrink-0 text-brand-orange"
                          strokeWidth={1.5}
                        />
                        {office.phone}
                      </a>
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
