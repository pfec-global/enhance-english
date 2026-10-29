"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleXIcon, CloseIcon } from "@/components/icons";

/*
  Short messages in the top right corner, e.g. "… added to cart" from the cart
  button on a course card (components/AddToCartButton.jsx), or "Secret code sent"
  in the sign-in pop-up (components/AuthPanel.jsx). Placed once in
  app/layout.js; anything on the site shows one with showToast(). Each goes
  away by itself after a few seconds, or with its close button.
*/

const SHOWN_FOR = 4000; // milliseconds

let toasts = [];
let nextId = 0;
const listeners = new Set();
const empty = [];

function update(next) {
  toasts = next;
  listeners.forEach((listener) => listener());
}

const dismiss = (id) => update(toasts.filter((toast) => toast.id !== id));

// `title` in bold, `text` under it; `link` ({ href, label }) is optional.
// `tone` is "success" (green tick, the default) or "error" (red cross).
export function showToast({ title, text, link, tone = "success" }) {
  const id = ++nextId;
  update([...toasts, { id, title, text, link, tone }]);
  setTimeout(() => dismiss(id), SHOWN_FOR);
}

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export default function Toaster() {
  const shown = useSyncExternalStore(subscribe, () => toasts, () => empty);
  const area = useRef(null);
  const newestId = shown.at(-1)?.id;

  // The messages are a popover, in the browser's top layer, so they also show over an
  // open pop-up (a <dialog>, e.g. the sign-in pop-up). Shown again for each new
  // message, it stays above a pop-up opened since.
  useEffect(() => {
    const popover = area.current;
    if (!popover?.showPopover) return;
    if (popover.matches(":popover-open")) popover.hidePopover();
    if (newestId !== undefined) popover.showPopover();
  }, [newestId]);

  return (
    // Below the sticky header; role="status" reads each new message out.
    // m-0 … bg-transparent: undo the browser's own popover box.
    <div
      ref={area}
      popover="manual"
      role="status"
      className="pointer-events-none fixed inset-auto top-24 right-4 m-0 grid w-[min(22rem,calc(100%-2rem))] gap-3 overflow-visible border-0 bg-transparent p-0 lg:top-28"
    >
      {shown.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex animate-pop-in items-start gap-3 border border-black/15 bg-white p-4 shadow-[0.25rem_0.25rem_0_var(--color-brand-yellow)] motion-reduce:animate-none"
        >
          {toast.tone === "error" ? (
            <CircleXIcon className="mt-0.5 size-5 shrink-0 text-brand-orange" />
          ) : (
            <CircleCheckIcon className="mt-0.5 size-5 shrink-0 text-green-600" />
          )}
          <div className="min-w-0 flex-1 text-sm">
            <p className="font-bold">{toast.title}</p>
            {toast.text && <p className="mt-0.5 text-ink/75">{toast.text}</p>}
            {toast.link && (
              <Link
                href={toast.link.href}
                onClick={() => dismiss(toast.id)}
                className="mt-1.5 inline-block text-xs font-semibold text-brand-orange underline underline-offset-2 hover:no-underline"
              >
                {toast.link.label}
              </Link>
            )}
          </div>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => dismiss(toast.id)}
            className="-mt-1 -mr-1 grid size-7 shrink-0 cursor-pointer place-items-center rounded-full text-ink/50 hover:bg-brand-orange/10 hover:text-brand-orange"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
