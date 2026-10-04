"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollProgress from "@/components/ScrollProgress";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInput = useRef(null);

  // Put the cursor in the search box as soon as it opens.
  useEffect(() => {
    if (searchOpen) searchInput.current.focus();
  }, [searchOpen]);

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

        <button
          type="button"
          aria-label={searchOpen ? "Close search" : "Search"}
          aria-expanded={searchOpen}
          onClick={() => {
            setSearchOpen(!searchOpen);
            setMenuOpen(false);
          }}
          className={`${roundButton} cursor-pointer transition-transform duration-300 hover:scale-105`}
        >
          {searchOpen ? (
            <CloseIcon className="size-5" />
          ) : (
            <SearchIcon className="size-5" />
          )}
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
          onClick={() => {
            setMenuOpen(!menuOpen);
            setSearchOpen(false);
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

      {/*
        Search box. It slides open and shut under the nav bar: the row grows from
        0 to its full height (grid-rows 0fr → 1fr) while the box fades in.
        `inert` keeps the hidden box out of reach of the keyboard.
      */}
      <div
        inert={!searchOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          searchOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <form
            action="/search"
            role="search"
            onKeyDown={(event) =>
              event.key === "Escape" && setSearchOpen(false)
            }
            className="site-container pb-4 xl:pb-5"
          >
            <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-full bg-white py-1.5 pr-1.5 pl-5 shadow-md">
              <input
                ref={searchInput}
                type="search"
                name="q"
                placeholder="Search courses, mock tests, events..."
                aria-label="Search"
                className="min-w-0 flex-1 bg-transparent py-1.5 text-ink outline-none placeholder:text-ink/50"
              />
              <button
                type="submit"
                aria-label="Search"
                className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-brand-orange text-white transition-colors hover:bg-brand-royal"
              >
                <SearchIcon className="size-4" />
              </button>
            </div>
          </form>
        </div>
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

      <ScrollProgress />
    </header>
  );
}
