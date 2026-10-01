import {
  BookOpenIcon,
  CertificateIcon,
  GraduationCapIcon,
  MessageCircleIcon,
  ScrollIcon,
} from "@/components/icons";

const icons = {
  certificate: CertificateIcon,
  scroll: ScrollIcon,
  book: BookOpenIcon,
  cap: GraduationCapIcon,
  feedback: MessageCircleIcon,
};

// Coloured card with a round icon, a title and a short text.
export default function FeatureCard({ feature }) {
  const FeatureIcon = icons[feature.icon];

  return (
    // Hover: the card lifts and its yellow edge grows.
    <article
      className="h-full border border-black/20 px-6 pt-6 pb-7 shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0.5rem_0.5rem_0_var(--color-brand-yellow)]"
      style={{ backgroundColor: feature.color }}
    >
      <span className="grid size-12 place-items-center rounded-full bg-white text-brand-orange shadow-sm">
        <FeatureIcon className="size-6" strokeWidth={1.5} />
      </span>
      <h3 className="mt-4 text-[1.375rem] leading-tight font-semibold text-brand-orange">
        {feature.title}
      </h3>
      <p className="mt-2 text-[0.9375rem]">{feature.text}</p>
    </article>
  );
}
