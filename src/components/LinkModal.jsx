"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";

/*
  A pop-up that every link to `href` on the site opens instead of going to that
  page, so a new button only needs that href. Ctrl/Cmd-click or a new tab still
  opens the page itself, which should have the same form.
  Placed once in app/layout.js (see DemoClassModal, CustomCourseModal).
  It is a native <dialog>: Escape closes it and the keyboard stays inside it.

  The inside (`children`) is drawn afresh on every opening, so a form starts
  empty again. A button in a <form method="dialog"> inside it closes the pop-up.
  It is drawn as a white card, or with `plain` as only its inside (e.g. a form
  that is a card itself), with the close button over its top corner.
  `href` can also be a list of hrefs; `children` can then be a function that is
  given the one that was clicked (e.g. /login or /register, see AuthModal).
  `closeLabel` shows "Close" next to the cross; `className` replaces the width.
*/
export default function LinkModal({
  href,
  labelledBy,
  plain = false,
  closeLabel = false,
  className,
  children,
}) {
  const dialog = useRef(null);
  const [opening, setOpening] = useState(0);
  const [openedFrom, setOpenedFrom] = useState(null);
  const hrefs = [href].flat().join("|");

  useEffect(() => {
    // Runs before Next.js's own link handling, which skips a click that was cancelled here
    const onClick = (event) => {
      const link = event.target.closest?.(
        hrefs
          .split("|")
          .map((one) => `a[href="${one}"]`)
          .join(","),
      );
      const newTab =
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey;
      if (!link || newTab) return;

      event.preventDefault();
      setOpening((count) => count + 1);
      setOpenedFrom(link.getAttribute("href"));
      dialog.current.showModal();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [hrefs]);

  const close = () => dialog.current.close();

  return (
    // A click on the dark backdrop (the dialog itself, outside the card) closes it
    <dialog
      ref={dialog}
      aria-labelledby={labelledBy}
      onClick={(event) => event.target === dialog.current && close()}
      className={`m-auto w-[calc(100%-2rem)] ${className ?? (plain ? "max-w-lg" : "max-w-xl")} overflow-visible bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-[2px] open:animate-pop-in motion-reduce:open:animate-none`}
    >
      <div
        className={`relative max-h-[calc(100dvh-2rem)] overflow-y-auto ${
          plain
            ? "pr-1.5 pb-1.5" // room for the card's yellow shadow
            : "border border-black/25 bg-white p-6 shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)] sm:p-8"
        }`}
      >
        {closeLabel ? (
          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 z-10 flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-xs text-brand-orange transition-colors hover:bg-white/70"
          >
            <CloseIcon className="size-3.5" />
            Close
          </button>
        ) : (
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full text-ink/60 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
          >
            <CloseIcon className="size-5" />
          </button>
        )}

        <Fragment key={opening}>
          {typeof children === "function" ? children(openedFrom) : children}
        </Fragment>
      </div>
    </dialog>
  );
}
