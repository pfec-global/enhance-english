import Image from "next/image";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/icons";
import {
  contacts,
  copyright,
  legalLinks,
  linkGroups,
  socials,
} from "@/data/footer";

const icons = {
  pin: MapPinIcon,
  phone: PhoneIcon,
  mail: MailIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
};

const link = "transition-colors hover:text-brand-orange";

export default function Footer() {
  return (
    <footer className="bg-[#f7f9fb] text-sm">
      {/*
        phones, tablets: logo and contacts on top, links below
        desktop:         logo and contacts | links
      */}
      <div className="site-container grid gap-x-20 gap-y-10 pt-12 lg:grid-cols-[auto_1fr] lg:pt-14">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/image/ee_footer_logo.png"
              alt="Enhance English — IELTS, PTE, SAT, TOEFL"
              width={296}
              height={124}
              className="h-auto w-44 lg:w-52"
            />
          </Link>

          <ul className="mt-5 space-y-5">
            {contacts.map(({ id, icon, text, href }) => {
              const ContactIcon = icons[icon];

              return (
                <li key={id} className="flex items-center gap-3">
                  <ContactIcon
                    className="size-6 shrink-0 text-brand-orange"
                    strokeWidth={1.5}
                  />
                  {href ? (
                    <a href={href} className={link}>
                      {text}
                    </a>
                  ) : (
                    <span className="whitespace-pre-line">{text}</span>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-base font-bold">Follow Us</p>
          <ul className="mt-3 flex gap-3">
            {socials.map(({ id, name, icon, background, href }) => {
              const SocialIcon = icons[icon];

              return (
                <li key={id}>
                  {/* Hover: the square lifts a little */}
                  <a
                    href={href}
                    aria-label={name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-8 place-items-center rounded-md text-white transition duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{ background }}
                  >
                    <SocialIcon className="size-[1.125rem]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 2 link columns on phones, 3 from tablets up */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:gap-y-10"
        >
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-lg font-semibold text-brand-orange">
                {group.title}
              </h2>
              <ul className="mt-3 space-y-3">
                {group.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={link}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="site-container mt-10 pb-6 lg:mt-12">
        <div className="flex flex-col-reverse items-center gap-x-10 gap-y-4 border-t border-black/10 pt-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <p>{copyright}</p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 lg:gap-x-12">
            {legalLinks.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floats over the page, see BackToTop.jsx */}
      <BackToTop />
    </footer>
  );
}
