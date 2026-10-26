"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarIcon, CartIcon } from "@/components/icons";
import MockTestSelect from "@/components/MockTestSelect";

const button =
  "flex items-center gap-3 rounded-sm border border-brand-orange px-4 py-2.5 text-sm font-semibold transition-colors";

// Prices and the two buttons of a course. Shown in the hero and again in the
// "What's Covered?" section. `course` comes from data/coursePages.js or the admin;
// the actual price and the offer are optional (null when the course has none).
export default function CoursePricing({ course, placement = "hero" }) {
  const mockTestOptions = course.mockTest?.options ?? [];
  const [selectedTestCount, setSelectedTestCount] = useState(
    () => String(mockTestOptions[0]?.testCount ?? ""),
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

  return (
    <>
      {isMockTest && (
        <div className="mt-5 flex items-center gap-3 text-xs">
          <span className="font-medium">No. of Mock Tests</span>
          <MockTestSelect
            label="No. of Mock Tests"
            options={mockTestOptions}
            value={String(selectedMockTestOption.testCount)}
            onChange={setSelectedTestCount}
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
        <Link
          href={course.buyHref}
          className={`${button} bg-brand-orange text-white hover:bg-transparent hover:text-brand-orange`}
        >
          {buyButtonLabel}
          <CartIcon className="size-5" />
        </Link>
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
