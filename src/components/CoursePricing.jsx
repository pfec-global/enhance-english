"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import { CalendarIcon, CartIcon } from "@/components/icons";
import MockTestSelect from "@/components/MockTestSelect";
import { addToCart } from "@/lib/cart";

const button =
  "flex items-center gap-3 rounded-sm border border-brand-orange px-4 py-2.5 text-sm font-semibold transition-colors";

// The number of mock tests picked on each course page, by the page's address.
// Shared by both copies of the prices (hero and "What's Covered?"), so a change
// in one shows in the other. Kept until the page is reloaded.
const pickedTestCounts = new Map();
const listeners = new Set();

function pickTestCount(page, testCount) {
  pickedTestCounts.set(page, testCount);
  listeners.forEach((listener) => listener());
}

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// Prices and the buttons of a course (Buy, Add to Cart, Book Free Demo Class). Shown in the hero and again in the
// "What's Covered?" section. `course` comes from data/coursePages.js or the admin;
// the actual price and the offer are optional (null when the course has none).
export default function CoursePricing({ course, placement = "hero" }) {
  const mockTestOptions = course.mockTest?.options ?? [];
  const pageHref = `/${course.program}/${course.slug}`;
  const firstTestCount = String(mockTestOptions[0]?.testCount ?? "");
  const selectedTestCount = useSyncExternalStore(
    subscribe,
    () => pickedTestCounts.get(pageHref) ?? firstTestCount,
    () => firstTestCount,
  );
  const selectedMockTestOption =
    mockTestOptions.find(
      (option) => String(option.testCount) === selectedTestCount,
    ) ?? mockTestOptions[0];
  const isMockTest = Boolean(
    course.mockTest?.enabled && selectedMockTestOption,
  );
  const pricing = isMockTest ? selectedMockTestOption : course;
  const hasDiscount = Boolean(pricing.actualPrice || pricing.offer);
  const showDemoButton = !isMockTest || placement === "sidebar";
  const buyButtonLabel =
    isMockTest && placement === "hero" ? "Buy Mock Tests" : "Buy Course";

  // What "Add to Cart" puts in the cart (lib/cart.js). Each number of mock
  // tests is its own item, so it has its own address.
  const cartItem = {
    href: isMockTest
      ? `${pageHref}?tests=${selectedMockTestOption.testCount}`
      : pageHref,
    title: isMockTest
      ? `${course.title} (${selectedMockTestOption.testCount} Mock Tests)`
      : course.title,
    price: pricing.effectivePrice,
    actualPrice: pricing.actualPrice,
    image: course.image,
    text: course.highlights?.[0],
  };

  return (
    <>
      {isMockTest && (
        <div className="mt-5 flex items-center gap-3 text-xs">
          <span className="font-medium">No. of Mock Tests</span>
          <MockTestSelect
            label="No. of Mock Tests"
            options={mockTestOptions}
            value={String(selectedMockTestOption.testCount)}
            onChange={(testCount) => pickTestCount(pageHref, testCount)}
          />
        </div>
      )}

      {hasDiscount && (
        <div
          className={`${isMockTest ? "mt-3" : "mt-5"} flex flex-wrap items-center gap-x-2 gap-y-2`}
        >
          {pricing.actualPrice && (
            <p className="text-xs font-bold">
              Actual Price{" "}
              <s className="text-lg font-medium">৳{pricing.actualPrice}</s>
            </p>
          )}
          {pricing.offer && (
            <p className="bg-brand-yellow px-2 py-1.5 text-xs">
              {pricing.offer.label} <strong>{pricing.offer.value}</strong>
            </p>
          )}
        </div>
      )}

      <p
        className={`${hasDiscount ? "mt-2" : isMockTest ? "mt-3" : "mt-5"} text-sm`}
      >
        {pricing.actualPrice ? "Effective Price after Discount" : "Price"}{" "}
        <strong className="text-[1.75rem] leading-none">
          ৳{pricing.effectivePrice}
        </strong>
      </p>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3">
        {/* Puts the course in the cart on the way to the checkout (app/checkout/page.js) */}
        <Link
          href={course.buyHref}
          onClick={() => addToCart(cartItem)}
          className={`${button} bg-brand-orange text-white hover:bg-transparent hover:text-brand-orange`}
        >
          {buyButtonLabel}
          <CartIcon className="size-5" />
        </Link>
        <AddToCartButton course={cartItem} variant="wide" />
        {showDemoButton && (
          <Link
            href={course.demoHref}
            className={`${button} bg-white/60 hover:bg-brand-orange hover:text-white`}
          >
            Book Free Demo Class
            <CalendarIcon className="size-5" />
          </Link>
        )}
      </div>
    </>
  );
}
