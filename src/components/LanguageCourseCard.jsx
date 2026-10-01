import Image from "next/image";
import Button from "@/components/Button";
import {
  CalendarIcon,
  ChatIcon,
  LetterIcon,
  PresentationIcon,
  SoundIcon,
  SpeakerIcon,
} from "@/components/icons";

const featureIcons = {
  sound: SoundIcon,
  letter: LetterIcon,
  chat: ChatIcon,
  speaker: SpeakerIcon,
  board: PresentationIcon,
};

const icon = "size-5 shrink-0 text-brand-orange";

// Wide course card: picture on one side, details on the other.
// On phones the picture sits on top. `imageRight` puts it on the right instead of the left.
export default function LanguageCourseCard({ course, imageRight = false }) {
  return (
    // Hover: the card lifts, its yellow edge grows and the picture zooms in.
    <article
      className={`group flex flex-col border border-black/15 bg-card shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0.5rem_0.5rem_0_var(--color-brand-yellow)] md:flex-row ${
        imageRight ? "md:flex-row-reverse" : ""
      }`}
    >
      <div
        className="relative aspect-[812/758] max-h-88 overflow-hidden md:aspect-auto md:max-h-none md:w-[38.7%] md:shrink-0"
        style={{ backgroundColor: course.imageColor }}
      >
        <Image
          src={course.image}
          alt=""
          fill
          sizes="(min-width: 768px) 410px, 100vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105 lg:object-cover"
        />
      </div>

      <div className="flex-1 px-6 pt-6 pb-7 lg:pt-7 lg:pr-14 lg:pb-8">
        <h3 className="text-[1.4375rem] leading-tight font-semibold">
          {course.title}
          <span className="block font-normal">{course.level}</span>
        </h3>

        <p className="mt-2 flex items-center gap-2 text-[0.9375rem] font-bold">
          <CalendarIcon className={icon} strokeWidth={1.5} />
          {course.duration}
        </p>

        <ul className="mt-3.5 grid gap-x-6 gap-y-3.5 border-t border-black/25 pt-4 text-[0.9375rem] lg:grid-cols-[auto_1fr]">
          {course.features.map((feature) => {
            const FeatureIcon = featureIcons[feature.icon];
            return (
              <li key={feature.label} className="flex items-center gap-2">
                <FeatureIcon className={icon} strokeWidth={1.5} />
                {feature.label}
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-sm">
          Price <strong className="text-2xl">৳{course.price}</strong>
        </p>
        <div className="mt-1.5 flex flex-wrap gap-2.5">
          <Button href={`${course.href}#register`}>Register for Free</Button>
          <Button href={course.href} variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </article>
  );
}
