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

// Coloured card with a round icon, a title and a short text. `compact`: a smaller card
// (the About Us page, where five of them share one row and a half).
export default function FeatureCard({ feature, compact = false }) {
  const FeatureIcon = icons[feature.icon];

  return (
    // Hover: the card lifts and its yellow edge grows.
    <article
      className={`h-full border border-black/20 ${compact ? "p-5" : "px-6 pt-6 pb-7"} shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0.5rem_0.5rem_0_var(--color-brand-yellow)]`}
      style={{ backgroundColor: feature.color }}
    >
      <span
        className={`grid place-items-center rounded-full bg-white text-brand-orange shadow-sm ${compact ? "size-10" : "size-12"}`}
      >
        <FeatureIcon className={compact ? "size-5" : "size-6"} strokeWidth={1.5} />
      </span>
      <h3
        className={`leading-tight font-semibold text-brand-orange ${compact ? "mt-3 text-lg" : "mt-4 text-[1.375rem]"}`}
      >
        {feature.title}
      </h3>
      <p className={compact ? "mt-2 text-sm" : "mt-2 text-[0.9375rem]"}>
        {feature.text}
      </p>
    </article>
  );
}
