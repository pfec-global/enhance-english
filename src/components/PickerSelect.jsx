"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";

/*
  A styled dropdown in place of a <select> (whose open list the browser draws and
  cannot be styled), e.g. the checkout's Country and Nearest Centre
  (components/CheckoutView.jsx, CenterSelect.jsx). Like components/MockTestSelect.jsx.
  Works like a select from the keyboard: arrows, Home/End, Enter/Space, Escape,
  and typing a letter jumps to the next option starting with it.

  - `options`: [{ value, label, detail?, icon? }]; `detail` is a smaller line under the
    label, `icon` is drawn in front of it (in the button too, once chosen).
  - `value` and `onChange(value)` when the parent keeps the choice; otherwise it keeps
    its own, starting at `defaultValue`.
  - The choice is sent with the form as `name`. With `required`, the form does not
    send until something is chosen; the message (`requiredMessage`) is shown by the
    form's useFieldErrors (hooks/useFieldErrors.jsx), whose `fieldProps` go in `fieldProps`.
  - `id` goes on the button, so the field's <label> points at it.
*/
export default function PickerSelect({
  id,
  name,
  options,
  value: controlledValue,
  defaultValue = "",
  onChange,
  placeholder = "Choose",
  required = false,
  requiredMessage,
  fieldProps = {},
  emptyIcon,
}) {
  const listId = useId();
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const [ownValue, setOwnValue] = useState(defaultValue);
  const value = controlledValue ?? ownValue;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];
  const { "aria-invalid": invalid, ...describedBy } = fieldProps;

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

  // Keeps the highlighted option in view while moving with the keyboard
  useEffect(() => {
    if (isOpen) document.getElementById(`${listId}-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex, listId]);

  // Tells the form the value changed (as typing in a field would), so its message updates
  useEffect(() => {
    inputRef.current?.dispatchEvent(new Event("input", { bubbles: true }));
  }, [value]);

  const open = () => {
    setActiveIndex(Math.max(selectedIndex, 0));
    setIsOpen(true);
  };

  const choose = (index) => {
    const next = options[index].value;
    setOwnValue(next);
    onChange?.(next);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  // The next option after `from` whose label starts with `letter`
  const findByLetter = (letter, from) => {
    const lower = letter.toLowerCase();
    for (let step = 1; step <= options.length; step++) {
      const index = (from + step) % options.length;
      if (options[index].label.toLowerCase().startsWith(lower)) return index;
    }
    return -1;
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
    } else if (event.key.length === 1 && /\S/.test(event.key)) {
      const index = findByLetter(event.key, activeIndex);
      if (index !== -1) setActiveIndex(index);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      {/* Carries the value with the form. Not readOnly: the browser does not check
          read-only fields. Invisible and out of the Tab order; the button stands in for it. */}
      <input
        ref={inputRef}
        name={name}
        value={value}
        onChange={() => {}}
        required={required}
        data-required={requiredMessage}
        tabIndex={-1}
        aria-hidden="true"
        onInvalid={(event) => {
          // The first field to fix: the button takes the focus in its place
          if (event.target.form?.querySelector(":invalid") === event.target) {
            buttonRef.current?.focus();
          }
        }}
        className="pointer-events-none absolute inset-0 opacity-0"
      />

      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        {...describedBy}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={onButtonKeyDown}
        className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-brand-orange/20 ${
          invalid
            ? "border-brand-orange bg-brand-orange/5"
            : isOpen
              ? "border-brand-orange bg-white"
              : "border-black/10 bg-[#f3f3f3] hover:border-brand-orange/50"
        }`}
      >
        {(selected?.icon ?? emptyIcon) && (
          <span className="shrink-0">{selected?.icon ?? emptyIcon}</span>
        )}
        <span className="min-w-0 flex-1">
          {selected ? (
            <>
              <span className="block truncate font-semibold">{selected.label}</span>
              {selected.detail && (
                <span className="block truncate text-xs text-ink/60">{selected.detail}</span>
              )}
            </>
          ) : (
            <span className="block truncate py-px text-ink/50">{placeholder}</span>
          )}
        </span>
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-orange/10 text-brand-orange">
          <ChevronDownIcon
            className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={id}
        aria-activedescendant={isOpen ? `${listId}-${activeIndex}` : undefined}
        tabIndex={-1}
        onKeyDown={onListKeyDown}
        className={`absolute top-full left-0 z-20 mt-2 max-h-72 w-full min-w-56 origin-top overflow-auto rounded-xl border border-brand-orange/15 bg-white p-1.5 shadow-xl shadow-ink/10 outline-none transition duration-150 ${
          isOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        }`}
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          return (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={isSelected}
              onClick={() => choose(index)}
              onPointerMove={() => setActiveIndex(index)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                index === activeIndex ? "bg-brand-orange/10" : ""
              }`}
            >
              {option.icon && <span className="shrink-0">{option.icon}</span>}
              <span className="min-w-0 flex-1">
                <span
                  className={`block text-sm ${isSelected ? "font-semibold text-brand-orange" : ""}`}
                >
                  {option.label}
                </span>
                {option.detail && (
                  <span className="block text-xs text-ink/60">{option.detail}</span>
                )}
              </span>
              <CheckIcon
                className={`size-4 shrink-0 text-brand-orange ${isSelected ? "" : "invisible"}`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
