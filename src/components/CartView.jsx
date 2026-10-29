"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import CartSummary, { summaryButton } from "@/components/CartSummary";
import ConfirmDialog from "@/components/ConfirmDialog";
import {
  CalendarIcon,
  CircleCheckIcon,
  MonitorIcon,
  TrashIcon,
} from "@/components/icons";
import { clearCart, removeFromCart, useCart } from "@/lib/cart";

// Shown for a course that has no picture of its own
const fallbackImage = "/image/course-hero.jpg";

const detailIcon = "size-4 shrink-0 text-brand-orange";

const noSubscription = () => () => {};

function CartItem({ item }) {
  return (
    <li className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 border-b border-black/10 py-4 first:pt-0 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
      <Link href={item.href} className="relative aspect-[4/3] self-start overflow-hidden">
        <Image
          src={item.image || fallbackImage}
          alt=""
          fill
          sizes="(min-width: 640px) 176px, 88px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-col">
        <h3 className="text-sm leading-snug font-bold sm:text-base">
          <Link href={item.href} className="hover:text-brand-orange">
            {item.title}
          </Link>
        </h3>
        {item.text && <p className="mt-1 text-xs text-ink/75">{item.text}</p>}
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs">
          {item.duration && (
            <li className="flex items-center gap-1.5">
              <CalendarIcon className={detailIcon} strokeWidth={1.5} />
              {item.duration}
            </li>
          )}
          {item.classes && (
            <li className="flex items-center gap-1.5">
              <MonitorIcon className={detailIcon} strokeWidth={1.5} />
              {item.classes}
            </li>
          )}
        </ul>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-3">
          <p className="text-xs">
            Price <strong className="text-lg">৳{item.price}</strong>
            {item.actualPrice && (
              <s className="ml-1.5 text-ink/60">৳{item.actualPrice}</s>
            )}
          </p>
          <button
            type="button"
            onClick={() => removeFromCart(item.href)}
            aria-label={`Remove ${item.title}`}
            className="cursor-pointer text-xs text-brand-orange underline underline-offset-2 hover:no-underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

// The cart page's list and summary (app/cart/page.js). The cart lives in the browser (lib/cart.js).
export default function CartView() {
  const items = useCart();
  // The cart is only known in the browser; until then nothing is shown, so an
  // "empty cart" does not flash up before the courses appear
  const inBrowser = useSyncExternalStore(noSubscription, () => true, () => false);
  const [confirmingClear, setConfirmingClear] = useState(false);

  if (!inBrowser) return <div className="min-h-64" />;

  if (!items.length) {
    return (
      <div className="py-10 text-center">
        <p className="text-xl font-bold">Your cart is empty</p>
        <p className="mt-2 text-sm text-ink/75">
          Add a course with the cart button on any course card.
        </p>
        <Link
          href="/ielts"
          className="mt-5 inline-block border border-brand-orange bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  return (
    // minmax(0, 1fr): the column is as wide as the screen allows, never as wide as its content
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 xl:gap-16">
      <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-brand-orange">
            {items.length} {items.length === 1 ? "Item" : "Items"}
          </h2>
          {/* Asks first, so the whole cart is not emptied by a stray click */}
          <button
            type="button"
            onClick={() => setConfirmingClear(true)}
            className="cursor-pointer rounded-sm border border-brand-orange px-3 py-1.5 text-xs font-semibold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
          >
            Remove All
          </button>
        </div>
        <ul>
          {items.map((item) => (
            <CartItem key={item.href} item={item} />
          ))}
        </ul>
      </div>
      <CartSummary items={items}>
        <Link href="/checkout" className={summaryButton}>
          Proceed to Checkout
          <CircleCheckIcon className="size-4" />
        </Link>
      </CartSummary>

      <ConfirmDialog
        open={confirmingClear}
        icon={<TrashIcon className="size-7" />}
        title="Remove all courses?"
        text={`All ${items.length} ${items.length === 1 ? "course" : "courses"} will be taken out of your cart.`}
        confirmLabel="Yes, Remove All"
        cancelLabel="Keep Them"
        onConfirm={() => {
          setConfirmingClear(false);
          clearCart();
        }}
        onClose={() => setConfirmingClear(false)}
      />
    </div>
  );
}
