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
*/
export default function LinkModal({ href, labelledBy, children }) {
  const dialog = useRef(null);
  const [opening, setOpening] = useState(0);

  useEffect(() => {
    // Runs before Next.js's own link handling, which skips a click that was cancelled here
    const onClick = (event) => {
      const link = event.target.closest?.(`a[href="${href}"]`);
      const newTab =
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey;
      if (!link || newTab) return;

      event.preventDefault();
      setOpening((count) => count + 1);
      dialog.current.showModal();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [href]);

  const close = () => dialog.current.close();

  return (
    // A click on the dark backdrop (the dialog itself, outside the card) closes it
    <dialog
      ref={dialog}
      aria-labelledby={labelledBy}
      onClick={(event) => event.target === dialog.current && close()}
      className="m-auto w-[calc(100%-2rem)] max-w-xl overflow-visible bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-[2px] open:animate-pop-in motion-reduce:open:animate-none"
    >
      <div className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto border border-black/25 bg-white p-6 shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)] sm:p-8">
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute top-3 right-3 grid size-9 cursor-pointer place-items-center rounded-full text-ink/60 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
        >
          <CloseIcon className="size-5" />
        </button>

        <Fragment key={opening}>{children}</Fragment>
      </div>
    </dialog>
  );
}
