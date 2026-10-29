"use client";

import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/icons";

/*
  "Are you sure?" pop-up with a confirm and a cancel button, e.g. before emptying
  the cart (components/CartView.jsx). Shown while `open` is true; `onClose` is
  called on cancel, Escape, a click on the backdrop or the close button, and
  `onConfirm` on the confirm button. A native <dialog>, like components/LinkModal.jsx:
  the keyboard stays inside it and the focus starts on "Cancel", the safe choice.
*/
export default function ConfirmDialog({
  open,
  title,
  text,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  icon,
  onConfirm,
  onClose,
}) {
  const dialog = useRef(null);
  const cancel = useRef(null);

  useEffect(() => {
    if (open && !dialog.current.open) {
      dialog.current.showModal();
      cancel.current.focus();
    }
    if (!open && dialog.current.open) dialog.current.close();
  }, [open]);

  return (
    // onCancel: Escape. A click on the backdrop (the dialog itself, outside the card) also closes it.
    <dialog
      ref={dialog}
      aria-labelledby="confirm-title"
      aria-describedby={text ? "confirm-text" : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => event.target === dialog.current && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-sm overflow-visible bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-[2px] open:animate-pop-in motion-reduce:open:animate-none"
    >
      <div className="relative border border-black/15 bg-white p-6 text-center shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)]">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-2 right-2 grid size-8 cursor-pointer place-items-center rounded-full text-ink/50 transition-colors hover:bg-brand-orange/10 hover:text-brand-orange"
        >
          <CloseIcon className="size-4" />
        </button>

        {icon && (
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-brand-orange/10 text-brand-orange">
            {icon}
          </div>
        )}
        <h2 id="confirm-title" className="text-lg leading-snug font-bold">
          {title}
        </h2>
        {text && (
          <p id="confirm-text" className="mt-2 text-sm text-ink/75">
            {text}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            ref={cancel}
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-sm border border-black/20 py-2.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink/5"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-sm border border-brand-orange bg-brand-orange py-2.5 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
