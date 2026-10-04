import Image from "next/image";
import { partners } from "@/data/partners";

export default function Partners() {
  return (
    <section aria-labelledby="partners" className="bg-surface">
      <div className="site-container py-10 lg:py-14">
        <h2
          id="partners"
          className="text-center text-2xl font-semibold sm:text-3xl"
        >
          Our <span className="text-brand-blue">Partners</span>
        </h2>

        {/* All logos share one height. Phones: always 2 per row. Tablets and up: one row. */}
        <ul className="group mt-6 grid grid-cols-2 items-center justify-items-center gap-x-4 gap-y-7 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-6 lg:mt-8 lg:gap-x-14">
          {partners.map(({ id, name, logo }) => (
            <li
              key={id}
              // Hover: the logo lifts and grows a little while the others fade back
              // Phones: the height follows the screen width so two logos always fit side by side
              className="relative h-[min(2.5rem,8.5vw)] transition duration-300 ease-out group-hover:opacity-50 hover:-translate-y-1 hover:scale-110 hover:!opacity-100 motion-reduce:transform-none sm:h-12 lg:h-14"
              style={{ aspectRatio: `${logo.width} / ${logo.height}` }}
            >
              {/* mix-blend-multiply hides the white background some logo files have */}
              <Image
                src={logo.src}
                alt={name}
                fill
                sizes="240px"
                className="object-cover mix-blend-multiply"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
