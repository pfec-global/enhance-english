"use client";

import { useState } from "react";
import {
  applyCoupon,
  cartTotals,
  formatAmount,
  removeCoupon,
  useCoupon,
} from "@/lib/cart";

export const summaryButton =
  "mt-4 flex w-full cursor-pointer items-center justify-center gap-2 border border-brand-orange bg-brand-orange py-2.5 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange disabled:cursor-wait disabled:opacity-70";

/*
  The box beside the cart (components/CartView.jsx) and the checkout
  (components/CheckoutView.jsx): the total, the coupon box and the final bill,
  then `children` — the page's button ("Proceed to Checkout", "Make Payment").
  The coupon is kept with the cart (lib/cart.js), so one applied in the cart is
  still there at the checkout.
*/
export default function CartSummary({ items, children }) {
  const coupon = useCoupon();
  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState(null);
  const { total, actual, savedPercent, final } = cartTotals(items, coupon);

  function apply(event) {
    event.preventDefault();
    if (applyCoupon(code)) {
      setCode("");
      setCouponError(null);
    } else {
      setCouponError("This coupon code is not valid.");
    }
  }

  return (
    <aside className="border border-black/15 bg-white p-5 shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)] lg:sticky lg:top-28">
      <p className="text-sm">Total</p>
      <p className="text-2xl font-bold">৳{formatAmount(total)}</p>
      {savedPercent > 0 && (
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
          <span>
            Actual Price <s className="text-sm font-semibold">৳{formatAmount(actual)}</s>
          </span>
          <span className="bg-brand-yellow px-1.5 py-0.5 font-semibold">
            {savedPercent}% Discount
          </span>
        </div>
      )}

      <form onSubmit={apply} className="mt-5">
        <label htmlFor="coupon" className="text-xs">
          Got a Coupon Code?
        </label>
        <div className="mt-1.5 flex border border-brand-orange">
          <input
            id="coupon"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder={coupon ? coupon.code : "Enter Coupon Code"}
            autoComplete="off"
            className="min-w-0 flex-1 px-3 py-2 text-sm uppercase outline-none placeholder:normal-case focus:bg-brand-orange/5"
          />
          <button
            type="submit"
            disabled={!code.trim()}
            className="cursor-pointer bg-brand-orange px-4 text-xs font-semibold text-white transition-opacity disabled:cursor-default disabled:opacity-60"
          >
            Apply
          </button>
        </div>
        <div aria-live="polite">
          {coupon && (
            <div className="mt-2 flex items-start justify-between gap-2 border border-brand-orange/40 bg-brand-orange/5 p-2.5 text-xs">
              <p>
                <strong className="text-brand-orange">{coupon.code} Coupon Applied!</strong>
                <br />
                You&apos;ve Received an{" "}
                <strong>Additional {coupon.percent}% OFF on your Bill Value</strong>
              </p>
              <button
                type="button"
                onClick={removeCoupon}
                className="cursor-pointer text-brand-orange underline underline-offset-2"
              >
                Remove
              </button>
            </div>
          )}
          {couponError && (
            <p role="alert" className="mt-2 text-xs text-brand-orange">
              {couponError}
            </p>
          )}
        </div>
      </form>

      <p className="mt-5 text-sm">Final Bill Value</p>
      <p className="text-2xl font-bold text-brand-orange">৳{formatAmount(final)}</p>

      {children}
      <p className="mt-2 text-center text-xs text-ink/75">100% Secure Payment</p>
    </aside>
  );
}
