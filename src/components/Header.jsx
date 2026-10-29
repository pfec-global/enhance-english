"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScrollProgress from "@/components/ScrollProgress";
import { useSignedIn } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { navLinks } from "@/data/navLinks";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarIcon,
  CartIcon,
  CertificateIcon,
  ChevronDownIcon,
  CloseIcon,
  GraduationCapIcon,
  HourglassIcon,
  LetterIcon,
  MenuIcon,
  MonitorIcon,
  SpeakerIcon,
  TicketIcon,
} from "@/components/icons";

const menuIcons = {
  cap: GraduationCapIcon,
  book: BookOpenIcon,
  monitor: MonitorIcon,
  hourglass: HourglassIcon,
  calendar: CalendarIcon,
  speaker: SpeakerIcon,
  letter: LetterIcon,
  certificate: CertificateIcon,
  ticket: TicketIcon,
};

// After a menu link is clicked, take the focus off it so the dropdown closes.
const leaveMenu = () => document.activeElement?.blur();

// Whether `pathname` is the page `href` or one of the pages under it
const isUnder = (pathname, href) =>
  pathname === href || pathname.startsWith(`${href}/`);

// A nav item is active on its own page, the pages under it and the ones in its
// `activeFor` (e.g. IELTS on /ielts/crash-course, Blog on /category/visa)
const isActive = (pathname, link) =>
  [link.href, ...(link.activeFor ?? [])].some((href) =>
    isUnder(pathname, href),
  );

/*
  Desktop dropdown: the courses on the left, a coloured box with mock tests,
  exam registration etc. on the right. `menu` comes from data/navLinks.js.
  It opens while the pointer is over the nav item or the keyboard focus is
  inside it (CSS only, see the `group` in Header), and closes on Escape.
  The item of the current page stays grey.
*/
function NavMenu({ menu, pathname }) {
  const { feature } = menu;

  return (
    // pt-3 is an invisible bridge, so the menu stays open on the way down to it
    <div
      className={`invisible absolute top-full z-10 ${menu.alignRight ? "-right-6" : "-left-6"} translate-y-2 pt-3 opacity-0 transition duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none`}
    >
      <div
        className="grid w-[42rem] grid-cols-[1fr_16rem] overflow-hidden rounded-2xl bg-white text-ink shadow-xl ring-1 ring-black/5"
        style={{ "--menu": feature.color }}
      >
        <div className="p-4">
          <p className="px-3 pb-2 text-xs font-bold tracking-wider text-black/50 uppercase">
            {menu.title}
          </p>
          <ul>
            {menu.items.map((item) => {
              const ItemIcon = menuIcons[item.icon];
              const current = item.href === pathname;
              return (
                <li key={item.href}>
                  {/*
                    Hover: the row turns grey and the icon fills with the menu colour.
                    The current page's row stays that way, with its name in the menu colour.
                  */}
                  <Link
                    href={item.href}
                    onClick={leaveMenu}
                    aria-current={current ? "page" : undefined}
                    className={`group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface focus-visible:bg-surface ${
                      current ? "bg-surface" : ""
                    }`}
                  >
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-lg transition-colors group-hover/item:bg-(--menu) group-hover/item:text-white ${
                        current
                          ? "bg-(--menu) text-white"
                          : "bg-(--menu)/10 text-(--menu)"
                      }`}
                    >
                      <ItemIcon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span
                        className={`block leading-snug font-semibold ${current ? "text-(--menu)" : ""}`}
                      >
                        {item.label}
                      </span>
                      <span className="block text-sm text-black/60">
                        {item.text}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col bg-(--menu) p-6 text-white">
          {feature.badge && (
            <p className="mb-3 w-fit rounded-sm bg-brand-yellow px-2 py-1 text-xs font-bold text-ink">
              {feature.badge}
            </p>
          )}
          <p className="text-lg leading-snug font-bold">{feature.title}</p>
          <p className="mt-2 text-sm text-white/85">{feature.text}</p>
          <ul className="mt-auto pt-4">
            {feature.links.map((link) => (
              <li key={link.href + link.label}>
                {/* Hover: the arrow moves right */}
                <Link
                  href={link.href}
                  onClick={leaveMenu}
                  className="group/link flex items-center justify-between gap-2 border-b border-white/25 py-2.5 text-sm font-semibold"
                >
                  {link.label}
                  <ArrowRightIcon className="size-4 shrink-0 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const roundButton =
  "grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand-orange shadow-md";

const demoButton =
  "rounded-lg bg-brand-orange px-4 py-2.5 text-center font-semibold whitespace-nowrap text-white transition-colors";

// `links` in the shape of data/navLinks.js; the layout passes them with the admin's courses.
export default function Header({ links = navLinks }) {
  const pathname = usePathname();
  const cartCount = useCart().length;
  // Signed in: "My Profile" in place of "Log In"
  const signedIn = useSignedIn();
  const account = signedIn
    ? { href: "/profile", label: "My Profile" }
    : { href: "/login", label: "Log In" };
  const [menuOpen, setMenuOpen] = useState(false);
  // Phones: the label of the nav item whose dropdown is open, if any
  const [mobileOpen, setMobileOpen] = useState(null);

  return (
    // sticky: the header stays at the top of the screen while the page scrolls
    <header className="sticky top-0 z-50 bg-brand-blue bg-linear-to-b from-black/30 to-transparent shadow-md">
      <div className="site-container flex items-center gap-3 py-4 xl:gap-6 xl:py-5">
        <Link href="/" className="mr-auto shrink-0 xl:mr-0">
          <Image
            src="/image/logo.png"
            alt="Enhance English by PFEC"
            width={308}
            height={128}
            fetchPriority="high"
            loading="eager"
            className="h-11 w-auto sm:h-12 lg:h-16"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden flex-1 items-center justify-between rounded-full bg-white px-8 shadow-md xl:mr-10 xl:ml-6 xl:flex">
          {links.map((link) => {
            const active = isActive(pathname, link);
            return (
              <div
                key={link.href}
                className="group relative"
                onKeyDown={(event) => event.key === "Escape" && leaveMenu()}
              >
                {/* Active: orange, with a short orange line under it */}
                <Link
                  href={link.href}
                  aria-haspopup={link.menu ? "true" : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex items-center gap-1.5 py-3 font-semibold transition-colors group-hover:text-brand-orange ${
                    active
                      ? "text-brand-orange after:absolute after:bottom-1.5 after:left-0 after:h-0.5 after:w-6 after:rounded-full after:bg-brand-orange"
                      : ""
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDownIcon
                      className={`size-5 text-brand-orange transition-transform duration-300 ${
                        link.menu
                          ? "group-focus-within:rotate-180 group-hover:rotate-180"
                          : ""
                      }`}
                    />
                  )}
                </Link>
                {link.menu && <NavMenu menu={link.menu} pathname={pathname} />}
              </div>
            );
          })}
        </nav>

        {/* The cart (app/cart/page.js), with the number of courses in it */}
        <Link
          href="/cart"
          aria-label={cartCount ? `Cart, ${cartCount} ${cartCount === 1 ? "course" : "courses"}` : "Cart"}
          aria-current={pathname === "/cart" ? "page" : undefined}
          className={`${roundButton} relative transition-colors hover:bg-brand-orange hover:text-white`}
        >
          <CartIcon className="size-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-yellow px-1 text-xs font-bold text-ink">
              {cartCount}
            </span>
          )}
        </Link>

        {/* "Log In" opens the sign-in pop-up (components/AuthModal.jsx); signed in, it is
            "My Profile". On phones it lives inside the menu. */}
        <Link
          href={account.href}
          className="hidden rounded-lg border border-white px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-brand-orange sm:block lg:text-base"
        >
          {account.label}
        </Link>

        {/* On phones this button lives inside the menu instead */}
        <Link
          href="/book-demo"
          className={`${demoButton} hidden text-sm hover:bg-white hover:text-brand-orange sm:block lg:text-base`}
        >
          Book Free Demo Class
        </Link>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => {
            // On opening, the current page's section starts open, showing where you are
            if (!menuOpen) {
              setMobileOpen(
                links.find((link) => link.menu && isActive(pathname, link))
                  ?.label ?? null,
              );
            }
            setMenuOpen(!menuOpen);
          }}
          className={`${roundButton} xl:hidden`}
        >
          {menuOpen ? (
            <CloseIcon className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="site-container pb-4 xl:hidden">
          <ul className="rounded-2xl bg-white px-5 py-2 shadow-lg">
            {links.map((link) => {
              const open = mobileOpen === link.label;
              const active = isActive(pathname, link);

              return (
                <li key={link.href} className="border-b border-black/10">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex-1 py-3 font-semibold ${active ? "text-brand-orange" : ""}`}
                    >
                      {link.label}
                    </Link>
                    {link.menu ? (
                      <button
                        type="button"
                        aria-label={`${link.label} courses`}
                        aria-expanded={open}
                        onClick={() => setMobileOpen(open ? null : link.label)}
                        className="-mr-2 grid size-10 place-items-center"
                      >
                        <ChevronDownIcon
                          className={`size-5 text-brand-orange transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      link.hasDropdown && (
                        <ChevronDownIcon className="size-5 text-brand-orange" />
                      )
                    )}
                  </div>

                  {/* The item's links slide open below it: the row grows from 0 to its full height (grid-rows 0fr → 1fr) */}
                  {link.menu && (
                    <div
                      inert={!open}
                      className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul className="overflow-hidden">
                        {[...link.menu.items, ...link.menu.feature.links].map(
                          (item) => (
                            <li key={item.href + item.label}>
                              <Link
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                aria-current={
                                  item.href === pathname ? "page" : undefined
                                }
                                className={`block border-l-2 py-2 pl-4 text-sm last:mb-3 hover:border-brand-orange hover:text-brand-orange ${
                                  item.href === pathname
                                    ? "border-brand-orange font-semibold text-brand-orange"
                                    : "border-brand-orange/30"
                                }`}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
            <li className="grid gap-2 py-3">
              <Link
                href="/book-demo"
                onClick={() => setMenuOpen(false)}
                className={`${demoButton} block`}
              >
                Book Free Demo Class
              </Link>
              <Link
                href={account.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-brand-orange px-4 py-2.5 text-center font-semibold text-brand-orange"
              >
                {account.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <ScrollProgress />
    </header>
  );
}
