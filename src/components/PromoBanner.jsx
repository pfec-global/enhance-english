import Link from "next/link";

// Dark promo card for the sidebar (e.g. "Want to Study in the UK?"): title, short text and a button
export default function PromoBanner({ title, text, buttonLabel, href }) {
  return (
    <aside className="rounded-xl bg-linear-to-br from-indigo to-navy p-5 text-center text-white shadow-sm">
      <h2 className="text-lg font-bold leading-snug">{title}</h2>
      <p className="mt-2 text-xs text-white/80">{text}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-white transition duration-300 hover:opacity-90"
      >
        {buttonLabel}
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </aside>
  );
}
