"use client";

import { useEffect, useRef, useState } from "react";
import DemoClassForm from "@/components/DemoClassForm";
import { CloseIcon } from "@/components/icons";

/*
  "Book Your Free Demo Class" pop-up, placed once in app/layout.js.
  Every link to /book-demo on the site (the "Book Free Demo Class" buttons, in
  components or in data files) opens it instead of going to that page — so a
  new button only needs href="/book-demo". Ctrl/Cmd-click or a new tab still
  opens the /book-demo page, which has the same form.
  It is a native <dialog>: Escape closes it and the keyboard stays inside it.
*/
export default function DemoClassModal() {
  const dialog = useRef(null);
  // Changes on every opening, so the form starts empty again
  const [opening, setOpening] = useState(0);

  useEffect(() => {
    // Runs before Next.js's own link handling, which skips a click that was cancelled here
    const onClick = (event) => {
      const link = event.target.closest?.('a[href="/book-demo"]');
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
  }, []);

  const close = () => dialog.current.close();

  return (
    // A click on the dark backdrop (the dialog itself, outside the card) closes it
    <dialog
      ref={dialog}
      aria-labelledby="demo-class-title"
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

        <p className="w-fit bg-brand-orange px-2 py-1 text-sm font-bold text-white">
          100% Free
        </p>
        <h2
          id="demo-class-title"
          className="mt-3 pr-8 text-2xl leading-tight font-bold sm:text-3xl"
        >
          Book Your Free{" "}
          <span className="font-coiny font-normal text-brand-orange">
            Demo Class
          </span>
        </h2>
        <p className="mt-2 text-sm text-ink/75">
          Try a class with our expert trainers before you join. Leave your
          details and we’ll call you to fix a time that suits you.
        </p>

        <DemoClassForm key={opening} onDone={close} />
      </div>
    </dialog>
  );
}
