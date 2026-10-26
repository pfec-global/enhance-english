"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";

const formatCount = (count) => String(count).padStart(2, "0");

// The "No. of Mock Tests" picker in components/CoursePricing.jsx. A styled list in
// place of a <select>, whose open list the browser draws and cannot be styled.
// Works like a select from the keyboard: arrows, Home/End, Enter/Space, Escape.
export default function MockTestSelect({ label, options, value, onChange }) {
  const id = useId();
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => String(option.testCount) === value),
  );
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  // Close when clicking anywhere else on the page
  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  const open = () => {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  };

  const choose = (index) => {
    onChange(String(options[index].testCount));
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const onButtonKeyDown = (event) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      open();
    }
  };

  const onListKeyDown = (event) => {
    const last = options.length - 1;
    const moves = {
      ArrowDown: Math.min(activeIndex + 1, last),
      ArrowUp: Math.max(activeIndex - 1, 0),
      Home: 0,
      End: last,
    };
    if (event.key in moves) {
      event.preventDefault();
      setActiveIndex(moves[event.key]);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(activeIndex);
    } else if (event.key === "Escape" || event.key === "Tab") {
      setIsOpen(false);
      if (event.key === "Escape") buttonRef.current?.focus();
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-list`}
        aria-label={`${label}: ${formatCount(options[selectedIndex].testCount)}`}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={onButtonKeyDown}
        className={`flex cursor-pointer items-center gap-3 rounded-full border bg-white py-1.5 pr-1.5 pl-4 text-sm font-bold text-brand-orange shadow-sm shadow-brand-orange/10 outline-none transition hover:border-brand-orange hover:shadow-md hover:shadow-brand-orange/20 focus-visible:ring-2 focus-visible:ring-brand-orange/30 ${isOpen ? "border-brand-orange" : "border-brand-orange/40"}`}
      >
        {formatCount(options[selectedIndex].testCount)}
        <span className="flex size-6 items-center justify-center rounded-full bg-brand-orange/10">
          <ChevronDownIcon
            className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <ul
        ref={listRef}
        id={`${id}-list`}
        role="listbox"
        aria-label={label}
        aria-activedescendant={isOpen ? `${id}-${activeIndex}` : undefined}
        tabIndex={-1}
        onKeyDown={onListKeyDown}
        className={`absolute top-full left-0 z-20 mt-2 max-h-64 min-w-48 origin-top-left overflow-auto rounded-xl border border-brand-orange/15 bg-white p-1.5 shadow-xl shadow-ink/10 outline-none transition duration-150 ${isOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"}`}
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li
              key={option.testCount}
              id={`${id}-${index}`}
              role="option"
              aria-selected={isSelected}
              onClick={() => choose(index)}
              onPointerMove={() => setActiveIndex(index)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${index === activeIndex ? "bg-brand-orange/10" : ""} ${isSelected ? "font-bold text-brand-orange" : "text-ink"}`}
            >
              <span className="w-5 font-bold">{formatCount(option.testCount)}</span>
              <span className="flex-1 text-xs text-ink/60">
                {option.testCount === 1 ? "Mock Test" : "Mock Tests"}
              </span>
              {option.effectivePrice && (
                <span className="text-xs font-semibold text-ink">
                  ৳{option.effectivePrice}
                </span>
              )}
              <CheckIcon
                className={`size-4 text-brand-orange ${isSelected ? "" : "invisible"}`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
