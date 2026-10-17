import Image from "next/image";
import Link from "next/link";
import { LinkedinIcon } from "@/components/icons";

// Hero of the author page: photo, name and bio on the left, the stat boxes on the right (below on mobile).
// author = { name, avatar, bio, linkedin } - an author without a photo gets the default avatar.
// stats is a list of { label, value }.
export default function AuthorHero({ author, stats }) {
  return (
    <section className="bg-[#E4F6FA]">
      <div className="site-container py-8 lg:py-10">
        <div className="animate-fade-up motion-reduce:animate-none">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 12H4m6-6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Go Back
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="flex flex-col gap-4 animate-fade-up [animation-delay:100ms] motion-reduce:animate-none sm:flex-row sm:gap-6">
            <Image
              src={author.avatar ?? "/image/avater.webp"}
              alt={author.name}
              width={128}
              height={128}
              preload
              className="h-24 w-24 shrink-0 rounded-full bg-accent object-cover sm:h-32 sm:w-32"
            />
            <div className="max-w-xl">
              <p className="text-xs text-ink/70">Author Profile</p>
              <h1 className="text-2xl font-bold text-navy sm:text-3xl">{author.name}</h1>
              {/* The bio and the LinkedIn link are only shown for an author who has them */}
              {author.bio && (
                <>
                  <h2 className="mt-3 text-sm font-bold">Bio</h2>
                  <p className="mt-1 text-sm text-ink/75">{author.bio}</p>
                </>
              )}
              {author.linkedin && (
                <p className="mt-3 flex items-center gap-2 text-sm">
                  Connect via:
                  <Link
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on LinkedIn`}
                    className="hover:opacity-80"
                  >
                    <LinkedinIcon className="h-6 w-6 text-navy" />
                  </Link>
                </p>
              )}
            </div>
          </div>

          <dl className="flex shrink-0 animate-fade-up [animation-delay:200ms] motion-reduce:animate-none gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-28 rounded-lg bg-white px-4 py-3 shadow-sm">
                <dt className="max-w-20 text-xs leading-tight text-ink/70">{stat.label}</dt>
                <dd className="mt-1 text-xl font-bold text-accent sm:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
