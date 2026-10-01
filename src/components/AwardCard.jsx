import Image from "next/image";

// Photo of the award on one side, details on the other. On phones the photo sits on top.
export default function AwardCard({ award }) {
  return (
    <article className="group flex h-full flex-col border border-black/15 bg-card text-left text-ink shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)] md:min-h-[26rem] md:flex-row">
      <div className="relative aspect-[5/4] overflow-hidden md:aspect-auto md:w-[39.4%] md:shrink-0">
        {/* Hover: the photo zooms in */}
        <Image
          src={award.image}
          alt={`${award.title} ${award.years} trophy`}
          fill
          sizes="(min-width: 768px) 320px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 p-6 md:px-11 md:py-12">
        <h3 className="font-coiny text-[1.75rem] leading-tight text-brand-orange md:text-[2rem]">
          {award.title}
        </h3>
        <p className="text-2xl md:text-[1.75rem]">{award.years}</p>

        <div className="mt-5 w-fit border border-black/25 bg-white px-3 pt-2 pb-3 shadow-[0.1875rem_0.1875rem_0_var(--color-brand-yellow)]">
          <p className="text-xs font-medium">Recognized By</p>
          <Image
            src={award.logo.src}
            alt={award.recognizedBy}
            width={award.logo.width}
            height={award.logo.height}
            sizes="176px"
            className="mt-1.5 h-auto w-44"
          />
        </div>

        <p className="mt-6 md:mt-10">{award.description}</p>
      </div>
    </article>
  );
}
