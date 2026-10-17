import Image from "next/image";
import Link from "next/link";

// Small promo card beside the blog posts: <BlogSideCta /> (the "StudyAbroadCta" of the PFEC India site)
// It fills the width of whatever it is placed in. The image, text, button label and link can be changed per page.
export default function BlogSideCta({
  image = "/image/side_bar_cta_default_image.webp",
  title = "Achieve Your Target IELTS & PTE Score",
  text = "Join expert-led courses and mock tests designed to help you prepare smarter and succeed faster",
  buttonLabel = "Book Free Demo Class",
  href = "/book-demo",
}) {
  return (
    <aside className="overflow-hidden rounded-xl bg-white text-center shadow-sm">
      {/* width / height only set the shape (544 x 308); the image scales to the width of the card */}
      <Image src={image} alt="" width={544} height={308} sizes="320px" className="h-auto w-full px-5 pt-5" />
      <div className="p-5">
        <h2 className="text-lg font-bold leading-snug">{title}</h2>
        <p className="mt-2 text-xs text-ink/70">{text}</p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-white transition duration-300 hover:opacity-90"
        >
          {buttonLabel}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12h16m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
