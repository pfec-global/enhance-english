import Link from "next/link";

const variants = {
  solid:
    "bg-brand-orange font-semibold text-white hover:bg-transparent hover:text-brand-orange",
  outline: "text-brand-orange hover:bg-brand-orange hover:text-white",
};

// Small orange link button used on the cards. variant: "solid" or "outline".
// relative z-10: it stays clickable above a card's full-card link (see CourseCard.jsx).
export default function Button({ href, variant = "solid", children }) {
  return (
    <Link
      href={href}
      className={`relative z-10 rounded-md border border-brand-orange px-4 py-2 text-center text-[0.9375rem] whitespace-nowrap transition-colors ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
