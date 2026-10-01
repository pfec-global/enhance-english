"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/navLinks";
import {
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/icons";

const roundButton =
  "grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand-orange shadow-md";

const demoButton =
  "rounded-lg bg-brand-orange px-4 py-2.5 text-center font-semibold whitespace-nowrap text-white transition-colors";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            preload
            className="h-11 w-auto sm:h-12 lg:h-16"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden flex-1 items-center justify-between rounded-full bg-white px-8 shadow-md xl:mr-10 xl:ml-6 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 py-3 font-semibold transition-colors hover:text-brand-orange"
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDownIcon className="size-5 text-brand-orange" />
              )}
            </Link>
          ))}
        </nav>

        <button type="button" aria-label="Search" className={roundButton}>
          <SearchIcon className="size-5" />
        </button>

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
          onClick={() => setMenuOpen(!menuOpen)}
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
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-black/10">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-3 font-semibold"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDownIcon className="size-5 text-brand-orange" />
                  )}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link
                href="/book-demo"
                onClick={() => setMenuOpen(false)}
                className={`${demoButton} block`}
              >
                Book Free Demo Class
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
