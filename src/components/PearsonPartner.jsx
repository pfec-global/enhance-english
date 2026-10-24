import Image from "next/image";

// "We have also been recognized as an official partner of Pearson…" strip: the Pearson logo
// card, with the sentence under it.
export default function PearsonPartner() {
  return (
    <section aria-label="Pearson partnership" className="bg-[#eef2f6]">
      <div className="site-container py-10 text-center lg:py-12">
        {/* The image is the logo card itself, with its own border and shadow */}
        <Image
          src="/image/pearson_logo.png"
          alt="Pearson PTE"
          width={253}
          height={100}
          className="mx-auto h-16 w-auto sm:h-20"
        />
        <p className="mx-auto mt-5 max-w-3xl font-bold sm:text-lg lg:text-xl">
          We have also been recognized as an official partner of Pearson,
          offering one of the finest training facilities for PTE test
          preparation in the country.
        </p>
      </div>
    </section>
  );
}
