import Image from "next/image";

// The student's name and score are part of the image, so the card is the image itself.
export default function TestimonialCard({ testimonial, examName }) {
  return (
    // Hover: the card lifts with a shadow and the image zooms in.
    <figure className="group overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <Image
        src={testimonial.image}
        alt={`${testimonial.name} — ${examName} score ${testimonial.score}`}
        width={2000}
        height={2000}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
        className="aspect-square h-auto w-full transition-transform duration-500 group-hover:scale-105"
      />
    </figure>
  );
}
