"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

const SHOWN_FOR = 2000; // milliseconds the "Copied!" note stays

// Puts `text` on the clipboard. Falls back to the old way where the Clipboard API
// is missing or refused (e.g. a page not served over https).
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const box = document.createElement("textarea");
    box.value = text;
    box.setAttribute("readonly", "");
    box.style.position = "fixed";
    box.style.opacity = "0";
    document.body.append(box);
    box.select();
    const copied = document.execCommand("copy");
    box.remove();
    return copied;
  }
}

/*
  Small copy icon next to a value such as an order id (app/profile/page.js,
  components/PaymentSuccess.jsx). Once copied, the icon turns into a green tick
  and a dark "Copied!" note pops up above it for a moment (also read out).
  `label` names what is copied for screen readers, e.g. "order ID".
*/
export default function CopyButton({ text, label = "text", className = "" }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), SHOWN_FOR);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <span className={`relative inline-flex align-middle ${className}`}>
      <button
        type="button"
        onClick={async () => setCopied(await copyText(text))}
        aria-label={`Copy ${label} ${text}`}
        title={`Copy ${label}`}
        className={`grid size-6 cursor-pointer place-items-center rounded-md transition-colors ${
          copied
            ? "bg-green-600/10 text-green-600"
            : "text-ink/50 hover:bg-brand-orange/10 hover:text-brand-orange"
        }`}
      >
        {copied ? (
          <CheckIcon className="size-3.5" strokeWidth={2.5} />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
      </button>
      {/* The note, with a little arrow pointing down at the icon */}
      <span
        role="status"
        className={`pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-[0.6875rem] font-semibold whitespace-nowrap text-white shadow-md transition duration-200 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-ink ${
          copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        {copied ? "Copied!" : ""}
      </span>
    </span>
  );
}
